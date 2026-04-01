import { createServerSupabase } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    // Only admins (used in admin panel) may call the translation endpoint
    const supabase = await createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
    if (!user || !adminEmail || user.email?.toLowerCase() !== adminEmail) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    const { text, from = "de", to = "en" } = await request.json();

    if (!text || !text.trim()) {
      return Response.json({ error: "No text provided" }, { status: 400 });
    }

    // Strip HTML tags for translation, preserve for reference
    const plainText = text.replace(/<[^>]*>/g, "").trim();
    if (!plainText) {
      return Response.json({ translated: "" });
    }

    // Use MyMemory free translation API
    const langPair = `${from}|${to}`;
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(plainText)}&langpair=${encodeURIComponent(langPair)}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return Response.json({ translated: data.responseData.translatedText });
    }

    return Response.json({ error: "Translation failed" }, { status: 500 });
  } catch (error) {
    console.error("Translation error:", error);
    return Response.json({ error: "Translation failed" }, { status: 500 });
  }
}
