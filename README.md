# PersonalTracker Frontend

A weekly planner app with tasks, notes, and habit tracking — built with React and TypeScript.

## Features

- **Weekly Planner** — 7-day grid view with task management per day
- **Task Workflow** — `todo` → `doing` → `testing` → `done` status flow
- **Notes** — Weekly checkbox notes in a sidebar panel
- **Habit Tracker** — Define habits and track daily completions with a checkbox grid
- **Week Navigation** — Browse previous/next weeks or jump to today
- **Auth** — JWT access tokens + httpOnly refresh cookie with automatic token refresh

## Tech Stack

- React 19 + TypeScript 5.9
- Vite 7
- React Router v7
- Axios (with interceptors for auth)
- Plain CSS with custom properties

## Getting Started

### Prerequisites

- Node.js 18+
- The [PersonalTracker backend](https://github.com/aditya699/personaltracker-backend) running on `http://localhost:8000`

### Install & Run

```bash
git clone https://github.com/aditya699/PersonalTracker_FE.git
cd PersonalTracker_FE
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

### Environment Variables

| Variable | Purpose | Default |
|---|---|---|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8000` |

Create a `.env` file in the project root if you need to override:

```
VITE_API_BASE_URL=https://api.example.com
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check + production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## Project Structure

```
src/
├── api/          # Axios client, endpoint config, API wrappers
├── components/   # Planner UI (WeekGrid, DayColumn, NotesPanel, HabitTracker)
├── context/      # AuthContext provider
├── hooks/        # useAuth, useTasks, useNotes, useHabits, useWeek
├── pages/        # Home, Login, Register, Dashboard
├── types/        # TypeScript types for auth, tasks, notes, habits
├── utils/        # Token helpers, week date utilities
└── styles/       # CSS custom properties
```

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes
4. Push to the branch and open a Pull Request

## License

MIT
