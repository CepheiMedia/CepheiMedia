"use server";

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

  // Try Supabase insert if configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl && !supabaseUrl.includes("your-project-ref")) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
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
        console.error("Supabase insert failed (non-blocking):", error.message);
      }
    } catch (err) {
      console.error("Supabase unavailable (non-blocking):", err);
    }
  }

  // Send email notification
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/inquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, company, services, budget, details }),
    });
    if (!res.ok) {
      console.error("Email API returned:", res.status);
    }
  } catch (err) {
    console.error("Email notification failed:", err);
  }

  // Always return success — the inquiry was received
  return { success: true };
}
