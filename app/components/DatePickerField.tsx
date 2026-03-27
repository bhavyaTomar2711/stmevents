"use client";

import { useState, useRef, useEffect } from "react";

interface DatePickerFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  labelClassName?: string;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function toDateStr(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export default function DatePickerField({
  label,
  value,
  onChange,
  className = "",
  labelClassName = "",
}: DatePickerFieldProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const today = new Date();
  const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate());

  const parsed = value ? new Date(value + "T00:00:00") : new Date();
  const [viewYear, setViewYear] = useState(parsed.getFullYear());
  const [viewMonth, setViewMonth] = useState(parsed.getMonth());

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const selectDate = (day: number) => {
    onChange(toDateStr(viewYear, viewMonth, day));
    setOpen(false);
  };

  const isDisabled = (day: number) => toDateStr(viewYear, viewMonth, day) < todayStr;
  const isSelected = (day: number) => toDateStr(viewYear, viewMonth, day) === value;
  const isToday = (day: number) => toDateStr(viewYear, viewMonth, day) === todayStr;

  const displayValue = (() => {
    if (!value) return "";
    const d = new Date(value + "T00:00:00");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  })();

  const isPrevDisabled = viewYear === today.getFullYear() && viewMonth <= today.getMonth();

  return (
    <div ref={ref} className="relative">
      <label className={labelClassName || "mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35"}>
        {label}
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={className || "flex w-full items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-3 text-left text-sm text-white outline-none transition-colors focus:border-purple-500/40"}
      >
        <span className={displayValue ? "text-white" : "text-white/30"}>
          {displayValue || "Select date..."}
        </span>
        <svg className="h-4 w-4 text-purple-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-[300px] overflow-hidden rounded-xl border border-white/[0.08] bg-[#0e0e18] shadow-2xl shadow-purple-500/5">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
            <button type="button" onClick={prevMonth} disabled={isPrevDisabled} className="flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition-all hover:bg-white/[0.06] hover:text-white disabled:opacity-20">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </button>
            <span className="text-[13px] font-semibold text-white">{MONTHS[viewMonth]} {viewYear}</span>
            <button type="button" onClick={nextMonth} className="flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition-all hover:bg-white/[0.06] hover:text-white">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </button>
          </div>

          <div className="grid grid-cols-7 border-b border-white/[0.04] px-2.5 py-2">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-[10px] font-semibold uppercase tracking-wider text-white/25">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0.5 p-2.5">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const disabled = isDisabled(day);
              const selected = isSelected(day);
              const todayMark = isToday(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => !disabled && selectDate(day)}
                  disabled={disabled}
                  className={`relative flex h-8 w-full items-center justify-center rounded-lg text-[13px] font-medium transition-all ${
                    selected
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                      : disabled
                        ? "cursor-not-allowed text-white/10"
                        : "text-white/60 hover:bg-purple-500/15 hover:text-white"
                  }`}
                >
                  {day}
                  {todayMark && !selected && (
                    <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-purple-500" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between border-t border-white/[0.06] px-3 py-2">
            <button type="button" onClick={() => { const t = new Date(); setViewYear(t.getFullYear()); setViewMonth(t.getMonth()); selectDate(t.getDate()); }} className="text-[11px] font-semibold uppercase tracking-wider text-purple-400 hover:text-purple-300">Today</button>
            {value && <button type="button" onClick={() => { onChange(""); setOpen(false); }} className="text-[11px] font-semibold uppercase tracking-wider text-white/25 hover:text-white/50">Clear</button>}
          </div>
        </div>
      )}
    </div>
  );
}
