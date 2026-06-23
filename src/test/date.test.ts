import { describe, it, expect } from "vitest";
import { parseLocalDate, toLocalISODate, addDays } from "@/lib/date";

describe("parseLocalDate", () => {
  it("parsea un string ISO a los componentes correctos de fecha local", () => {
    const date = parseLocalDate("2026-06-20");

    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(5); // los meses en JS son 0-indexados: junio = 5
    expect(date.getDate()).toBe(20);
  });
});

describe("toLocalISODate", () => {
  it("convierte una fecha local de vuelta al string ISO correcto", () => {
    const date = new Date(2026, 5, 20); // 20 de junio de 2026, hora local
    expect(toLocalISODate(date)).toBe("2026-06-20");
  });

  it("agrega ceros a la izquierda en meses y días de un solo dígito", () => {
    const date = new Date(2026, 0, 5); // 5 de enero de 2026
    expect(toLocalISODate(date)).toBe("2026-01-05");
  });
});

describe("addDays", () => {
  it("suma días correctamente dentro del mismo mes", () => {
    const date = parseLocalDate("2026-06-20");
    const result = addDays(date, 3);
    expect(toLocalISODate(result)).toBe("2026-06-23");
  });

  it("cruza correctamente el límite de un mes", () => {
    const date = parseLocalDate("2026-06-29");
    const result = addDays(date, 3);
    expect(toLocalISODate(result)).toBe("2026-07-02");
  });

  it("resta días correctamente con valores negativos", () => {
    const date = parseLocalDate("2026-07-02");
    const result = addDays(date, -3);
    expect(toLocalISODate(result)).toBe("2026-06-29");
  });

  it("no muta la fecha original", () => {
    const original = parseLocalDate("2026-06-20");
    const originalTime = original.getTime();

    addDays(original, 5);

    // Si addDays mutara `original`, esta aserción fallaría.
    expect(original.getTime()).toBe(originalTime);
  });
});

describe("parseLocalDate + toLocalISODate (round-trip)", () => {
  it("ida y vuelta no cambia la fecha (verifica que no hay desfase de zona horaria)", () => {
    const original = "2026-06-20";
    const date = parseLocalDate(original);
    const result = toLocalISODate(date);

    expect(result).toBe(original);
  });
});
