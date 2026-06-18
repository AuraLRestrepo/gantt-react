import type { Task } from "@/types";

export interface DashboardMetrics {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  blockedTasks: number;
  overallProgress: number;
}

export function computeMetrics(tasks: Task[]): DashboardMetrics {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((item) => item.status === "completed").length;
  const inProgressTasks = tasks.filter((item) => item.status === "in-progress").length;
  const blockedTasks = tasks.filter((item) => item.status === "blocked").length;

  const overallProgress = totalTasks
    ? Math.round(tasks.reduce((sum, item) => sum + item.progress, 0) / totalTasks)
    : 0;

  return { totalTasks, completedTasks, inProgressTasks, blockedTasks, overallProgress };
}
