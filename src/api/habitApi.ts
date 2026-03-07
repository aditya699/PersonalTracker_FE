import apiClient from "./client";
import { ENDPOINTS } from "./config";
import type {
  HabitCreate,
  HabitUpdate,
  HabitResponse,
  HabitListResponse,
  HabitEntriesResponse,
} from "../types/habit";

export async function createHabit(data: HabitCreate): Promise<HabitResponse> {
  const response = await apiClient.post<HabitResponse>(
    ENDPOINTS.HABITS.create,
    data,
  );
  return response.data;
}

export async function listHabits(): Promise<HabitListResponse> {
  const response = await apiClient.get<HabitListResponse>(
    ENDPOINTS.HABITS.list,
  );
  return response.data;
}

export async function updateHabit(
  habitId: string,
  data: HabitUpdate,
): Promise<HabitResponse> {
  const response = await apiClient.put<HabitResponse>(
    ENDPOINTS.HABITS.update(habitId),
    data,
  );
  return response.data;
}

export async function deleteHabit(
  habitId: string,
): Promise<{ message: string }> {
  const response = await apiClient.delete<{ message: string }>(
    ENDPOINTS.HABITS.delete(habitId),
  );
  return response.data;
}

export async function setHabitEntry(
  habitId: string,
  date: string,
  completed: boolean,
): Promise<void> {
  await apiClient.put(ENDPOINTS.HABITS.setEntry(habitId, date), { completed });
}

export async function listHabitEntries(
  dateFrom: string,
  dateTo: string,
): Promise<HabitEntriesResponse> {
  const response = await apiClient.get<HabitEntriesResponse>(
    ENDPOINTS.HABITS.listEntries,
    { params: { date_from: dateFrom, date_to: dateTo } },
  );
  return response.data;
}
