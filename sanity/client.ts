import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

let _client: SanityClient | null = null;

export function getClient(): SanityClient | null {
  if (!projectId) return null;
  if (!_client) {
    _client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    });
  }
  return _client;
}

// Re-export for backward compat — throws if called without config
export const client = new Proxy({} as SanityClient, {
  get(_target, prop) {
    const c = getClient();
    if (!c) throw new Error("Sanity is not configured — set NEXT_PUBLIC_SANITY_PROJECT_ID");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (c as any)[prop];
  },
});
