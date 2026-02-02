"use server";

import { createClient } from "@/lib/supabase/server";
import { inquirySchema } from "@/lib/validations/inquiry";

export type InquiryResult =
  | { success: true }
  | { success: false; errors: Record<string, string[]> };

export async function submitInquiry(
  formData: Record<string, string>
): Promise<InquiryResult> {
  const parsed = inquirySchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { name, email, phone, company, services, budget, details } =
    parsed.data;

  // Map "both" to array for storage
  const servicesRequested =
    services === "both" ? ["dtm", "ddm"] : [services];

  const supabase = await createClient();

  const { error } = await supabase.from("inquiries").insert({
    name,
    email,
    phone: phone || null,
    company: company || null,
    services_requested: servicesRequested,
    budget_range: budget,
    project_details: details || null,
  });

  if (error) {
    console.error("Failed to insert inquiry:", error.message);
    return {
      success: false,
      errors: { _form: ["Something went wrong. Please try again."] },
    };
  }

  // Fire-and-forget email notification
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    await fetch(`${baseUrl}/api/inquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, company, services, budget }),
    });
  } catch {
    // Email notification failure shouldn't block the submission
    console.error("Email notification failed");
  }

  return { success: true };
}
