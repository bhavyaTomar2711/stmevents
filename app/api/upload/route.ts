import { createServerSupabase } from "@/lib/supabase/server";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "";
const API_KEY = process.env.CLOUDINARY_API_KEY || "";
const API_SECRET = process.env.CLOUDINARY_API_SECRET || "";

export async function POST(request: Request) {
  try {
    // Auth check
    const supabase = await createServerSupabase();
    let user = null;
    try {
      const { data } = await supabase.auth.getUser();
      user = data.user;
    } catch { /* stale token */ }
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "stmevents";

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    // Determine resource type
    const isVideo = file.type.startsWith("video/");
    const resourceType = isVideo ? "video" : "image";

    // Generate signature for signed upload
    const timestamp = Math.floor(Date.now() / 1000);
    const paramsToSign = `folder=${folder}&timestamp=${timestamp}${API_SECRET}`;

    // Create SHA-1 signature
    const encoder = new TextEncoder();
    const data = encoder.encode(paramsToSign);
    const hashBuffer = await crypto.subtle.digest("SHA-1", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const signature = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    // Upload to Cloudinary
    const cloudForm = new FormData();
    cloudForm.append("file", file);
    cloudForm.append("folder", folder);
    cloudForm.append("timestamp", timestamp.toString());
    cloudForm.append("api_key", API_KEY);
    cloudForm.append("signature", signature);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
      { method: "POST", body: cloudForm }
    );

    const result = await res.json();

    if (!res.ok) {
      return Response.json(
        { error: result.error?.message || "Cloudinary upload failed" },
        { status: 500 }
      );
    }

    return Response.json({ url: result.secure_url });
  } catch (error) {
    console.error("Upload error:", error);
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}
