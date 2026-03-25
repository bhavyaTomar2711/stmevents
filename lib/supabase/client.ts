import { createBrowserClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

/**
 * Safe wrapper around getUser() that handles stale refresh tokens.
 * Returns null instead of throwing AuthApiError.
 */
export async function safeGetUser(): Promise<User | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      // Stale token — sign out to clear cookies
      await supabase.auth.signOut();
      return null;
    }
    return data.user;
  } catch {
    // Network error or unexpected failure
    try {
      await createClient().auth.signOut();
    } catch { /* ignore */ }
    return null;
  }
}
