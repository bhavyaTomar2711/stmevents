"use client";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  color?: "purple" | "emerald" | "amber";
}

const colorMap = {
  purple: {
    track: "bg-purple-600",
    glow: "shadow-purple-500/30",
    dot: "bg-white",
  },
  emerald: {
    track: "bg-emerald-600",
    glow: "shadow-emerald-500/30",
    dot: "bg-white",
  },
  amber: {
    track: "bg-amber-600",
    glow: "shadow-amber-500/30",
    dot: "bg-white",
  },
};

export default function ToggleSwitch({
  checked,
  onChange,
  label,
  description,
  color = "purple",
}: ToggleSwitchProps) {
  const colors = colorMap[color];

  return (
    <label className="group flex cursor-pointer items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition-all hover:border-white/[0.1] hover:bg-white/[0.04]">
      {/* Toggle track */}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-all duration-300 ${
          checked
            ? `${colors.track} shadow-lg ${colors.glow}`
            : "bg-white/[0.1]"
        }`}
      >
        <span
          className={`inline-block h-4.5 w-4.5 transform rounded-full shadow-sm transition-all duration-300 ${colors.dot} ${
            checked ? "translate-x-[22px] h-[18px] w-[18px]" : "translate-x-[3px] h-[18px] w-[18px]"
          }`}
        />
      </button>

      {/* Label */}
      <div className="flex flex-col">
        <span className="text-[13px] font-medium text-white/80">{label}</span>
        {description && (
          <span className="text-[11px] text-white/30">{description}</span>
        )}
      </div>
    </label>
  );
}
