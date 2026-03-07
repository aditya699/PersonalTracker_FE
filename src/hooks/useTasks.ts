import { useState, useCallback, useEffect } from "react";
import type { TaskResponse, TaskCreate, TaskUpdate } from "../types/task";
import * as taskApi from "../api/taskApi";

export interface UseTasksReturn {
  tasks: TaskResponse[];
  isLoading: boolean;
  error: string | null;
  createTask: (data: TaskCreate) => Promise<void>;
  updateTask: (taskId: string, data: TaskUpdate) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useTasks(dateFrom?: string, dateTo?: string): UseTasksReturn {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await taskApi.listTasks(
        undefined,
        undefined,
        100,
        dateFrom,
        dateTo,
      );
      setTasks(data.tasks);
    } catch {
      setError("Failed to load tasks");
    } finally {
      setIsLoading(false);
    }
  }, [dateFrom, dateTo]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = useCallback(
    async (data: TaskCreate) => {
      setError(null);
      try {
        const newTask = await taskApi.createTask(data);
        setTasks((prev) => [newTask, ...prev]);
      } catch {
        setError("Failed to create task");
        throw new Error("Failed to create task");
      }
    },
    [],
  );

  const updateTask = useCallback(
    async (taskId: string, data: TaskUpdate) => {
      setError(null);
      try {
        const updated = await taskApi.updateTask(taskId, data);
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? updated : t)),
        );
      } catch {
        setError("Failed to update task");
        throw new Error("Failed to update task");
      }
    },
    [],
  );

  const deleteTask = useCallback(
    async (taskId: string) => {
      setError(null);
      try {
        await taskApi.deleteTask(taskId);
        setTasks((prev) => prev.filter((t) => t.id !== taskId));
      } catch {
        setError("Failed to delete task");
        throw new Error("Failed to delete task");
      }
    },
    [],
  );

  return { tasks, isLoading, error, createTask, updateTask, deleteTask, refresh: fetchTasks };
}
