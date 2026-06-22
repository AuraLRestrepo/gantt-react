import { useMemo } from "react";
import { addDays, parseLocalDate } from "@/lib/date";
import type { Task, ViewScale } from "@/types";

const DAY_WIDTH: Record<ViewScale, number> = {
  day: 56,
  week: 32,
  month: 12,
};

interface GanttGeometry {
  dayWidth: number;
  rangeStart: Date;
  rangeEnd: Date;
  totalDays: number;
  totalWidth: number;
  dateToX: (isoDate: string) => number;
  durationToWidth: (startIso: string, endIso: string) => number;
}

export function useGanttGeometry(tasks: Task[], scale: ViewScale): GanttGeometry {
  return useMemo(() => {
    const dayWidth = DAY_WIDTH[scale];

    const allStarts = tasks.map((t) => parseLocalDate(t.startDate).getTime());
    const allEnds = tasks.map((t) => parseLocalDate(t.endDate).getTime());

    const earliest = new Date(Math.min(...allStarts));
    const latest = new Date(Math.max(...allEnds));

    // Margen de contexto: unos días antes y después del rango real de tareas
    const rangeStart = addDays(earliest, -3);
    const rangeEnd = addDays(latest, 7);

    const msPerDay = 1000 * 60 * 60 * 24;
    const totalDays = Math.round((rangeEnd.getTime() - rangeStart.getTime()) / msPerDay);

    const dateToX = (isoDate: string): number => {
      const date = parseLocalDate(isoDate);
      const diffDays = Math.round((date.getTime() - rangeStart.getTime()) / msPerDay);
      return diffDays * dayWidth;
    };

    const durationToWidth = (startIso: string, endIso: string): number => {
      const start = parseLocalDate(startIso);
      const end = parseLocalDate(endIso);
      const diffDays = Math.round((end.getTime() - start.getTime()) / msPerDay) + 1;
      return diffDays * dayWidth;
    };

    return {
      dayWidth,
      rangeStart,
      rangeEnd,
      totalDays,
      totalWidth: totalDays * dayWidth,
      dateToX,
      durationToWidth,
    };
  }, [tasks, scale]);
}
