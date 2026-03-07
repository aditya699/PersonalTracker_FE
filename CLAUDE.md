# CLAUDE.md — PersonalTracker Frontend

## Project Overview

PersonalTracker is a weekly planner app with tasks, notes, and habit tracking. This is the React frontend; the backend is FastAPI at `http://localhost:8000`.

## Tech Stack

- **Framework:** React 19 + TypeScript 5.9
- **Build:** Vite 7
- **Routing:** React Router v7
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
├── App.tsx                   # Root component with React Router routes + ProtectedRoute
├── index.css                 # Global CSS reset
│
├── api/
│   ├── config.ts             # BASE_URL (from VITE_API_BASE_URL env var) + ENDPOINTS object
│   ├── client.ts             # Axios instance: withCredentials, JWT header, 401 refresh + retry
│   ├── authApi.ts            # register, login, refreshToken, logout, getMe
│   ├── taskApi.ts            # createTask, listTasks (date range), getTask, updateTask, deleteTask
│   ├── noteApi.ts            # createNote, listNotes (by week), updateNote, deleteNote
│   └── habitApi.ts           # createHabit, listHabits, updateHabit, deleteHabit, setHabitEntry, listHabitEntries
│
├── types/
│   ├── auth.ts               # RegisterRequest, LoginRequest, TokenResponse, UserProfile
│   ├── task.ts               # TaskStatus (const + type), TaskCreate, TaskUpdate, TaskResponse (with scheduled_date)
│   ├── note.ts               # NoteCreate, NoteUpdate, NoteResponse, NoteListResponse
│   └── habit.ts              # HabitCreate, HabitUpdate, HabitResponse, HabitEntryResponse, HabitEntriesResponse
│
├── context/
│   ├── AuthContext.tsx        # AuthProvider: user state, login, register, logout, isAuthenticated, session restore
│   └── authContextValue.ts   # AuthContextValue interface definition
│
├── hooks/
│   ├── useAuth.ts            # Consume AuthContext
│   ├── useTasks.ts           # Task CRUD with date-range filtering
│   ├── useNotes.ts           # Notes CRUD scoped to a week
│   ├── useHabits.ts          # Habits + daily entries with optimistic toggle
│   └── useWeek.ts            # Week navigation state (prev/next/today)
│
├── pages/
│   ├── HomePage.tsx           # Landing page with chaos-to-order animation
│   ├── HomePage.css
│   ├── LoginPage.tsx          # Login form with error handling
│   ├── LoginPage.css
│   ├── RegisterPage.tsx       # Registration form with error handling
│   ├── RegisterPage.css
│   ├── DashboardPage.tsx      # Weekly planner dashboard with header + logout
│   └── DashboardPage.css
│
├── components/
│   ├── common/
│   │   ├── Button.tsx         # TODO — reusable button
│   │   ├── Input.tsx          # TODO — reusable input
│   │   └── Layout.tsx         # TODO — navbar + content wrapper
│   ├── tasks/
│   │   ├── TaskCard.tsx       # TODO — standalone task card (not used in planner)
│   │   ├── TaskList.tsx       # TODO — standalone task list (not used in planner)
│   │   └── TaskForm.tsx       # TODO — standalone task form (not used in planner)
│   └── planner/
│       ├── WeeklyPlanner.tsx  # Main orchestrator: composes all planner sub-components
│       ├── WeeklyPlanner.css
│       ├── PlannerHeader.tsx  # Week date range + prev/next/today navigation
│       ├── PlannerHeader.css
│       ├── NotesPanel.tsx     # Left sidebar: checkbox notes per week
│       ├── NotesPanel.css
│       ├── WeekGrid.tsx       # 7-column grid of DayColumn components
│       ├── WeekGrid.css
│       ├── DayColumn.tsx      # Single day: task checkboxes + inline add
│       ├── DayColumn.css
│       ├── HabitTracker.tsx   # Table: habit rows x 7 day columns with checkboxes
│       └── HabitTracker.css
│
├── utils/
│   ├── token.ts              # getAccessToken, setAccessToken, clearAccessToken (localStorage)
│   └── week.ts               # getWeekStart, getWeekEnd, getWeekDays, addWeeks, formatDate, formatDateShort
│
└── styles/
    └── variables.css          # CSS custom properties: colors, spacing, radii, font sizes
```

## Key Architecture Decisions

### Routing

- React Router v7 with `BrowserRouter` in `App.tsx`.
- Public routes: `/` (HomePage), `/login`, `/register`.
- Protected routes: `/dashboard` — wrapped in `ProtectedRoute` which checks `isAuthenticated` from AuthContext and redirects to `/login` if unauthenticated.

### Authentication

- **Access token:** stored in `localStorage`, attached via Axios request interceptor as `Authorization: Bearer <token>`.
- **Refresh token:** httpOnly cookie managed entirely by the browser. Frontend never reads or stores it.
- **Token refresh:** Axios response interceptor catches 401s, POSTs to `/auth/refresh` with empty body (cookie sent automatically), retries the original request. Concurrent 401s are queued to avoid multiple refresh calls.
- **Session restore:** On app load, `AuthProvider` calls `getMe()` to restore the user session from the existing token.
- **Logout:** calls `POST /auth/logout` (server clears the cookie).

### Task Status Flow

`todo` → `doing` → `testing` → `done`

`TaskStatus` is a `const` object + type union (not an `enum`) because `erasableSyntaxOnly: true` is set in tsconfig.

### API Layer

- `api/config.ts` holds all endpoint paths (AUTH, TASKS, NOTES, HABITS). Dynamic paths are functions that take IDs.
- `api/client.ts` is the single Axios instance — every API call goes through it.
- `api/authApi.ts`, `api/taskApi.ts`, `api/noteApi.ts`, `api/habitApi.ts` are thin wrappers that call the client and return `response.data`.

### Weekly Planner

- Dashboard shows a **weekly planner** with three sections: Notes (sidebar), Week Grid (7 day columns), Habit Tracker (table).
- `useWeek` hook manages week navigation (prev/next/today). Changing the week re-fetches tasks, notes, and habits.
- Tasks have `scheduled_date` — assigned to specific days. `listTasks` accepts `dateFrom`/`dateTo` for weekly filtering.
- Notes are scoped to a `week_start` (always a Monday). One set of notes per week.
- Habits are global definitions; entries are daily checkboxes tracked via `PUT /habits/{id}/entries/{date}`.
- Habit entry toggle uses **optimistic updates** for instant UI feedback.

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

## What's Done vs TODO

**Implemented:** Full auth system, API layer (tasks + notes + habits), all types, all hooks (useAuth, useTasks, useNotes, useHabits, useWeek), routing, all pages, weekly planner dashboard (WeekGrid, DayColumn, NotesPanel, HabitTracker, PlannerHeader), week utilities, CSS design system.

**Still TODO:** `components/common/` (Button, Input, Layout) — reusable UI primitives not yet needed. `components/tasks/` (TaskCard, TaskList, TaskForm) — standalone task views not used by planner.
