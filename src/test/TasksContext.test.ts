import { describe, it, expect } from "vitest";
import { tasksReducer, type TasksAction } from "@/store/tasksReducer";
import type { Task } from "@/types";

function makeTask(overrides: Partial<Task>): Task {
  return {
    id: "t1",
    code: "T-001",
    projectId: "p1",
    name: "Tarea de prueba",
    assignedId: "m1",
    priority: "medium",
    status: "pending",
    progress: 0,
    startDate: "2026-06-15",
    endDate: "2026-06-17",
    ...overrides,
  };
}

describe("tasksReducer", () => {
  describe("MOVE_TASK", () => {
    it("mueve startDate y endDate por la misma cantidad de días", () => {
      const initialState = [makeTask({ id: "t1", startDate: "2026-06-15", endDate: "2026-06-17" })];
      const action: TasksAction = { type: "MOVE_TASK", taskId: "t1", deltaDays: 3 };

      const result = tasksReducer(initialState, action);

      expect(result[0].startDate).toBe("2026-06-18");
      expect(result[0].endDate).toBe("2026-06-20");
    });

    it("no modifica tareas que no coinciden con el taskId", () => {
      const initialState = [
        makeTask({ id: "t1", startDate: "2026-06-15" }),
        makeTask({ id: "t2", startDate: "2026-06-20" }),
      ];
      const action: TasksAction = { type: "MOVE_TASK", taskId: "t1", deltaDays: 5 };

      const result = tasksReducer(initialState, action);

      expect(result[1].startDate).toBe("2026-06-20"); // sin cambios
    });

    it("no muta el array de estado original", () => {
      const initialState = [makeTask({ id: "t1", startDate: "2026-06-15" })];
      const action: TasksAction = { type: "MOVE_TASK", taskId: "t1", deltaDays: 2 };

      tasksReducer(initialState, action);

      // El estado original no debería haber cambiado.
      expect(initialState[0].startDate).toBe("2026-06-15");
    });
  });

  describe("RESIZE_TASK", () => {
    it("redimensiona solo startDate cuando edge es 'start'", () => {
      const initialState = [makeTask({ id: "t1", startDate: "2026-06-15", endDate: "2026-06-20" })];
      const action: TasksAction = {
        type: "RESIZE_TASK",
        taskId: "t1",
        edge: "start",
        deltaDays: 2,
      };

      const result = tasksReducer(initialState, action);

      expect(result[0].startDate).toBe("2026-06-17");
      expect(result[0].endDate).toBe("2026-06-20"); // sin cambios
    });

    it("redimensiona solo endDate cuando edge es 'end'", () => {
      const initialState = [makeTask({ id: "t1", startDate: "2026-06-15", endDate: "2026-06-20" })];
      const action: TasksAction = {
        type: "RESIZE_TASK",
        taskId: "t1",
        edge: "end",
        deltaDays: -2,
      };

      const result = tasksReducer(initialState, action);

      expect(result[0].startDate).toBe("2026-06-15"); // sin cambios
      expect(result[0].endDate).toBe("2026-06-18");
    });
  });

  describe("SET_PROGRESS", () => {
    it("actualiza el progreso correctamente dentro del rango 0-100", () => {
      const initialState = [makeTask({ id: "t1", progress: 50 })];
      const action: TasksAction = { type: "SET_PROGRESS", taskId: "t1", progress: 75 };

      const result = tasksReducer(initialState, action);

      expect(result[0].progress).toBe(75);
    });

    it("limita (clamp) valores mayores a 100", () => {
      const initialState = [makeTask({ id: "t1", progress: 50 })];
      const action: TasksAction = { type: "SET_PROGRESS", taskId: "t1", progress: 150 };

      const result = tasksReducer(initialState, action);

      expect(result[0].progress).toBe(100);
    });

    it("limita (clamp) valores negativos a 0", () => {
      const initialState = [makeTask({ id: "t1", progress: 50 })];
      const action: TasksAction = { type: "SET_PROGRESS", taskId: "t1", progress: -20 };

      const result = tasksReducer(initialState, action);

      expect(result[0].progress).toBe(0);
    });
  });

  describe("SET_STATUS", () => {
    it("actualiza el status de la tarea correcta", () => {
      const initialState = [makeTask({ id: "t1", status: "pending" })];
      const action: TasksAction = { type: "SET_STATUS", taskId: "t1", status: "completed" };

      const result = tasksReducer(initialState, action);

      expect(result[0].status).toBe("completed");
    });
  });
});
