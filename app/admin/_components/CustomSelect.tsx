"use client";

import { useState, useRef, useEffect } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  required?: boolean;
}

export default function CustomSelect({
  label,
  value,
  onChange,
  options,
  required = false,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((o) => o.value === value)?.label || value;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {label && (
        <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-purple-400">
          {label}
          {required && <span className="text-red-400"> *</span>}
        </label>
      )}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-lg border border-white/[0.1] bg-white/[0.06] px-4 py-3 text-left text-sm text-white outline-none transition-colors hover:border-white/[0.15] focus:border-purple-500/50"
      >
        <span>{selectedLabel}</span>
        <svg
          className={`h-4 w-4 text-white/30 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1.5 w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#0e0e18] py-1 shadow-2xl shadow-purple-500/5">
          {options.map((option) => {
            const isActive = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-all ${
                  isActive
                    ? "bg-purple-500/15 text-purple-300"
                    : "text-white/60 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <span
                  className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border ${
                    isActive
                      ? "border-purple-500 bg-purple-500"
                      : "border-white/15 bg-transparent"
                  }`}
                >
                  {isActive && (
                    <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                </span>
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
