"use client";

import { useState } from "react";
import Link from "next/link";
import DeleteButton from "../_components/DeleteButton";

const PAGE_SIZE = 12;

function optimizeCloudinaryUrl(url: string, width = 400): string {
  if (!url || !url.includes("res.cloudinary.com")) return url;
  return url.replace("/upload/", `/upload/q_auto,f_auto,w_${width},c_fill/`);
}

type GalleryItem = {
  id: string;
  title: string;
  category: string;
  media_type: string;
  featured: boolean;
  thumbnail_url?: string;
  image_url?: string;
};

export default function AdminGalleryClient({ items }: { items: GalleryItem[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visible = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Gallery</h1>
          <p className="mt-1 text-sm text-white/40">Manage photos and videos</p>
        </div>
        <Link href="/admin/gallery/new" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wider text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/30">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          Add Item
        </Link>
      </div>

      {items.length > 0 ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((item) => {
              const rawSrc = item.thumbnail_url || item.image_url || "";
              const src = optimizeCloudinaryUrl(rawSrc, 400);
              return (
                <div key={item.id} className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] transition-all duration-300 hover:border-cyan-500/20 hover:bg-white/[0.05]">
                  {/* Thumbnail */}
                  <div className="relative aspect-square overflow-hidden">
                    {src ? (
                      <img
                        src={src}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-cyan-500/10 to-teal-500/5">
                        <svg className="h-10 w-10 text-cyan-500/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07070d] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute top-2 left-2 flex gap-1.5">
                      <span className="rounded-full bg-black/50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-cyan-300 backdrop-blur-sm">{item.media_type}</span>
                      {item.featured && (
                        <span className="rounded-full bg-amber-500/30 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-300 backdrop-blur-sm">Featured</span>
                      )}
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="mb-1 truncate text-[13px] font-bold text-white">{item.title}</h3>
                    <p className="mb-3 text-[11px] text-white/30">{item.category}</p>
                    <div className="flex gap-2">
                      <Link href={`/admin/gallery/${item.id}`} className="flex-1 rounded-lg bg-white/[0.06] py-1.5 text-center text-[10px] font-semibold uppercase tracking-wider text-white/60 transition-all hover:bg-white/[0.1] hover:text-white">
                        Edit
                      </Link>
                      <DeleteButton table="gallery" id={item.id} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {hasMore && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="rounded-full border border-white/[0.08] bg-white/[0.03] px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-white/80"
              >
                Load more ({items.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.02] py-16">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10">
            <svg className="h-8 w-8 text-cyan-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="mb-1 text-sm font-medium text-white/50">No gallery items yet</p>
          <p className="mb-5 text-[12px] text-white/25">Upload your first photo or video</p>
          <Link href="/admin/gallery/new" className="rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 px-6 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white">
            Upload Media
          </Link>
        </div>
      )}
    </div>
  );
}
