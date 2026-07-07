import type { SupabaseClient } from "@supabase/supabase-js";

// Server-only Supabase client using the service-role key (bypasses RLS). Never import
// this from a "use client" component. Returns null when unconfigured so callers can
// degrade gracefully instead of throwing (matches the existing /api/lead behavior).
let cached: SupabaseClient | null = null;

export async function getSupabaseAdmin(): Promise<SupabaseClient | null> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  if (cached) return cached;
  const { createClient } = await import("@supabase/supabase-js");
  cached = createClient(url, key);
  return cached;
}
