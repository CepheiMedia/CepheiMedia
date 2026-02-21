import { createClient } from "@supabase/supabase-js";

/**
 * Admin Supabase Client
 * Uses the service role key for privileged operations like creating auth users.
 * ONLY use this in server-side code (Server Actions, API routes).
 * Returns null if credentials are not configured.
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey || supabaseUrl.includes("placeholder") || supabaseUrl.includes("your-project-ref")) {
    return null;
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
