const WEEKDAY_LABELS = ["D", "L", "M", "M", "J", "V", "S"];
const MONTH_LABELS = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

export interface TimelineDay {
  date: Date;
  dayOfMonth: number;
  weekdayLabel: string;
  monthLabel: string;
  year: number;
  isWeekend: boolean;
  isToday: boolean;
}

export function generateTimelineDays(start: Date, end: Date): TimelineDay[] {
  const days: TimelineDay[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cursor = new Date(start);

  while (cursor <= end) {
    const dayOfWeek = cursor.getDay();

    days.push({
      date: new Date(cursor),
      dayOfMonth: cursor.getDate(),
      weekdayLabel: WEEKDAY_LABELS[dayOfWeek],
      monthLabel: MONTH_LABELS[cursor.getMonth()],
      year: cursor.getFullYear(),
      isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
      isToday: cursor.getTime() === today.getTime(),
    });

    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
}

export function parseLocalDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function toLocalISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
