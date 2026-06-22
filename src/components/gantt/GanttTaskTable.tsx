import { getMemberById } from "@/services/members.service";
import { StatusBadge, PriorityBadge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import type { Task } from "@/types";

export const GANTT_ROW_HEIGHT = 44;

interface GanttTaskTableProps {
  tasks: Task[];
}

export function GanttTaskTable({ tasks }: GanttTaskTableProps) {
  return (
    <div className="shrink-0 border-r border-border bg-(--color-surface)">
      {/* Header (altura debe igualar la altura total del TimelineHeader: 2 filas) */}
      <div className="sticky top-0 z-10 flex h-14.25 items-end gap-3 border-b border-border bg-(--color-surface) px-4 pb-1.5 text-xs font-semibold text-(--color-ink-muted)">
        <span className="w-12">ID</span>
        <span className="min-w-40 flex-1">Tarea</span>
        <span className="w-12">Resp.</span>
        <span className="w-14">Prior.</span>
        <span className="w-24">Estado</span>
        <span className="w-10 text-right">%</span>
      </div>

      {tasks.map((task) => {
        const member = getMemberById(task.assignedId);

        return (
          <div
            key={task.id}
            className="flex items-center gap-3 border-b border-border px-4"
            style={{ height: GANTT_ROW_HEIGHT }}
          >
            <span className="w-12 text-xs font-medium text-ink-faint">{task.code}</span>
            <span className="min-w-40 flex-1 truncate text-sm font-medium text-(--color-ink)">
              {task.name}
            </span>
            <span className="w-12">
              {member && (
                <Avatar
                  initials={member.initials}
                  color={member.avatarColor}
                  size="sm"
                  title={member.name}
                />
              )}
            </span>
            <span className="w-14">
              <PriorityBadge priority={task.priority} />
            </span>
            <span className="w-24">
              <StatusBadge status={task.status} />
            </span>
            <span className="w-10 text-right text-xs font-medium text-(--color-ink-muted)">
              {task.progress}%
            </span>
          </div>
        );
      })}
    </div>
  );
}
