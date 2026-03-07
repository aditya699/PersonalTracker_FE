import { useState, useCallback, useEffect } from "react";
import type { NoteResponse, NoteUpdate } from "../types/note";
import * as noteApi from "../api/noteApi";

export interface UseNotesReturn {
  notes: NoteResponse[];
  isLoading: boolean;
  error: string | null;
  createNote: (content: string) => Promise<void>;
  updateNote: (noteId: string, data: NoteUpdate) => Promise<void>;
  deleteNote: (noteId: string) => Promise<void>;
}

export function useNotes(weekStart: string): UseNotesReturn {
  const [notes, setNotes] = useState<NoteResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await noteApi.listNotes(weekStart);
      setNotes(data.notes);
    } catch {
      setError("Failed to load notes");
    } finally {
      setIsLoading(false);
    }
  }, [weekStart]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const createNote = useCallback(
    async (content: string) => {
      setError(null);
      try {
        const newNote = await noteApi.createNote({ content, week_start: weekStart });
        setNotes((prev) => [...prev, newNote]);
      } catch {
        setError("Failed to create note");
      }
    },
    [weekStart],
  );

  const updateNote = useCallback(
    async (noteId: string, data: NoteUpdate) => {
      setError(null);
      try {
        const updated = await noteApi.updateNote(noteId, data);
        setNotes((prev) => prev.map((n) => (n.id === noteId ? updated : n)));
      } catch {
        setError("Failed to update note");
      }
    },
    [],
  );

  const deleteNote = useCallback(
    async (noteId: string) => {
      setError(null);
      try {
        await noteApi.deleteNote(noteId);
        setNotes((prev) => prev.filter((n) => n.id !== noteId));
      } catch {
        setError("Failed to delete note");
      }
    },
    [],
  );

  return { notes, isLoading, error, createNote, updateNote, deleteNote };
}
