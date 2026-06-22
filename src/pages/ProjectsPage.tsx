import { getProjects } from "@/services/projects.service";
import { getMemberById } from "@/services/members.service";
import { getTasksByProject } from "@/services/tasks.service";
import { computeMetrics } from "@/lib/metrics";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { ProgressBar } from "@/components/ui/ProgressBar";

export function ProjectsPage() {
  const projects = getProjects();

  return (
    <div>
      <PageHeader title="Proyectos" subtitle="Resumen de todos los proyectos activos" />

      <div className="grid grid-cols-1 gap-5 p-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const projectTasks = getTasksByProject(project.id);
          const metrics = computeMetrics(projectTasks);

          return (
            <Card key={project.id} className="p-5">
              <div className="flex items-start justify-between">
                <h3 className="text-base font-semibold text-ink">{project.name}</h3>
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
              </div>

              <p className="mt-1.5 text-sm text-ink-muted">{project.description}</p>

              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-ink-faint">Progreso</span>
                  <span className="font-medium text-ink">{metrics.overallProgress}%</span>
                </div>
                <ProgressBar value={metrics.overallProgress} />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {project.memberIds.map((memberId) => {
                    const member = getMemberById(memberId);
                    if (!member) return null;
                    return (
                      <Avatar
                        key={memberId}
                        initials={member.initials}
                        color={member.avatarColor}
                        size="sm"
                        title={member.name}
                      />
                    );
                  })}
                </div>
                <span className="text-xs text-ink-faint">{metrics.totalTasks} tareas</span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
