"use client";

import { useState, useRef, useEffect } from "react";

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  includeTime?: boolean;
  disablePast?: boolean;
  placeholder?: string;
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

/* ── Custom Time Picker ── */
function TimePicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [h, m] = value.split(":").map(Number);
  const hour = isNaN(h) ? 20 : h;
  const minute = isNaN(m) ? 0 : m;

  const setHour = (newH: number) => {
    onChange(`${String(newH).padStart(2, "0")}:${String(minute).padStart(2, "0")}`);
  };
  const setMinute = (newM: number) => {
    onChange(`${String(hour).padStart(2, "0")}:${String(newM).padStart(2, "0")}`);
  };

  return (
    <div className="border-t border-white/[0.06] px-4 py-3">
      <div className="mb-3 flex items-center gap-2">
        <svg className="h-4 w-4 text-purple-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-white/30">Time</span>
      </div>
      <div className="flex items-center justify-center gap-2">
        {/* Hour */}
        <div className="flex flex-col items-center">
          <button type="button" onClick={() => setHour((hour + 1) % 24)} className="flex h-7 w-10 items-center justify-center rounded-md text-white/30 transition-colors hover:bg-white/[0.06] hover:text-white">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>
          </button>
          <div className="flex h-10 w-14 items-center justify-center rounded-lg border border-purple-500/30 bg-purple-500/10 text-lg font-bold tabular-nums text-white">
            {String(hour).padStart(2, "0")}
          </div>
          <button type="button" onClick={() => setHour((hour - 1 + 24) % 24)} className="flex h-7 w-10 items-center justify-center rounded-md text-white/30 transition-colors hover:bg-white/[0.06] hover:text-white">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
          </button>
        </div>

        <span className="text-xl font-bold text-purple-400/50">:</span>

        {/* Minute */}
        <div className="flex flex-col items-center">
          <button type="button" onClick={() => setMinute((minute + 5) % 60)} className="flex h-7 w-10 items-center justify-center rounded-md text-white/30 transition-colors hover:bg-white/[0.06] hover:text-white">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>
          </button>
          <div className="flex h-10 w-14 items-center justify-center rounded-lg border border-purple-500/30 bg-purple-500/10 text-lg font-bold tabular-nums text-white">
            {String(minute).padStart(2, "0")}
          </div>
          <button type="button" onClick={() => setMinute((minute - 5 + 60) % 60)} className="flex h-7 w-10 items-center justify-center rounded-md text-white/30 transition-colors hover:bg-white/[0.06] hover:text-white">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DatePicker({
  label,
  value,
  onChange,
  required = false,
  includeTime = false,
  disablePast = true,
  placeholder,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Parse current value
  const dateOnly = value ? value.slice(0, 10) : "";
  const timeOnly = value && includeTime ? value.slice(11, 16) : "20:00";

  const today = new Date();
  const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate());

  // Calendar view state
  const parsed = dateOnly ? new Date(dateOnly + "T00:00:00") : new Date();
  const [viewYear, setViewYear] = useState(parsed.getFullYear());
  const [viewMonth, setViewMonth] = useState(parsed.getMonth());

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Navigate months
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
    const ds = toDateStr(viewYear, viewMonth, day);
    if (includeTime) {
      onChange(`${ds}T${timeOnly}`);
    } else {
      onChange(ds);
    }
    if (!includeTime) setOpen(false);
  };

  const updateTime = (t: string) => {
    if (dateOnly) {
      onChange(`${dateOnly}T${t}`);
    }
  };

  const isDisabled = (day: number) => {
    if (!disablePast) return false;
    const ds = toDateStr(viewYear, viewMonth, day);
    return ds < todayStr;
  };

  const isSelected = (day: number) => {
    return toDateStr(viewYear, viewMonth, day) === dateOnly;
  };

  const isToday = (day: number) => {
    return toDateStr(viewYear, viewMonth, day) === todayStr;
  };

  // Format display value
  const displayValue = (() => {
    if (!dateOnly) return "";
    const d = new Date(dateOnly + "T00:00:00");
    const formatted = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    if (includeTime && timeOnly) return `${formatted} at ${timeOnly}`;
    return formatted;
  })();

  // Check if prev month nav should be disabled
  const isPrevDisabled = disablePast && viewYear === today.getFullYear() && viewMonth <= today.getMonth();

  return (
    <div ref={ref} className="relative">
      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-purple-400">
        {label}
        {required && <span className="text-red-400"> *</span>}
      </label>

      {/* Input trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between rounded-lg border border-white/[0.1] bg-white/[0.06] px-4 py-3 text-left text-sm outline-none transition-colors focus:border-purple-500/50 ${
          displayValue ? "text-white" : "text-white/30"
        }`}
      >
        <span>{displayValue || placeholder || "Select date..."}</span>
        <svg className={`h-4 w-4 text-purple-400/60 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      </button>

      {/* Calendar dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 w-[320px] overflow-hidden rounded-xl border border-white/[0.08] bg-[#0e0e18] shadow-2xl shadow-purple-500/5">
          {/* Header - Month/Year nav */}
          <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
            <button
              type="button"
              onClick={prevMonth}
              disabled={isPrevDisabled}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition-all hover:bg-white/[0.06] hover:text-white disabled:opacity-20 disabled:hover:bg-transparent"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <span className="text-sm font-semibold tracking-wide text-white">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition-all hover:bg-white/[0.06] hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Day names */}
          <div className="grid grid-cols-7 border-b border-white/[0.04] px-3 py-2">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-[10px] font-semibold uppercase tracking-wider text-white/25">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1 p-3">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {/* Day cells */}
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
                  className={`relative flex h-9 w-full items-center justify-center rounded-lg text-[13px] font-medium transition-all ${
                    selected
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                      : disabled
                        ? "cursor-not-allowed text-white/10"
                        : "text-white/60 hover:bg-purple-500/15 hover:text-white"
                  }`}
                >
                  {day}
                  {todayMark && !selected && (
                    <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-purple-500" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Time picker */}
          {includeTime && (
            <TimePicker value={timeOnly} onChange={updateTime} />
          )}

          {/* Footer actions */}
          <div className="flex items-center justify-between border-t border-white/[0.06] px-4 py-2.5">
            <button
              type="button"
              onClick={() => {
                const t = new Date();
                setViewYear(t.getFullYear());
                setViewMonth(t.getMonth());
                selectDate(t.getDate());
              }}
              className="text-[11px] font-semibold uppercase tracking-wider text-purple-400 transition-colors hover:text-purple-300"
            >
              Today
            </button>
            <div className="flex gap-2">
              {value && (
                <button
                  type="button"
                  onClick={() => { onChange(""); setOpen(false); }}
                  className="text-[11px] font-semibold uppercase tracking-wider text-white/25 transition-colors hover:text-white/50"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-purple-600/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-purple-400 transition-colors hover:bg-purple-600/30"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
