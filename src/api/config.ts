export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const ENDPOINTS = {
  AUTH: {
    register: "/auth/register",
    login: "/auth/login",
    refresh: "/auth/refresh",
    me: "/auth/me",
  },
  TASKS: {
    list: "/tasks/",
    create: "/tasks/",
    get: (taskId: string) => `/tasks/${taskId}`,
    update: (taskId: string) => `/tasks/${taskId}`,
    delete: (taskId: string) => `/tasks/${taskId}`,
  },
} as const;
