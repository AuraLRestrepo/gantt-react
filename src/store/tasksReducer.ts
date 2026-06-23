import { addDays, parseLocalDate, toLocalISODate } from "@/lib/date";
import type { Task, TaskStatus } from "@/types";

export type TasksAction =
  | { type: "MOVE_TASK"; taskId: string; deltaDays: number }
  | { type: "RESIZE_TASK"; taskId: string; edge: "start" | "end"; deltaDays: number }
  | { type: "SET_PROGRESS"; taskId: string; progress: number }
  | { type: "SET_STATUS"; taskId: string; status: TaskStatus };

export function tasksReducer(state: Task[], action: TasksAction): Task[] {
  switch (action.type) {
    case "MOVE_TASK": {
      return state.map((task) => {
        if (task.id !== action.taskId) return task;

        const newStart = addDays(parseLocalDate(task.startDate), action.deltaDays);
        const newEnd = addDays(parseLocalDate(task.endDate), action.deltaDays);

        return {
          ...task,
          startDate: toLocalISODate(newStart),
          endDate: toLocalISODate(newEnd),
        };
      });
    }

    case "RESIZE_TASK": {
      return state.map((task) => {
        if (task.id !== action.taskId) return task;

        if (action.edge === "start") {
          const newStart = addDays(parseLocalDate(task.startDate), action.deltaDays);
          return { ...task, startDate: toLocalISODate(newStart) };
        } else {
          const newEnd = addDays(parseLocalDate(task.endDate), action.deltaDays);
          return { ...task, endDate: toLocalISODate(newEnd) };
        }
      });
    }

    case "SET_PROGRESS": {
      return state.map((task) =>
        task.id === action.taskId
          ? { ...task, progress: Math.max(0, Math.min(100, action.progress)) }
          : task
      );
    }

    case "SET_STATUS": {
      return state.map((task) =>
        task.id === action.taskId ? { ...task, status: action.status } : task
      );
    }

    default:
      return state;
  }
}
