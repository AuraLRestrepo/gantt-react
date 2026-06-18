import type { Project } from "@/types";

const projects: Project[] = [
  {
    id: "p1",
    name: "GanttPro v1.0",
    description: "Plataforma de gestión de proyectos con diagramas de Gantt para equipos modernos.",
    status: "active",
    startDate: "2026-06-15",
    endDate: "2026-08-03",
    ownerId: "m2",
    memberIds: ["m1", "m2", "m3"],
    color: "#5b5bf6",
  },
  {
    id: "p2",
    name: "App móvil de reportes",
    description: "Versión móvil enfocada en reportes ejecutivos y notificaciones.",
    status: "active",
    startDate: "2026-07-01",
    endDate: "2026-09-15",
    ownerId: "m3",
    memberIds: ["m3"],
    color: "#16a34a",
  },
];

export function getProjects(): Project[] {
  return projects;
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}
