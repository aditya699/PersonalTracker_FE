/** Get the Monday of the week containing the given date. */
export function getWeekStart(date: Date): string {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return formatDate(d);
}

/** Get the Sunday of the week containing the given date. */
export function getWeekEnd(date: Date): string {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = d.getDay();
  const diff = day === 0 ? 0 : 7 - day;
  d.setDate(d.getDate() + diff);
  return formatDate(d);
}

export interface WeekDay {
  date: string;
  dayName: string;
  dayShort: string;
  dayOfMonth: number;
}

/** Return an array of 7 days (Mon–Sun) for the week starting at weekStart. */
export function getWeekDays(weekStart: string): WeekDay[] {
  const names = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const shorts = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [y, m, d] = weekStart.split("-").map(Number);
  const start = new Date(y, m - 1, d);

  return names.map((dayName, i) => {
    const current = new Date(start);
    current.setDate(start.getDate() + i);
    return {
      date: formatDate(current),
      dayName,
      dayShort: shorts[i],
      dayOfMonth: current.getDate(),
    };
  });
}

/** Shift a YYYY-MM-DD date by N weeks. */
export function addWeeks(isoDate: string, weeks: number): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + weeks * 7);
  return formatDate(date);
}

/** Format a Date to YYYY-MM-DD using local time. */
export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Format "Mar 3" style for display. */
export function formatDateShort(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
