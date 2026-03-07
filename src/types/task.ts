export const TaskStatus = {
  Todo: "todo",
  Doing: "doing",
  Testing: "testing",
  Done: "done",
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

export interface TaskCreate {
  title: string;
  description?: string;
  scheduled_date?: string;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  status?: TaskStatus;
  scheduled_date?: string | null;
}

export interface TaskResponse {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  scheduled_date: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface TaskListResponse {
  tasks: TaskResponse[];
  total: number;
}
