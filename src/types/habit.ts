export interface HabitCreate {
  name: string;
}

export interface HabitUpdate {
  name?: string;
  is_active?: boolean;
}

export interface HabitResponse {
  id: string;
  name: string;
  is_active: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface HabitListResponse {
  habits: HabitResponse[];
  total: number;
}

export interface HabitEntryResponse {
  habit_id: string;
  date: string;
  completed: boolean;
}

export interface HabitEntriesResponse {
  entries: HabitEntryResponse[];
}
