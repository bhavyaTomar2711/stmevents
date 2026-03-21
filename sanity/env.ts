export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "o16xytpp";

// Used on the server only — never exposed to the client
export const token = process.env.SANITY_API_READ_TOKEN || "";
