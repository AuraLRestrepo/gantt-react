import type { TaskPriority, TaskStatus } from "@/types";

export const STATUS_CONFIG: Record<
  TaskStatus,
  {
    label: string;
    dotClass: string;
    badgeBg: string;
    badgeText: string;
    barColor: string;
  }
> = {
  pending: {
    label: "Pendiente",
    dotClass: "bg-[var(--color-status-pending)]",
    badgeBg: "bg-[var(--color-status-pending-soft)]",
    badgeText: "text-[var(--color-status-pending)]",
    barColor: "var(--color-status-pending)",
  },
  "in-progress": {
    label: "En progreso",
    dotClass: "bg-[var(--color-status-progress)]",
    badgeBg: "bg-[var(--color-status-progress-soft)]",
    badgeText: "text-[var(--color-status-progress)]",
    barColor: "var(--color-status-progress)",
  },
  completed: {
    label: "Completada",
    dotClass: "bg-[var(--color-status-completed)]",
    badgeBg: "bg-[var(--color-status-completed-soft)]",
    badgeText: "text-[var(--color-status-completed)]",
    barColor: "var(--color-status-completed)",
  },
  blocked: {
    label: "Bloqueada",
    dotClass: "bg-[var(--color-status-blocked)]",
    badgeBg: "bg-[var(--color-status-blocked-soft)]",
    badgeText: "text-[var(--color-status-blocked)]",
    barColor: "var(--color-status-blocked)",
  },
};

export const PRIORITY_CONFIG: Record<TaskPriority, { label: string; textClass: string }> = {
  low: {
    label: "Baja",
    textClass: "text-[var(--color-priority-low)]",
  },
  medium: {
    label: "Media",
    textClass: "text-[var(--color-priority-medium)]",
  },
  high: {
    label: "Alta",
    textClass: "text-[var(--color-priority-high)]",
  },
};
