import apiClient from "./client";
import { ENDPOINTS } from "./config";
import type {
  TaskCreate,
  TaskUpdate,
  TaskResponse,
  TaskListResponse,
  TaskStatus,
} from "../types/task";

export async function createTask(data: TaskCreate): Promise<TaskResponse> {
  const response = await apiClient.post<TaskResponse>(
    ENDPOINTS.TASKS.create,
    data,
  );
  return response.data;
}

export async function listTasks(
  status?: TaskStatus,
  skip?: number,
  limit?: number,
  dateFrom?: string,
  dateTo?: string,
): Promise<TaskListResponse> {
  const response = await apiClient.get<TaskListResponse>(
    ENDPOINTS.TASKS.list,
    { params: { status, skip, limit, date_from: dateFrom, date_to: dateTo } },
  );
  return response.data;
}

export async function getTask(taskId: string): Promise<TaskResponse> {
  const response = await apiClient.get<TaskResponse>(
    ENDPOINTS.TASKS.get(taskId),
  );
  return response.data;
}

export async function updateTask(
  taskId: string,
  data: TaskUpdate,
): Promise<TaskResponse> {
  const response = await apiClient.put<TaskResponse>(
    ENDPOINTS.TASKS.update(taskId),
    data,
  );
  return response.data;
}

export async function deleteTask(
  taskId: string,
): Promise<{ message: string }> {
  const response = await apiClient.delete<{ message: string }>(
    ENDPOINTS.TASKS.delete(taskId),
  );
  return response.data;
}
