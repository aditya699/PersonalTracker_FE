import { useState, useCallback, useMemo } from "react";
import {
  getWeekStart,
  getWeekEnd,
  getWeekDays,
  addWeeks,
} from "../utils/week";
import type { WeekDay } from "../utils/week";

export interface UseWeekReturn {
  weekStart: string;
  weekEnd: string;
  weekDays: WeekDay[];
  goToPrevWeek: () => void;
  goToNextWeek: () => void;
  goToCurrentWeek: () => void;
}

export function useWeek(): UseWeekReturn {
  const [weekStart, setWeekStart] = useState(() => getWeekStart(new Date()));

  const weekEnd = useMemo(() => {
    const [y, m, d] = weekStart.split("-").map(Number);
    const monday = new Date(y, m - 1, d);
    return getWeekEnd(monday);
  }, [weekStart]);

  const weekDays = useMemo(() => getWeekDays(weekStart), [weekStart]);

  const goToPrevWeek = useCallback(() => {
    setWeekStart((prev) => addWeeks(prev, -1));
  }, []);

  const goToNextWeek = useCallback(() => {
    setWeekStart((prev) => addWeeks(prev, 1));
  }, []);

  const goToCurrentWeek = useCallback(() => {
    setWeekStart(getWeekStart(new Date()));
  }, []);

  return { weekStart, weekEnd, weekDays, goToPrevWeek, goToNextWeek, goToCurrentWeek };
}
