import { STATUS_CONFIG } from "@/lib/taskMeta";
import { cn } from "@/lib/cn";
import type { DragMode, Task } from "@/types";

interface GanttBarProps {
  task: Task;
  x: number;
  width: number;
  rowHeight: number;
  dayWidth: number;
  dragInfo: { mode: DragMode; deltaDays: number } | null;
  onStartDrag: (mode: DragMode, event: React.MouseEvent) => void;
}

export function GanttBar({
  task,
  x,
  width,
  rowHeight,
  dayWidth,
  dragInfo,
  onStartDrag,
}: GanttBarProps) {
  const cfg = STATUS_CONFIG[task.status];
  const barHeight = 26;
  const isDragging = dragInfo !== null;

  // Calculamos posición y ancho visual según el modo de arrastre activo.
  let visualX = x;
  let visualWidth = width;

  if (dragInfo) {
    const deltaPx = dragInfo.deltaDays * dayWidth;

    if (dragInfo.mode === "move") {
      visualX = x + deltaPx;
    } else if (dragInfo.mode === "resize-start") {
      visualX = x + deltaPx;
      visualWidth = width - deltaPx;
    } else if (dragInfo.mode === "resize-end") {
      visualWidth = width + deltaPx;
    }
  }

  return (
    <div
      onMouseDown={(e) => onStartDrag("move", e)}
      role="button"
      tabIndex={0}
      aria-label={`${task.name}, ${task.progress} por ciento completado, ${STATUS_CONFIG[task.status].label}`}
      className={cn(
        "group absolute flex cursor-grab items-center overflow-hidden rounded-md text-xs font-medium text-white shadow-sm select-none",
        isDragging && "cursor-grabbing shadow-lg ring-2 ring-white/60"
      )}
      style={{
        left: visualX,
        width: Math.max(visualWidth, 24),
        height: barHeight,
        top: (rowHeight - barHeight) / 2,
        backgroundColor: cfg.barColor,
        zIndex: isDragging ? 20 : 1,
      }}
      title={`${task.name} · ${task.progress}%`}
    >
      <div
        className="absolute inset-y-0 left-0 bg-white/25"
        style={{ width: `${task.progress}%` }}
      />
      <span className="relative truncate px-2">{task.name}</span>

      {/* Asa izquierda: resize-start */}
      <div
        onMouseDown={(e) => onStartDrag("resize-start", e)}
        className="absolute inset-y-0 left-0 w-2 cursor-ew-resize opacity-0 group-hover:opacity-100"
      >
        <div className="absolute inset-y-1.5 left-0.5 w-0.5 rounded-full bg-white/80" />
      </div>

      {/* Asa derecha: resize-end */}
      <div
        onMouseDown={(e) => onStartDrag("resize-end", e)}
        className="absolute inset-y-0 right-0 w-2 cursor-ew-resize opacity-0 group-hover:opacity-100"
      >
        <div className="absolute inset-y-1.5 right-0.5 w-0.5 rounded-full bg-white/80" />
      </div>
    </div>
  );
}
