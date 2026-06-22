import { ListChecks, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ProgressRing } from "@/components/layout/ProgressRing";
import { RecentTasksList } from "@/components/layout/RecentTaskList";
import { getTasks } from "@/services/tasks.service";
import { computeMetrics } from "@/lib/metrics";

const tasks = getTasks();
const metrics = computeMetrics(tasks);
const recentTasks = tasks.slice(0, 6);

export function DashboardPage() {
  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Resumen del proyecto GanttPro v1.0" />
      <div className="p-8">
        {/* Métricas */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <MetricCard
            label="Total tareas"
            value={metrics.totalTasks}
            hint="En el proyecto activo"
            icon={<ListChecks size={20} />}
            accent="#5b5bf6"
          />
          <MetricCard
            label="Completadas"
            value={metrics.completedTasks}
            hint={`${Math.round((metrics.completedTasks / metrics.totalTasks) * 100)}% del total`}
            icon={<CheckCircle2 size={20} />}
            accent="#16a34a"
          />
          <MetricCard
            label="En progreso"
            value={metrics.inProgressTasks}
            hint="Activas hoy"
            icon={<Clock size={20} />}
            accent="#2563eb"
          />
          <MetricCard
            label="Bloqueadas"
            value={metrics.blockedTasks}
            hint="Requieren atención"
            icon={<AlertTriangle size={20} />}
            accent="#dc2626"
          />
        </div>

        {/* Progreso general + tareas recientes */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-(--color-surface) p-6 shadow-sm">
            <p className="mb-4 text-sm font-semibold text-(--color-ink)">Avance general</p>
            <ProgressRing value={metrics.overallProgress} />
            <div className="mt-4 grid w-full grid-cols-2 gap-2 text-center text-xs">
              <div className="rounded-lg bg-surface-subtle py-2">
                <p className="font-semibold text-(--color-ink)">
                  {metrics.completedTasks}/{metrics.totalTasks}
                </p>
                <p className="text-ink-faint">completadas</p>
              </div>
              <div className="rounded-lg bg-surface-subtle py-2">
                <p className="font-semibold text-(--color-ink)">{metrics.inProgressTasks}</p>
                <p className="text-ink-faint">activas</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <RecentTasksList tasks={recentTasks} />
          </div>
        </div>
      </div>
    </div>
  );
}
