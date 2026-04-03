"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  accept?: string;
}

export default function ImageUpload({ label, value, onChange, folder = "stmevents", accept = "image/*" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File) => {
    setUploading(true);
    setError("");
    setProgress(10);

    try {
      // Step 1: Get a signed upload token from server (no file sent to Vercel)
      const signRes = await fetch("/api/upload/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder }),
      });

      if (!signRes.ok) {
        const err = await signRes.json();
        setError(err.error || "Upload failed");
        setProgress(0);
        return;
      }

      const { signature, timestamp, api_key, cloud_name } = await signRes.json();
      setProgress(30);

      // Step 2: Upload directly from browser to Cloudinary (bypasses Vercel size limit)
      const isVideo = file.type.startsWith("video/");
      const resourceType = isVideo ? "video" : "image";

      const cloudForm = new FormData();
      cloudForm.append("file", file);
      cloudForm.append("folder", folder);
      cloudForm.append("timestamp", timestamp.toString());
      cloudForm.append("api_key", api_key);
      cloudForm.append("signature", signature);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/${resourceType}/upload`,
        { method: "POST", body: cloudForm }
      );
      setProgress(80);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error?.message || "Upload failed");
        setProgress(0);
      } else {
        setProgress(100);
        onChange(data.secure_url);
        setTimeout(() => setProgress(0), 500);
      }
    } catch {
      setError("Upload failed. Please try again.");
      setProgress(0);
    } finally {
      setUploading(false);
    }
  }, [folder, onChange]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    // Reset input so re-selecting the same file works
    e.target.value = "";
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  }, [uploadFile]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const isVideo = accept?.includes("video");

  return (
    <div>
      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-purple-400">
        {label}
      </label>

      {/* Preview */}
      {value ? (
        <div className="group relative mb-3 overflow-hidden rounded-xl border border-white/[0.08] bg-black/40">
          <div className="relative h-48 w-full">
            {isVideo ? (
              <video src={value} className="h-full w-full object-cover" controls />
            ) : (
              <Image src={value} alt="Preview" fill className="object-cover" unoptimized />
            )}
            {/* Overlay on hover */}
            <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="flex items-center gap-1.5 rounded-lg bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                </svg>
                Replace
              </button>
              <button
                type="button"
                onClick={() => onChange("")}
                className="flex items-center gap-1.5 rounded-lg bg-red-500/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-red-400 backdrop-blur-sm transition-colors hover:bg-red-500/30"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                Remove
              </button>
            </div>
          </div>
          {/* URL display */}
          <div className="flex items-center gap-2 border-t border-white/[0.06] px-3 py-2">
            <svg className="h-3.5 w-3.5 flex-shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="truncate text-[11px] text-white/30">{value}</span>
          </div>
        </div>
      ) : (
        /* Drop zone */
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !uploading && inputRef.current?.click()}
          className={`relative cursor-pointer overflow-hidden rounded-xl border-2 border-dashed transition-all duration-300 ${
            dragOver
              ? "border-purple-500 bg-purple-500/10 shadow-[0_0_30px_rgba(124,58,237,0.15)]"
              : uploading
              ? "pointer-events-none border-purple-500/30 bg-purple-500/5"
              : "border-white/[0.1] bg-white/[0.02] hover:border-purple-500/40 hover:bg-purple-500/5"
          }`}
        >
          <div className="flex flex-col items-center justify-center py-10">
            {uploading ? (
              <>
                <div className="relative mb-4 h-14 w-14">
                  <svg className="h-14 w-14 -rotate-90" viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(139,92,246,0.15)" strokeWidth="4" />
                    <circle
                      cx="28" cy="28" r="24" fill="none" stroke="url(#uploadGrad)" strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 24}`}
                      strokeDashoffset={`${2 * Math.PI * 24 * (1 - progress / 100)}`}
                      className="transition-all duration-500"
                    />
                    <defs>
                      <linearGradient id="uploadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[11px] font-bold text-purple-400">{progress}%</span>
                  </div>
                </div>
                <p className="text-sm font-medium text-white/60">Uploading to Cloudinary...</p>
              </>
            ) : (
              <>
                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 ${
                  dragOver
                    ? "bg-purple-500/20 shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                    : "bg-white/[0.04]"
                }`}>
                  <svg className={`h-7 w-7 transition-colors ${dragOver ? "text-purple-400" : "text-white/25"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    {isVideo ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                    )}
                  </svg>
                </div>
                <p className="mb-1 text-sm font-medium text-white/60">
                  {dragOver ? "Drop to upload" : "Click to upload or drag and drop"}
                </p>
                <p className="text-[11px] text-white/25">
                  {isVideo ? "MP4, MOV, WebM" : "PNG, JPG, GIF, WebP"}
                </p>
              </>
            )}
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Progress bar (shown below preview when replacing) */}
      {uploading && value && (
        <div className="mt-2 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {error && (
        <div className="mt-2 flex items-center gap-1.5 text-[11px] text-red-400">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
}
