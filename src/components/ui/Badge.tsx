import { cn } from "@/lib/cn";
import { PRIORITY_CONFIG, STATUS_CONFIG } from "@/lib/taskMeta";
import type { TaskPriority, TaskStatus } from "@/types";

export function StatusBadge({ status }: { status: TaskStatus }) {
  const cfg = STATUS_CONFIG[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        cfg.badgeBg,
        cfg.badgeText
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dotClass)} />
      {cfg.label}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  const cfg = PRIORITY_CONFIG[priority];

  return <span className={cn("text-xs font-medium", cfg.textClass)}>{cfg.label}</span>;
}
