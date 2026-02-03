"use server";

import { createClient } from "@/lib/supabase/server";

export type ResetResult =
  | { success: true; error: null }
  | { success: false; error: string };

export async function resetPassword(email: string): Promise<ResetResult> {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/login`,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}
