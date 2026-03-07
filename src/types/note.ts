export interface NoteCreate {
  content: string;
  week_start: string;
  is_completed?: boolean;
}

export interface NoteUpdate {
  content?: string;
  is_completed?: boolean;
}

export interface NoteResponse {
  id: string;
  content: string;
  is_completed: boolean;
  week_start: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface NoteListResponse {
  notes: NoteResponse[];
  total: number;
}
