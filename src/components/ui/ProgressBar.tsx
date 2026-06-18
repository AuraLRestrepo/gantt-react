import { cn } from "@/lib/cn";

interface ProgressBarProps {
  value: number;
  color?: string;
  className?: string;
}

export function ProgressBar({ value, color, className }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div
      className={cn(
        "h-1.5 w-full overflow-hidden rounded-full bg-(--color-surface-sunken)",
        className
      )}
    >
      <div
        className="h-full rounded-full transition-[width] duration-300"
        style={{
          width: `${clamped}%`,
          backgroundColor: color ?? "var(--color-brand)",
        }}
      />
    </div>
  );
}
