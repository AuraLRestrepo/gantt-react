import { useMemo } from "react";
import { cn } from "@/lib/cn";
import type { TimelineDay } from "@/lib/date";

interface MonthGroup {
  label: string;
  dayCount: number;
}

function groupByMonth(days: TimelineDay[]): MonthGroup[] {
  const groups: MonthGroup[] = [];

  for (const day of days) {
    const label = `${day.monthLabel} ${day.year}`;
    const lastGroup = groups[groups.length - 1];

    if (lastGroup && lastGroup.label === label) {
      lastGroup.dayCount += 1;
    } else {
      groups.push({ label, dayCount: 1 });
    }
  }

  return groups;
}

interface TimelineHeaderProps {
  days: TimelineDay[];
  dayWidth: number;
}

export function TimelineHeader({ days, dayWidth }: TimelineHeaderProps) {
  const monthGroups = useMemo(() => groupByMonth(days), [days]);

  return (
    <div className="sticky top-0 z-10 bg-(--color-surface)">
      {/* Fila de meses */}
      <div className="flex border-b border-border">
        {monthGroups.map((group, i) => (
          <div
            key={i}
            className="border-r border-border px-2 py-1.5 text-xs font-semibold capitalize text-(--color-ink-muted)"
            style={{ width: group.dayCount * dayWidth }}
          >
            {group.label}
          </div>
        ))}
      </div>

      {/* Fila de días */}
      <div className="flex border-b border-border">
        {days.map((day, i) => (
          <div
            key={i}
            className={cn(
              "flex flex-col items-center justify-center border-r border-border py-1.5 text-xs",
              day.isWeekend && "bg-surface-subtle",
              day.isToday && "bg-brand-soft font-bold"
            )}
            style={{ width: dayWidth }}
          >
            <span className="text-ink-faint">{day.weekdayLabel}</span>
            <span className="text-(--color-ink)">{day.dayOfMonth}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
