// Telling a dropped connection from a real database refusal.
//
// supabase-js does not throw when the network fails: it resolves with
// `{ error: { message: "TypeError: fetch failed", code: "" } }`. A refusal from PostgREST
// always carries a SQLSTATE or PGRST code, so an empty code with a network-sounding
// message means the request may never have reached the database.

export type SupabaseLikeError = { message?: string; code?: string | null } | null | undefined;

const NETWORK_MESSAGE = /fetch failed|network|socket|ECONNRESET|ECONNREFUSED|ETIMEDOUT|ENOTFOUND|EAI_AGAIN|UND_ERR/i;

export function isTransientNetworkError(error: SupabaseLikeError): boolean {
  if (!error) return false;
  return !error.code && NETWORK_MESSAGE.test(error.message ?? "");
}

export const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
