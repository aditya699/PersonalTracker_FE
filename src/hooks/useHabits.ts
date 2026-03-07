import { useState, useCallback, useEffect } from "react";
import type { HabitResponse } from "../types/habit";
import * as habitApi from "../api/habitApi";

export interface UseHabitsReturn {
  habits: HabitResponse[];
  entries: Map<string, Map<string, boolean>>;
  isLoading: boolean;
  error: string | null;
  createHabit: (name: string) => Promise<void>;
  deleteHabit: (habitId: string) => Promise<void>;
  toggleEntry: (habitId: string, date: string) => Promise<void>;
}

export function useHabits(
  weekStart: string,
  weekEnd: string,
): UseHabitsReturn {
  const [habits, setHabits] = useState<HabitResponse[]>([]);
  const [entries, setEntries] = useState<Map<string, Map<string, boolean>>>(
    new Map(),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [habitsData, entriesData] = await Promise.all([
        habitApi.listHabits(),
        habitApi.listHabitEntries(weekStart, weekEnd),
      ]);
      setHabits(habitsData.habits);

      const entryMap = new Map<string, Map<string, boolean>>();
      for (const entry of entriesData.entries) {
        if (!entryMap.has(entry.habit_id)) {
          entryMap.set(entry.habit_id, new Map());
        }
        entryMap.get(entry.habit_id)!.set(entry.date, entry.completed);
      }
      setEntries(entryMap);
    } catch {
      setError("Failed to load habits");
    } finally {
      setIsLoading(false);
    }
  }, [weekStart, weekEnd]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const createHabit = useCallback(async (name: string) => {
    setError(null);
    try {
      const newHabit = await habitApi.createHabit({ name });
      setHabits((prev) => [...prev, newHabit]);
    } catch {
      setError("Failed to create habit");
    }
  }, []);

  const deleteHabit = useCallback(async (habitId: string) => {
    setError(null);
    try {
      await habitApi.deleteHabit(habitId);
      setHabits((prev) => prev.filter((h) => h.id !== habitId));
      setEntries((prev) => {
        const next = new Map(prev);
        next.delete(habitId);
        return next;
      });
    } catch {
      setError("Failed to delete habit");
    }
  }, []);

  const toggleEntry = useCallback(
    async (habitId: string, date: string) => {
      const current = entries.get(habitId)?.get(date) ?? false;
      const newValue = !current;

      // Optimistic update
      setEntries((prev) => {
        const next = new Map(prev);
        if (!next.has(habitId)) {
          next.set(habitId, new Map());
        }
        next.get(habitId)!.set(date, newValue);
        return next;
      });

      try {
        await habitApi.setHabitEntry(habitId, date, newValue);
      } catch {
        // Revert on error
        setEntries((prev) => {
          const next = new Map(prev);
          if (!next.has(habitId)) {
            next.set(habitId, new Map());
          }
          next.get(habitId)!.set(date, current);
          return next;
        });
        setError("Failed to update habit entry");
      }
    },
    [entries],
  );

  return { habits, entries, isLoading, error, createHabit, deleteHabit, toggleEntry };
}
