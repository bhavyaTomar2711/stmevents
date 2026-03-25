"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { useState, useEffect, useCallback } from "react";

/* ─── SVG icon helper ───────────────────────────────────────────── */
function I({ d, size = 18 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

/* ─── Toolbar button ────────────────────────────────────────────── */
function Btn({ active, onClick, title, children }: { active?: boolean; onClick: () => void; title: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`flex h-8 w-8 items-center justify-center rounded transition-colors ${active ? "bg-purple-600 text-white" : "text-white/50 hover:bg-white/[0.08] hover:text-white"}`}
    >
      {children}
    </button>
  );
}

/* ─── Divider ───────────────────────────────────────────────────── */
function Div() {
  return <div className="mx-1 h-5 w-px bg-white/[0.1]" />;
}

/* ─── Main Component ────────────────────────────────────────────── */
interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  label?: string;
}

export default function RichTextEditor({ value, onChange, placeholder = "Start writing...", label }: RichTextEditorProps) {
  const [preview, setPreview] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-purple-400 underline" } }),
      Image.configure({ HTMLAttributes: { class: "max-w-full rounded-lg my-2" } }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "prose prose-invert prose-sm max-w-none min-h-[180px] px-4 py-3 outline-none text-white/90 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-4 [&_h1]:mb-2 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-3 [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-2 [&_h3]:mb-1 [&_p]:my-1 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-0.5 [&_blockquote]:border-l-2 [&_blockquote]:border-purple-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-white/60 [&_code]:bg-white/[0.1] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-purple-300 [&_a]:text-purple-400 [&_a]:underline [&_img]:rounded-lg [&_img]:max-w-full",
      },
    },
    onUpdate: ({ editor: e }) => {
      onChange(e.getHTML());
    },
  });

  // Sync external value → editor (when value changes from outside, e.g. form reset)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  const addImage = useCallback(() => {
    const url = window.prompt("Enter image URL:");
    if (url && editor) editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const addVideo = useCallback(() => {
    const url = window.prompt("Enter video embed URL (YouTube / Vimeo):");
    if (url && editor) {
      editor
        .chain()
        .focus()
        .insertContent(`<div class="my-2"><iframe src="${url}" width="100%" height="315" frameborder="0" allowfullscreen style="border-radius:8px;"></iframe></div>`)
        .run();
    }
  }, [editor]);

  const addLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL:", prev || "https://");
    if (url === null) return;
    if (url === "") { editor.chain().focus().extendMarkRange("link").unsetLink().run(); return; }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div>
      {label && (
        <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-purple-400">
          {label}
        </label>
      )}

      <div className="overflow-hidden rounded-lg border border-white/[0.1] bg-white/[0.06]">
        {/* ── Toolbar ── */}
        <div className="flex flex-wrap items-center gap-0.5 border-b border-white/[0.08] px-2 py-1.5">
          {/* Text formatting */}
          <Btn active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold">
            <I d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6zM6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
          </Btn>
          <Btn active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic">
            <I d="M19 4h-9M14 20H5M15 4L9 20" />
          </Btn>
          <Btn active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline">
            <I d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3M4 21h16" />
          </Btn>
          <Btn active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()} title="Code">
            <I d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
          </Btn>

          <Div />

          {/* Headings */}
          <Btn active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} title="Heading 1">
            <span className="text-xs font-bold">H₁</span>
          </Btn>
          <Btn active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="Heading 2">
            <span className="text-xs font-bold">H₂</span>
          </Btn>
          <Btn active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} title="Heading 3">
            <span className="text-xs font-bold">H₃</span>
          </Btn>

          <Div />

          {/* Alignment */}
          <Btn active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()} title="Align Left">
            <I d="M3 6h18M3 12h10M3 18h14" />
          </Btn>
          <Btn active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()} title="Align Center">
            <I d="M3 6h18M7 12h10M5 18h14" />
          </Btn>
          <Btn active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()} title="Align Right">
            <I d="M3 6h18M11 12h10M7 18h14" />
          </Btn>
          <Btn active={editor.isActive({ textAlign: "justify" })} onClick={() => editor.chain().focus().setTextAlign("justify").run()} title="Justify">
            <I d="M3 6h18M3 12h18M3 18h18" />
          </Btn>

          <Div />

          {/* Lists */}
          <Btn active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet List">
            <I d="M9 6h11M9 12h11M9 18h11M5 6h.01M5 12h.01M5 18h.01" />
          </Btn>
          <Btn active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Ordered List">
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 6h11M10 12h11M10 18h11" />
              <text x="3" y="8" fontSize="8" fill="currentColor" stroke="none" fontFamily="sans-serif" fontWeight="bold">1</text>
              <text x="3" y="14" fontSize="8" fill="currentColor" stroke="none" fontFamily="sans-serif" fontWeight="bold">2</text>
              <text x="3" y="20" fontSize="8" fill="currentColor" stroke="none" fontFamily="sans-serif" fontWeight="bold">3</text>
            </svg>
          </Btn>

          {/* Blockquote */}
          <Btn active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Blockquote">
            <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.171 11 15c0 1.933-1.567 3.5-3.5 3.5-1.168 0-2.275-.548-2.917-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.171 21 15c0 1.933-1.567 3.5-3.5 3.5-1.168 0-2.275-.548-2.917-1.179z" />
            </svg>
          </Btn>

          <Div />

          {/* Media / Link */}
          <Btn onClick={addImage} title="Insert Image">
            <I d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM9 10a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM21 15l-5-5L5 21" />
          </Btn>
          <Btn onClick={addVideo} title="Insert Video">
            <I d="M23 7l-7 5 7 5V7zM14 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" />
          </Btn>
          <Btn active={editor.isActive("link")} onClick={addLink} title="Link">
            <I d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </Btn>

          {/* Clear formatting */}
          <Btn onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} title="Clear Formatting">
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 7V4h16v3" />
              <path d="M9 20h6" />
              <path d="M12 4v16" />
              <line x1="3" y1="21" x2="21" y2="3" />
            </svg>
          </Btn>

          <Div />

          {/* Preview */}
          <Btn active={preview} onClick={() => setPreview(!preview)} title="Preview">
            <I d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
          </Btn>
        </div>

        {/* ── Editor or Preview ── */}
        {preview ? (
          <div
            className="min-h-[180px] px-4 py-3 text-sm text-white/90 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-4 [&_h1]:mb-2 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-3 [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-2 [&_h3]:mb-1 [&_p]:my-1 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-0.5 [&_blockquote]:border-l-2 [&_blockquote]:border-purple-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-white/60 [&_code]:bg-white/[0.1] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-purple-300 [&_a]:text-purple-400 [&_a]:underline [&_img]:rounded-lg [&_img]:max-w-full"
            dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
          />
        ) : (
          <EditorContent editor={editor} />
        )}
      </div>
    </div>
  );
}
