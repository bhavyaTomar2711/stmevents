"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  accept?: string;
}

export default function ImageUpload({ label, value, onChange, folder = "uploads", accept = "image/*" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Upload failed");
      } else {
        onChange(data.url);
      }
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-purple-400">
        {label}
      </label>

      {/* Preview */}
      {value && (
        <div className="relative mb-3 h-40 w-full overflow-hidden rounded-lg border border-white/[0.1]">
          {accept.includes("video") ? (
            <video src={value} className="h-full w-full object-cover" controls />
          ) : (
            <Image src={value} alt="Preview" fill className="object-cover" unoptimized />
          )}
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-2 top-2 rounded-full bg-black/70 p-1.5 text-white/70 transition-colors hover:bg-red-500/80 hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Upload button */}
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        className={`flex cursor-pointer items-center justify-center gap-3 rounded-lg border-2 border-dashed border-white/[0.12] bg-white/[0.03] px-4 py-6 transition-colors hover:border-purple-500/40 hover:bg-purple-500/5 ${uploading ? "pointer-events-none opacity-50" : ""}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleUpload}
          className="hidden"
        />
        {uploading ? (
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 animate-spin text-purple-400" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
              <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75" />
            </svg>
            <span className="text-sm text-white/50">Uploading...</span>
          </div>
        ) : (
          <>
            <svg className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <span className="text-sm text-white/50">
              {value ? "Replace file" : "Click to upload"}
            </span>
          </>
        )}
      </div>

      {error && (
        <p className="mt-2 text-[11px] text-red-400">{error}</p>
      )}
    </div>
  );
}
