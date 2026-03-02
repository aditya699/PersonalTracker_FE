# CLAUDE.md — PersonalTracker Frontend

## Project Overview

PersonalTracker is a task management app with authentication. This is the React frontend; the backend is FastAPI at `http://localhost:8000`.

## Tech Stack

- **Framework:** React 19 + TypeScript 5.9
- **Build:** Vite 7
- **HTTP Client:** Axios (with interceptors)
- **Styling:** Plain CSS with CSS custom properties (no framework)

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Type-check (tsc -b) then Vite build
npm run lint      # ESLint
npm run preview   # Preview production build
```

## Project Structure

```
src/
├── main.tsx                  # Entry point (StrictMode + ReactDOM)
├── App.tsx                   # Root component (routes will go here)
├── index.css                 # Global CSS reset
│
├── api/
│   ├── config.ts             # BASE_URL (from VITE_API_BASE_URL env var) + ENDPOINTS object
│   ├── client.ts             # Axios instance: withCredentials, JWT header, 401 refresh + retry
│   ├── authApi.ts            # register, login, refreshToken, logout, getMe
│   └── taskApi.ts            # createTask, listTasks, getTask, updateTask, deleteTask
│
├── types/
│   ├── auth.ts               # RegisterRequest, LoginRequest, TokenResponse, UserProfile
│   └── task.ts               # TaskStatus (const + type), TaskCreate, TaskUpdate, TaskResponse, TaskListResponse
│
├── context/
│   └── AuthContext.tsx        # TODO — user state, login, logout, isAuthenticated
│
├── hooks/
│   ├── useAuth.ts            # TODO — consume AuthContext
│   └── useTasks.ts           # TODO — task CRUD operations
│
├── pages/
│   ├── LoginPage.tsx          # TODO
│   ├── RegisterPage.tsx       # TODO
│   └── DashboardPage.tsx      # TODO
│
├── components/
│   ├── common/
│   │   ├── Button.tsx         # TODO
│   │   ├── Input.tsx          # TODO
│   │   └── Layout.tsx         # TODO — navbar + content wrapper
│   └── tasks/
│       ├── TaskCard.tsx       # TODO
│       ├── TaskList.tsx       # TODO
│       └── TaskForm.tsx       # TODO
│
├── utils/
│   └── token.ts              # getAccessToken, setAccessToken, clearAccessToken (localStorage)
│
└── styles/
    └── variables.css          # CSS custom properties: colors, spacing, radii, font sizes
```

## Key Architecture Decisions

### Authentication

- **Access token:** stored in `localStorage`, attached via Axios request interceptor as `Authorization: Bearer <token>`.
- **Refresh token:** httpOnly cookie managed entirely by the browser. Frontend never reads or stores it.
- **Token refresh:** Axios response interceptor catches 401s, POSTs to `/auth/refresh` with empty body (cookie sent automatically), retries the original request. Concurrent 401s are queued to avoid multiple refresh calls.
- **Logout:** calls `POST /auth/logout` (server clears the cookie).

### Task Status Flow

`todo` → `doing` → `testing` → `done`

`TaskStatus` is a `const` object + type union (not an `enum`) because `erasableSyntaxOnly: true` is set in tsconfig.

### API Layer

- `api/config.ts` holds all endpoint paths. Dynamic paths (get/update/delete task) are functions that take `taskId`.
- `api/client.ts` is the single Axios instance — every API call goes through it.
- `api/authApi.ts` and `api/taskApi.ts` are thin wrappers that call the client and return `response.data`.

## TypeScript Config Notes

- **Strict mode** enabled with all linting flags
- **`erasableSyntaxOnly: true`** — no `enum` keyword; use `as const` objects + derived types instead
- **`verbatimModuleSyntax: true`** — must use `import type` for type-only imports
- **Target:** ES2022, JSX: react-jsx, module resolution: bundler

## Environment Variables

| Variable | Purpose | Default |
|---|---|---|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8000` |

No `.env` file exists yet. Vite reads `VITE_`-prefixed vars automatically.
