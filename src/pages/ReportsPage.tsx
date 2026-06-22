import { getTasks } from "@/services/tasks.service";
import { STATUS_CONFIG } from "@/lib/taskMeta";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { TaskStatus } from "@/types";

export function ReportsPage() {
  const tasks = getTasks();
  const total = tasks.length;
  const statuses = Object.keys(STATUS_CONFIG) as TaskStatus[];

  return (
    <div>
      <PageHeader title="Reportes" subtitle="Distribución de tareas por estado" />

      <div className="p-8">
        <Card className="p-5">
          <div className="flex flex-col gap-4">
            {statuses.map((status) => {
              const cfg = STATUS_CONFIG[status];
              const count = tasks.filter((task) => task.status === status).length;
              const percentage = Math.round((count / total) * 100);

              return (
                <div key={status}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium text-ink">{cfg.label}</span>
                    <span className="text-ink-muted">
                      {count} ({percentage}%)
                    </span>
                  </div>
                  <ProgressBar value={percentage} color={cfg.barColor} />
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
