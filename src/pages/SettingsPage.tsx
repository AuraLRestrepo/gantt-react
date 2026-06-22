import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";

export function SettingsPage() {
  const [projectName, setProjectName] = useState("GanttPro v1.0");
  const [notifications, setNotifications] = useState(true);

  return (
    <div>
      <PageHeader title="Configuración" subtitle="Preferencias del proyecto" />

      <div className="max-w-xl p-8">
        <Card className="p-5">
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-ink">Nombre del proyecto</span>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="rounded-lg border border-border px-3 py-2 text-sm text-ink outline-none focus:border-brand"
              />
            </label>

            <label className="flex items-center justify-between">
              <span className="text-sm font-medium text-ink">Notificaciones por correo</span>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="h-4 w-4 accent-brand"
              />
            </label>
          </div>
        </Card>
      </div>
    </div>
  );
}
