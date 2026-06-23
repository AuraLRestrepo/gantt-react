import { useReducer, type ReactNode } from "react";
import { getTasks } from "@/services/tasks.service";
import { TasksContext, type TasksContextValue } from "@/store/TasksContext.context";
import { tasksReducer } from "@/store/tasksReducer";

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(tasksReducer, getTasks());

  const value: TasksContextValue = {
    tasks,
    moveTask: (taskId, deltaDays) => dispatch({ type: "MOVE_TASK", taskId, deltaDays }),
    resizeTask: (taskId, edge, deltaDays) =>
      dispatch({ type: "RESIZE_TASK", taskId, edge, deltaDays }),
    setProgress: (taskId, progress) => dispatch({ type: "SET_PROGRESS", taskId, progress }),
    setStatus: (taskId, status) => dispatch({ type: "SET_STATUS", taskId, status }),
  };

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}
