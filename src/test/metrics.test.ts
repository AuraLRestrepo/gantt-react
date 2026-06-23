import { describe, it, expect } from "vitest";
import { computeMetrics } from "@/lib/metrics";
import type { Task } from "@/types";

// Tarea mínima de prueba — solo llenamos los campos que computeMetrics realmente usa.
function makeTask(overrides: Partial<Task>): Task {
  return {
    id: "test-id",
    code: "T-000",
    projectId: "p1",
    name: "Tarea de prueba",
    assignedId: "m1",
    priority: "medium",
    status: "pending",
    progress: 0,
    startDate: "2026-01-01",
    endDate: "2026-01-02",
    ...overrides,
  };
}

describe("computeMetrics", () => {
  it("devuelve ceros cuando no hay tareas", () => {
    const result = computeMetrics([]);

    expect(result.totalTasks).toBe(0);
    expect(result.completedTasks).toBe(0);
    expect(result.overallProgress).toBe(0);
  });

  it("cuenta correctamente tareas por estado", () => {
    const tasks = [
      makeTask({ status: "completed", progress: 100 }),
      makeTask({ status: "completed", progress: 100 }),
      makeTask({ status: "in-progress", progress: 50 }),
      makeTask({ status: "blocked", progress: 10 }),
    ];

    const result = computeMetrics(tasks);

    expect(result.totalTasks).toBe(4);
    expect(result.completedTasks).toBe(2);
    expect(result.inProgressTasks).toBe(1);
    expect(result.blockedTasks).toBe(1);
  });

  it("calcula el progreso general como promedio redondeado", () => {
    const tasks = [
      makeTask({ progress: 100 }),
      makeTask({ progress: 50 }),
      makeTask({ progress: 0 }),
    ];

    const result = computeMetrics(tasks);

    // (100 + 50 + 0) / 3 = 50
    expect(result.overallProgress).toBe(50);
  });
});
