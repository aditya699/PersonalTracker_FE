#If you are an agent please skip this file. This is a personal note for me to understand React and the ModernLifeTracker codebase. It contains my own explanations and is not meant for anyone else to read.

# React Essentials — ModernLifeTracker Codebase

## 1. The One Rule
> When state changes, React re-renders the component that owns it — and everything below it.

Everything in React follows from this.

---

## 2. JSX
HTML-like syntax inside TypeScript. Just UI description.
```tsx
return <div className="dashboard">{user.name}</div>
```
- `className` not `class` (class is reserved in JS)
- `{}` to inject any JS/TS expression
- Every component returns JSX

---

## 3. Props
How parent passes data to child.
```tsx
<UserCard name="Aditya" email="a@b.com" />
```
Flutter equivalent: constructor parameters.

---

## 4. useState
Remember a value between renders. Changing it triggers re-render.
```ts
const [user, setUser] = useState(null)
// user = current value
// setUser = how you update it
```
Flutter equivalent: `setState()`

---

## 5. useEffect
Run code when something changes. Or once on mount.
```ts
useEffect(() => {
  checkAuth() // runs once when component mounts
}, [])        // empty array = only on mount
```
Flutter equivalent: `initState()`

---

## 6. useCallback
Memoize a function so it doesn't get recreated every render.
```ts
const login = useCallback(async (data) => {
  // login logic
}, []) // dependencies
```
Use when passing functions into Context or child components.

---

## 7. useMemo
Memoize a computed value.
```ts
const value = useMemo(() => ({
  user, isAuthenticated: user !== null, login, logout
}), [user, login, logout])
```
Use when building objects to put into Context.

---

## 8. useContext
Reach into a Context and grab its value.
```ts
const context = useContext(AuthContext)
```
Wrapped by `useAuth()` in our codebase so you never call this directly.

---

## 9. Context
Global state. Three steps:
```
createContext()   →  create the box (authContextValue.ts)
Provider          →  fill the box with data (AuthContext.tsx)
useContext()      →  grab from the box (useAuth.ts)
```
Flutter equivalent: `ChangeNotifier` + `Provider`

---

## 10. Custom Hooks
Any function starting with `use` that uses other hooks.
```ts
function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("Must be inside AuthProvider")
  return context
}
```
Just a clean wrapper. Keeps components simple.

---

## 11. Derived State
Don't store what you can compute.
```ts
// BAD — two sources of truth
const [user, setUser] = useState(null)
const [isAuthenticated, setIsAuthenticated] = useState(false)

// GOOD — derive it
const isAuthenticated = user !== null
```

---

## 12. State Lives As High As Needed
If multiple components need the same state → lift it up.
- `user` needed everywhere → lives in `AuthContext` (top level)
- `isSubmitting` needed only in `LoginPage` → lives in `LoginPage`

---

---

## 13. React Router
Navigation between pages. No full page reload.
```tsx
// Define routes
<Route path="/dashboard" element={<DashboardPage />} />

// Navigate programmatically
const navigate = useNavigate()
navigate("/dashboard")

// Link in JSX
<Link to="/login">Sign in</Link>
```
Flutter equivalent: `Navigator.pushNamed()`

---

## 14. Protected Routes
Only allow access if authenticated.
```tsx
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()
  if (isLoading) return <Spinner />
  if (!isAuthenticated) return <Navigate to="/login" />
  return children
}
```
Wrap any route that requires login.

---

## 15. Error Boundaries
Catch crashes in a component tree gracefully.
```tsx
// If something inside crashes, show fallback UI instead of blank screen
<ErrorBoundary fallback={<div>Something went wrong</div>}>
  <App />
</ErrorBoundary>
```
Usually set up once at the top level. Agents can scaffold this for you.

---

## 16. useReducer
Like `useState` but for complex state with multiple sub-values.
```ts
const [state, dispatch] = useReducer(reducer, initialState)
dispatch({ type: "SET_USER", payload: profile })
```
You won't need this until state logic gets complex. `useState` is fine for now.

---

## 17. React Query (TanStack Query)
Manages server state — fetching, caching, refetching automatically.
```ts
const { data: tasks, isLoading } = useQuery({
  queryKey: ["tasks"],
  queryFn: () => taskApi.listTasks()
})
```
Replaces manual `useEffect` + `useState` for API calls in components.
You'll likely add this when building the task dashboard.

---

## Codebase Flow (ModernLifeTracker)

```
types/         →  data shapes (like Dart classes)
api/           →  functions that call backend (no React)
  config.ts    →  URL constants
  client.ts    →  Axios + token interceptors
  authApi.ts   →  auth API functions
  taskApi.ts   →  task API functions
context/       →  global state
  authContextValue.ts  →  context shape + createContext
  AuthContext.tsx       →  useState, useEffect, real logic
hooks/         →  clean accessors for context
  useAuth.ts   →  useContext(AuthContext) wrapper
pages/         →  JSX + CSS, consumes everything above
```

## Runtime Auth Flow
```
App starts
→ AuthProvider mounts
→ useEffect checks for token
→ if token exists → fetch user → setUser(profile)
→ isAuthenticated = true → app renders logged in state

User logs in
→ LoginPage calls useAuth().login()
→ AuthContext.login() → authApi.login() → backend
→ gets token → setAccessToken → authApi.getMe()
→ setUser(profile) → re-render → dashboard
```