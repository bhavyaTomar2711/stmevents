import { createServerSupabase } from "@/lib/supabase/server";

const API_KEY = process.env.CLOUDINARY_API_KEY || "";
const API_SECRET = process.env.CLOUDINARY_API_SECRET || "";
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "";

export async function POST(request: Request) {
  const supabase = await createServerSupabase();
  let user = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch { /* stale token */ }

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { folder } = await request.json();
  const resolvedFolder = folder || "stmevents";

  const timestamp = Math.floor(Date.now() / 1000);
  const paramsToSign = `folder=${resolvedFolder}&timestamp=${timestamp}${API_SECRET}`;

  const encoder = new TextEncoder();
  const encoded = encoder.encode(paramsToSign);
  const hashBuffer = await crypto.subtle.digest("SHA-1", encoded);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const signature = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  return Response.json({ signature, timestamp, api_key: API_KEY, cloud_name: CLOUD_NAME });
}
