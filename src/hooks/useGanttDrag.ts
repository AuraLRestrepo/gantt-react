import type { DragInfo } from "@/types";
import { useState, useCallback, useRef } from "react";

type DragMode = "move" | "resize-start" | "resize-end";

interface DragState {
  taskId: string;
  mode: DragMode;
  startX: number;
  deltaDays: number;
}

interface UseGanttDragOptions {
  dayWidth: number;
  onMove: (taskId: string, deltaDays: number) => void;
  onResize: (taskId: string, edge: "start" | "end", deltaDays: number) => void;
}

export function useGanttDrag({ dayWidth, onMove, onResize }: UseGanttDragOptions) {
  const [dragState, setDragState] = useState<DragState | null>(null);
  const dragStateRef = useRef<DragState | null>(null);

  const startDrag = useCallback(
    (taskId: string, mode: DragMode, event: React.MouseEvent) => {
      // Evita que iniciar un resize también dispare el mousedown de "mover"
      // si los elementos están anidados (lo vemos en GanttBar).
      event.stopPropagation();

      const initialState: DragState = {
        taskId,
        mode,
        startX: event.clientX,
        deltaDays: 0,
      };

      setDragState(initialState);
      dragStateRef.current = initialState;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const current = dragStateRef.current;
        if (!current) return;

        const deltaX = moveEvent.clientX - current.startX;
        const deltaDays = Math.round(deltaX / dayWidth);

        const updated = { ...current, deltaDays };
        dragStateRef.current = updated;
        setDragState(updated);
      };

      const handleMouseUp = () => {
        const final = dragStateRef.current;

        if (final && final.deltaDays !== 0) {
          if (final.mode === "move") {
            onMove(final.taskId, final.deltaDays);
          } else if (final.mode === "resize-start") {
            onResize(final.taskId, "start", final.deltaDays);
          } else {
            onResize(final.taskId, "end", final.deltaDays);
          }
        }

        dragStateRef.current = null;
        setDragState(null);

        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [dayWidth, onMove, onResize]
  );

  const getDragInfo = useCallback(
    (taskId: string): DragInfo | null => {
      if (dragState?.taskId !== taskId) return null;
      return { mode: dragState.mode, deltaDays: dragState.deltaDays };
    },
    [dragState]
  );

  return { startDrag, getDragInfo };
}
