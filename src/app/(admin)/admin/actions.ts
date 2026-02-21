"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import {
  createOrganizationSchema,
  updateOrganizationSchema,
  generateSlug,
} from "@/lib/validations/organization";
import {
  createClientSchema,
  updateClientSchema,
  updateInquirySchema,
  convertInquirySchema,
} from "@/lib/validations/client";
import type { ActionResult } from "@/lib/types/admin";

// =============================================================================
// HELPER: Verify admin role
// =============================================================================

async function verifyAdmin(): Promise<{ userId: string } | { error: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return { error: "Unauthorized: Admin access required" };
  }

  return { userId: user.id };
}

// =============================================================================
// ORGANIZATION ACTIONS
// =============================================================================

export async function createOrganization(
  formData: FormData
): Promise<ActionResult<{ id: string }>> {
  const adminCheck = await verifyAdmin();
  if ("error" in adminCheck) {
    return { success: false, error: adminCheck.error };
  }

  const rawData = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    industry: formData.get("industry") as string,
    website: formData.get("website") as string,
  };

  // Generate slug if not provided
  if (!rawData.slug) {
    rawData.slug = generateSlug(rawData.name);
  }

  const parsed = createOrganizationSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("organizations")
    .insert({
      name: parsed.data.name,
      slug: rawData.slug,
      industry: parsed.data.industry || null,
      website: parsed.data.website || null,
    })
    .select("id")
    .single();

  if (error) {
    if (error.code === "23505") {
      return { success: false, error: "An organization with this slug already exists" };
    }
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/organizations");
  return { success: true, data: { id: data.id } };
}

export async function updateOrganization(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  const adminCheck = await verifyAdmin();
  if ("error" in adminCheck) {
    return { success: false, error: adminCheck.error };
  }

  const rawData = {
    name: formData.get("name") as string,
    industry: formData.get("industry") as string,
    website: formData.get("website") as string,
  };

  const parsed = updateOrganizationSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("organizations")
    .update({
      name: parsed.data.name,
      industry: parsed.data.industry || null,
      website: parsed.data.website || null,
    })
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/organizations");
  return { success: true };
}

export async function deleteOrganization(id: string): Promise<ActionResult> {
  const adminCheck = await verifyAdmin();
  if ("error" in adminCheck) {
    return { success: false, error: adminCheck.error };
  }

  const supabase = await createClient();

  // Check if organization has clients
  const { count } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("organization_id", id);

  if (count && count > 0) {
    return {
      success: false,
      error: "Cannot delete organization with active clients. Remove clients first.",
    };
  }

  const { error } = await supabase.from("organizations").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/organizations");
  return { success: true };
}

// =============================================================================
// CLIENT ACTIONS
// =============================================================================

export async function createClientAccount(
  formData: FormData
): Promise<ActionResult<{ id: string }>> {
  const adminCheck = await verifyAdmin();
  if ("error" in adminCheck) {
    return { success: false, error: adminCheck.error };
  }

  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    full_name: formData.get("full_name") as string,
    organization_id: formData.get("organization_id") as string,
  };

  const parsed = createClientSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  // Use admin client to create auth user
  const adminSupabase = createAdminClient();
  const { data: authUser, error: authError } =
    await adminSupabase.auth.admin.createUser({
      email: parsed.data.email,
      password: parsed.data.password,
      email_confirm: true,
      user_metadata: {
        full_name: parsed.data.full_name,
        role: "client",
      },
    });

  if (authError) {
    if (authError.message.includes("already been registered")) {
      return { success: false, error: "A user with this email already exists" };
    }
    return { success: false, error: authError.message };
  }

  // Update profile with organization_id (trigger creates basic profile)
  const supabase = await createClient();
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ organization_id: parsed.data.organization_id })
    .eq("id", authUser.user.id);

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  revalidatePath("/admin/clients");
  return { success: true, data: { id: authUser.user.id } };
}

export async function updateClientStatus(
  id: string,
  status: "active" | "inactive" | "pending"
): Promise<ActionResult> {
  const adminCheck = await verifyAdmin();
  if ("error" in adminCheck) {
    return { success: false, error: adminCheck.error };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ status })
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/clients");
  return { success: true };
}

export async function updateClient(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  const adminCheck = await verifyAdmin();
  if ("error" in adminCheck) {
    return { success: false, error: adminCheck.error };
  }

  const rawData = {
    full_name: formData.get("full_name") as string,
    status: formData.get("status") as "active" | "inactive" | "pending",
    organization_id: formData.get("organization_id") as string,
  };

  const parsed = updateClientSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: parsed.data.full_name,
      status: parsed.data.status,
      organization_id: parsed.data.organization_id,
    })
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/clients");
  return { success: true };
}

export async function deleteClient(id: string): Promise<ActionResult> {
  const adminCheck = await verifyAdmin();
  if ("error" in adminCheck) {
    return { success: false, error: adminCheck.error };
  }

  // Use admin client to delete auth user (cascades to profile)
  const adminSupabase = createAdminClient();
  const { error } = await adminSupabase.auth.admin.deleteUser(id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/clients");
  return { success: true };
}

// =============================================================================
// INQUIRY ACTIONS
// =============================================================================

export async function updateInquiryStatus(
  id: string,
  status: "new" | "contacted" | "converted" | "declined",
  notes?: string
): Promise<ActionResult> {
  const adminCheck = await verifyAdmin();
  if ("error" in adminCheck) {
    return { success: false, error: adminCheck.error };
  }

  const supabase = await createClient();
  const updateData: Record<string, unknown> = { status };

  if (status === "contacted") {
    updateData.contacted_at = new Date().toISOString();
  }

  if (notes !== undefined) {
    updateData.notes = notes;
  }

  const { error } = await supabase.from("inquiries").update(updateData).eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/inquiries");
  return { success: true };
}

export async function updateInquiryNotes(
  id: string,
  notes: string
): Promise<ActionResult> {
  const adminCheck = await verifyAdmin();
  if ("error" in adminCheck) {
    return { success: false, error: adminCheck.error };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("inquiries")
    .update({ notes })
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/inquiries");
  return { success: true };
}

export async function convertInquiryToClient(
  formData: FormData
): Promise<ActionResult<{ clientId: string; organizationId: string }>> {
  const adminCheck = await verifyAdmin();
  if ("error" in adminCheck) {
    return { success: false, error: adminCheck.error };
  }

  const rawData = {
    inquiry_id: formData.get("inquiry_id") as string,
    organization: {
      name: formData.get("org_name") as string,
      slug: formData.get("org_slug") as string,
      industry: formData.get("org_industry") as string,
      website: formData.get("org_website") as string,
    },
    client: {
      email: formData.get("client_email") as string,
      password: formData.get("client_password") as string,
      full_name: formData.get("client_name") as string,
    },
  };

  // Generate slug if not provided
  if (!rawData.organization.slug) {
    rawData.organization.slug = generateSlug(rawData.organization.name);
  }

  const parsed = convertInquirySchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const supabase = await createClient();
  const adminSupabase = createAdminClient();

  // 1. Create organization
  const { data: org, error: orgError } = await supabase
    .from("organizations")
    .insert({
      name: parsed.data.organization.name,
      slug: rawData.organization.slug,
      industry: parsed.data.organization.industry || null,
      website: parsed.data.organization.website || null,
    })
    .select("id")
    .single();

  if (orgError) {
    if (orgError.code === "23505") {
      return { success: false, error: "An organization with this slug already exists" };
    }
    return { success: false, error: `Organization creation failed: ${orgError.message}` };
  }

  // 2. Create auth user
  const { data: authUser, error: authError } =
    await adminSupabase.auth.admin.createUser({
      email: parsed.data.client.email,
      password: parsed.data.client.password,
      email_confirm: true,
      user_metadata: {
        full_name: parsed.data.client.full_name,
        role: "client",
      },
    });

  if (authError) {
    // Rollback: delete the organization
    await supabase.from("organizations").delete().eq("id", org.id);

    if (authError.message.includes("already been registered")) {
      return { success: false, error: "A user with this email already exists" };
    }
    return { success: false, error: `User creation failed: ${authError.message}` };
  }

  // 3. Update profile with organization_id
  const { error: profileError } = await supabase
    .from("profiles")
    .update({ organization_id: org.id })
    .eq("id", authUser.user.id);

  if (profileError) {
    return { success: false, error: `Profile update failed: ${profileError.message}` };
  }

  // 4. Update inquiry status to converted
  const { error: inquiryError } = await supabase
    .from("inquiries")
    .update({
      status: "converted",
      converted_to_profile_id: authUser.user.id,
    })
    .eq("id", parsed.data.inquiry_id);

  if (inquiryError) {
    return { success: false, error: `Inquiry update failed: ${inquiryError.message}` };
  }

  revalidatePath("/admin/inquiries");
  revalidatePath("/admin/clients");
  revalidatePath("/admin/organizations");

  return {
    success: true,
    data: { clientId: authUser.user.id, organizationId: org.id },
  };
}

export async function deleteInquiry(id: string): Promise<ActionResult> {
  const adminCheck = await verifyAdmin();
  if ("error" in adminCheck) {
    return { success: false, error: adminCheck.error };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("inquiries").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/inquiries");
  return { success: true };
}

// =============================================================================
// CONTRACT ACTIONS
// =============================================================================

export async function createContract(
  formData: FormData
): Promise<ActionResult<{ id: string }>> {
  const adminCheck = await verifyAdmin();
  if ("error" in adminCheck) {
    return { success: false, error: adminCheck.error };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contracts")
    .insert({
      organization_id: formData.get("organization_id") as string,
      package_id: formData.get("package_id") as string,
      start_date: formData.get("start_date") as string,
      end_date: (formData.get("end_date") as string) || null,
      monthly_ad_spend: parseFloat(formData.get("monthly_ad_spend") as string) || 0,
      status: (formData.get("status") as string) || "active",
    })
    .select("id")
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/contracts");
  return { success: true, data: { id: data.id } };
}

export async function updateContractStatus(
  id: string,
  status: "active" | "paused" | "cancelled" | "expired"
): Promise<ActionResult> {
  const adminCheck = await verifyAdmin();
  if ("error" in adminCheck) {
    return { success: false, error: adminCheck.error };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("contracts")
    .update({ status })
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/contracts");
  return { success: true };
}

export async function updateContract(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  const adminCheck = await verifyAdmin();
  if ("error" in adminCheck) {
    return { success: false, error: adminCheck.error };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("contracts")
    .update({
      package_id: formData.get("package_id") as string,
      start_date: formData.get("start_date") as string,
      end_date: (formData.get("end_date") as string) || null,
      monthly_ad_spend: parseFloat(formData.get("monthly_ad_spend") as string) || 0,
      status: formData.get("status") as string,
    })
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/contracts");
  return { success: true };
}

export async function deleteContract(id: string): Promise<ActionResult> {
  const adminCheck = await verifyAdmin();
  if ("error" in adminCheck) {
    return { success: false, error: adminCheck.error };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contracts").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/contracts");
  return { success: true };
}

// =============================================================================
// DELIVERABLE ACTIONS
// =============================================================================

export async function createDeliverable(
  formData: FormData
): Promise<ActionResult<{ id: string }>> {
  const adminCheck = await verifyAdmin();
  if ("error" in adminCheck) {
    return { success: false, error: adminCheck.error };
  }

  const supabase = await createClient();
  const status = (formData.get("status") as string) || "draft";
  const { data, error } = await supabase
    .from("deliverables")
    .insert({
      organization_id: formData.get("organization_id") as string,
      category_id: formData.get("category_id") as string,
      campaign_id: (formData.get("campaign_id") as string) || null,
      title: formData.get("title") as string,
      description: (formData.get("description") as string) || null,
      file_url: (formData.get("file_url") as string) || null,
      external_url: (formData.get("external_url") as string) || null,
      status,
      delivered_at: status === "delivered" ? new Date().toISOString() : null,
    })
    .select("id")
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/deliverables");
  return { success: true, data: { id: data.id } };
}

export async function updateDeliverableStatus(
  id: string,
  status: "draft" | "in_review" | "delivered" | "archived"
): Promise<ActionResult> {
  const adminCheck = await verifyAdmin();
  if ("error" in adminCheck) {
    return { success: false, error: adminCheck.error };
  }

  const supabase = await createClient();
  const updateData: Record<string, unknown> = { status };

  if (status === "delivered") {
    updateData.delivered_at = new Date().toISOString();
  }

  const { error } = await supabase
    .from("deliverables")
    .update(updateData)
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/deliverables");
  return { success: true };
}

export async function updateDeliverable(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  const adminCheck = await verifyAdmin();
  if ("error" in adminCheck) {
    return { success: false, error: adminCheck.error };
  }

  const status = formData.get("status") as string;
  const supabase = await createClient();
  const { error } = await supabase
    .from("deliverables")
    .update({
      category_id: formData.get("category_id") as string,
      campaign_id: (formData.get("campaign_id") as string) || null,
      title: formData.get("title") as string,
      description: (formData.get("description") as string) || null,
      file_url: (formData.get("file_url") as string) || null,
      external_url: (formData.get("external_url") as string) || null,
      status,
      delivered_at: status === "delivered" ? new Date().toISOString() : null,
    })
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/deliverables");
  return { success: true };
}

export async function deleteDeliverable(id: string): Promise<ActionResult> {
  const adminCheck = await verifyAdmin();
  if ("error" in adminCheck) {
    return { success: false, error: adminCheck.error };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("deliverables").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/deliverables");
  return { success: true };
}
