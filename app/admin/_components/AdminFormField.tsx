"use client";

interface AdminFormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  textarea?: boolean;
  min?: string;
  hideSpinner?: boolean;
}

export default function AdminFormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder,
  textarea = false,
  min,
  hideSpinner = false,
}: AdminFormFieldProps) {
  const inputClasses =
    "w-full rounded-lg border border-white/[0.1] bg-white/[0.06] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-purple-500/50";

  const spinnerHideClasses = hideSpinner
    ? " [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
    : "";

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-purple-400"
      >
        {label}
        {required && <span className="text-red-400"> *</span>}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          rows={4}
          className={`${inputClasses} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => {
            if (type === "number" && min !== undefined) {
              const num = parseInt(e.target.value);
              if (e.target.value !== "" && !isNaN(num) && num < parseInt(min)) return;
            }
            onChange(e.target.value);
          }}
          onKeyDown={(e) => {
            if (type === "number" && min !== undefined && parseInt(min) >= 0) {
              if (e.key === "-" || e.key === "e" || e.key === "E") {
                e.preventDefault();
              }
            }
          }}
          required={required}
          placeholder={placeholder}
          min={min}
          className={`${inputClasses}${spinnerHideClasses}`}
        />
      )}
    </div>
  );
}
