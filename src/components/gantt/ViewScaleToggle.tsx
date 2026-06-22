import type { ViewScale } from "@/types";
import { cn } from "@/lib/cn";

const SCALE_OPTIONS: { value: ViewScale; label: string }[] = [
  { value: "day", label: "Día" },
  { value: "week", label: "Semana" },
  { value: "month", label: "Mes" },
];

interface ViewScaleToggleProps {
  value: ViewScale;
  onChange: (scale: ViewScale) => void;
}

export function ViewScaleToggle({ value, onChange }: ViewScaleToggleProps) {
  return (
    <div className="flex items-center rounded-lg border border-border bg-surface p-1">
      {SCALE_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
            value === option.value
              ? "bg-brand text-white"
              : "text-ink-muted hover:bg-surface-subtle"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
