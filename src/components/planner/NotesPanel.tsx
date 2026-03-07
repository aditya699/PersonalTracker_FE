import { useState } from "react";
import type { FormEvent } from "react";
import type { NoteResponse, NoteUpdate } from "../../types/note";
import "./NotesPanel.css";

interface NotesPanelProps {
  notes: NoteResponse[];
  onAdd: (content: string) => Promise<void>;
  onUpdate: (noteId: string, data: NoteUpdate) => Promise<void>;
  onDelete: (noteId: string) => Promise<void>;
}

function NotesPanel({ notes, onAdd, onUpdate, onDelete }: NotesPanelProps) {
  const [newNote, setNewNote] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = newNote.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setNewNote("");
  }

  return (
    <div className="notes-panel">
      <h3 className="notes-panel__heading">Notes</h3>

      <form className="notes-panel__form" onSubmit={handleSubmit}>
        <input
          className="notes-panel__input"
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a note..."
        />
        <button className="notes-panel__add-btn" type="submit">
          +
        </button>
      </form>

      <ul className="notes-panel__list">
        {notes.map((note) => (
          <li
            key={note.id}
            className={`note-item${note.is_completed ? " note-item--completed" : ""}`}
          >
            <input
              className="note-item__checkbox"
              type="checkbox"
              checked={note.is_completed}
              onChange={() =>
                onUpdate(note.id, { is_completed: !note.is_completed })
              }
            />
            <span className="note-item__text">{note.content}</span>
            <button
              className="note-item__delete"
              onClick={() => onDelete(note.id)}
              aria-label="Delete note"
            >
              &times;
            </button>
          </li>
        ))}
        {notes.length === 0 && (
          <li className="notes-panel__empty">No notes this week</li>
        )}
      </ul>
    </div>
  );
}

export default NotesPanel;
