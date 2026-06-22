import { createContext } from "react";
import type { Task, TaskStatus } from "@/types";

export interface TasksContextValue {
  tasks: Task[];
  moveTask: (taskId: string, deltaDays: number) => void;
  resizeTask: (taskId: string, edge: "start" | "end", deltaDays: number) => void;
  setProgress: (taskId: string, progress: number) => void;
  setStatus: (taskId: string, status: TaskStatus) => void;
}

export const TasksContext = createContext<TasksContextValue | null>(null);
