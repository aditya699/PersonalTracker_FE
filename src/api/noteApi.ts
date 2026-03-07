import apiClient from "./client";
import { ENDPOINTS } from "./config";
import type {
  NoteCreate,
  NoteUpdate,
  NoteResponse,
  NoteListResponse,
} from "../types/note";

export async function createNote(data: NoteCreate): Promise<NoteResponse> {
  const response = await apiClient.post<NoteResponse>(
    ENDPOINTS.NOTES.create,
    data,
  );
  return response.data;
}

export async function listNotes(weekStart: string): Promise<NoteListResponse> {
  const response = await apiClient.get<NoteListResponse>(
    ENDPOINTS.NOTES.list,
    { params: { week_start: weekStart } },
  );
  return response.data;
}

export async function updateNote(
  noteId: string,
  data: NoteUpdate,
): Promise<NoteResponse> {
  const response = await apiClient.put<NoteResponse>(
    ENDPOINTS.NOTES.update(noteId),
    data,
  );
  return response.data;
}

export async function deleteNote(
  noteId: string,
): Promise<{ message: string }> {
  const response = await apiClient.delete<{ message: string }>(
    ENDPOINTS.NOTES.delete(noteId),
  );
  return response.data;
}
