export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const ENDPOINTS = {
  AUTH: {
    register: "/auth/register",
    login: "/auth/login",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
    me: "/auth/me",
  },
  TASKS: {
    list: "/tasks/",
    create: "/tasks/",
    get: (taskId: string) => `/tasks/${taskId}`,
    update: (taskId: string) => `/tasks/${taskId}`,
    delete: (taskId: string) => `/tasks/${taskId}`,
  },
  NOTES: {
    list: "/notes/",
    create: "/notes/",
    update: (noteId: string) => `/notes/${noteId}`,
    delete: (noteId: string) => `/notes/${noteId}`,
  },
  HABITS: {
    list: "/habits/",
    create: "/habits/",
    update: (habitId: string) => `/habits/${habitId}`,
    delete: (habitId: string) => `/habits/${habitId}`,
    setEntry: (habitId: string, date: string) =>
      `/habits/${habitId}/entries/${date}`,
    listEntries: "/habits/entries",
  },
} as const;
