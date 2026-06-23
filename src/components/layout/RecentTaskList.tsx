import { getMemberById } from "@/services/members.service";
import { StatusBadge, PriorityBadge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { STATUS_CONFIG } from "@/lib/taskMeta";
import { Card } from "@/components/ui/Card";
import type { Task } from "@/types";
import { EmptyState } from "../EmptyState";

export function RecentTasksList({ tasks }: { tasks: Task[] }) {
  return (
    <Card>
      <div className="border-b border-border px-5 py-4">
        <h3 className="text-sm font-semibold text-(--color-ink)">Tareas recientes</h3>
      </div>
      {tasks.length !== 0 ? (
        <ul className="divide-y divide-border">
          {tasks.map((task) => {
            const member = getMemberById(task.assignedId);
            const cfg = STATUS_CONFIG[task.status];

            return (
              <li key={task.id} className="flex items-center gap-4 px-5 py-3">
                {member && (
                  <Avatar
                    initials={member.initials}
                    color={member.avatarColor}
                    title={member.name}
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-(--color-ink)">{task.name}</p>
                  <p className="text-xs text-ink-faint">
                    {task.code} · {member?.name}
                  </p>
                </div>
                <PriorityBadge priority={task.priority} />
                <StatusBadge status={task.status} />
                <div className="flex w-24 items-center gap-2">
                  <ProgressBar value={task.progress} color={cfg.barColor} className="flex-1" />
                  <span className="w-8 text-right text-xs text-(--color-ink-muted)">
                    {task.progress}%
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <>
          <EmptyState message="No hay tareas registradas todavía." />
        </>
      )}
    </Card>
  );
}
