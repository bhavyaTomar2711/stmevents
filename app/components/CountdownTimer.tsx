"use client";

import { useState, useEffect, useRef } from "react";

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

function TimeBlock({
  value,
  label,
  prevValue,
}: {
  value: string;
  label: string;
  prevValue: string;
}) {
  const changed = value !== prevValue;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative flex h-[52px] w-[52px] items-center justify-center overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.06] shadow-lg shadow-black/30 backdrop-blur-md sm:h-[60px] sm:w-[60px] md:h-[68px] md:w-[68px]">
        {/* Inner glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent" />
        <span
          className={`relative text-[22px] font-semibold tabular-nums text-white sm:text-[26px] md:text-[30px] ${
            changed ? "animate-tick" : ""
          }`}
        >
          {value}
        </span>
      </div>
      <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-white/30 sm:text-[10px]">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span className="mb-5 text-lg font-light text-white/20 sm:text-xl">
      :
    </span>
  );
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [time, setTime] = useState<TimeLeft>(calcTimeLeft(targetDate));
  const [mounted, setMounted] = useState(false);
  const prevRef = useRef<TimeLeft>(time);

  useEffect(() => {
    setMounted(true);
    const current = calcTimeLeft(targetDate);
    setTime(current);
    prevRef.current = current;

    const id = setInterval(() => {
      setTime((prev) => {
        prevRef.current = prev;
        return calcTimeLeft(targetDate);
      });
    }, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const prev = prevRef.current;
  const display = mounted ? time : { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const prevDisplay = mounted ? prev : display;

  return (
    <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4">
      <TimeBlock
        value={pad(display.days)}
        label="Days"
        prevValue={pad(prevDisplay.days)}
      />
      <Separator />
      <TimeBlock
        value={pad(display.hours)}
        label="Hrs"
        prevValue={pad(prevDisplay.hours)}
      />
      <Separator />
      <TimeBlock
        value={pad(display.minutes)}
        label="Min"
        prevValue={pad(prevDisplay.minutes)}
      />
      <Separator />
      <TimeBlock
        value={pad(display.seconds)}
        label="Sec"
        prevValue={pad(prevDisplay.seconds)}
      />
    </div>
  );
}
