import { getMembers } from "@/services/members.service";
import { getTasks } from "@/services/tasks.service";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { StatusBadge } from "@/components/ui/Badge";

export function ResourcesPage() {
  const members = getMembers();
  const tasks = getTasks();

  return (
    <div>
      <PageHeader title="Recursos" subtitle="Carga de trabajo del equipo" />

      <div className="grid grid-cols-1 gap-5 p-8 md:grid-cols-3">
        {members.map((member) => {
          const memberTasks = tasks.filter((task) => task.assignedId === member.id);

          return (
            <Card key={member.id} className="p-5">
              <div className="flex items-center gap-3">
                <Avatar initials={member.initials} color={member.avatarColor} title={member.name} />
                <div>
                  <p className="text-sm font-semibold text-ink">{member.name}</p>
                  <p className="text-xs text-ink-faint">{member.role}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                {memberTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm text-ink">{task.name}</span>
                    <StatusBadge status={task.status} />
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
