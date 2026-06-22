import { useRef, useState } from "react";
import { useTasks } from "@/store/useTasks";
import { useGanttGeometry } from "@/hooks/useGanttGeometry";
import { useGanttDrag } from "@/hooks/useGanttDrag";
import { generateTimelineDays } from "@/lib/date";
import { PageHeader } from "@/components/layout/PageHeader";
import { GanttTaskTable, GANTT_ROW_HEIGHT } from "@/components/gantt/GanttTaskTable";
import { TimelineHeader } from "@/components/gantt/TimelineHeader";
import { GanttBar } from "@/components/gantt/GanttBar";
import { ViewScaleToggle } from "@/components/gantt/ViewScaleToggle";
import type { ViewScale } from "@/types";

export function GanttPage() {
  const { tasks, moveTask, resizeTask } = useTasks();
  const [scale, setScale] = useState<ViewScale>("week");

  const geometry = useGanttGeometry(tasks, scale);
  const days = generateTimelineDays(geometry.rangeStart, geometry.rangeEnd);

  const drag = useGanttDrag({
    dayWidth: geometry.dayWidth,
    onMove: moveTask,
    onResize: resizeTask,
  });

  const tableScrollRef = useRef<HTMLDivElement>(null);
  const timelineScrollRef = useRef<HTMLDivElement>(null);

  const syncScrollFromTable = () => {
    if (tableScrollRef.current && timelineScrollRef.current) {
      timelineScrollRef.current.scrollTop = tableScrollRef.current.scrollTop;
    }
  };

  const syncScrollFromTimeline = () => {
    if (timelineScrollRef.current && tableScrollRef.current) {
      tableScrollRef.current.scrollTop = timelineScrollRef.current.scrollTop;
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <PageHeader
        title="Diagrama de Gantt"
        subtitle="Arrastra para mover, usa los bordes para redimensionar"
        actions={<ViewScaleToggle value={scale} onChange={setScale} />}
      />

      <div className="flex flex-1 overflow-hidden">
        <div ref={tableScrollRef} onScroll={syncScrollFromTable} className="overflow-y-auto">
          <GanttTaskTable tasks={tasks} />
        </div>

        <div
          ref={timelineScrollRef}
          onScroll={syncScrollFromTimeline}
          className="flex-1 overflow-auto"
        >
          <div style={{ width: geometry.totalWidth }} className="relative">
            <TimelineHeader days={days} dayWidth={geometry.dayWidth} />

            <div className="relative">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="relative border-b border-border"
                  style={{ height: GANTT_ROW_HEIGHT }}
                >
                  <GanttBar
                    task={task}
                    x={geometry.dateToX(task.startDate)}
                    width={geometry.durationToWidth(task.startDate, task.endDate)}
                    rowHeight={GANTT_ROW_HEIGHT}
                    dayWidth={geometry.dayWidth}
                    dragInfo={drag.getDragInfo(task.id)}
                    onStartDrag={(mode, e) => drag.startDrag(task.id, mode, e)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
