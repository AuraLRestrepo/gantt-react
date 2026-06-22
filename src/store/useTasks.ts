import { useContext } from "react";
import { TasksContext, type TasksContextValue } from "@/store/TasksContext.context";

export function useTasks(): TasksContextValue {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks debe usarse dentro de un <TasksProvider>");
  }
  return context;
}
