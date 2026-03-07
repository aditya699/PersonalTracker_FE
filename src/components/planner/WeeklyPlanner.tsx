import { useWeek } from "../../hooks/useWeek";
import { useTasks } from "../../hooks/useTasks";
import { useNotes } from "../../hooks/useNotes";
import { useHabits } from "../../hooks/useHabits";
import PlannerHeader from "./PlannerHeader";
import NotesPanel from "./NotesPanel";
import WeekGrid from "./WeekGrid";
import HabitTracker from "./HabitTracker";
import "./WeeklyPlanner.css";

function WeeklyPlanner() {
  const {
    weekStart,
    weekEnd,
    weekDays,
    goToPrevWeek,
    goToNextWeek,
    goToCurrentWeek,
  } = useWeek();

  const {
    tasks,
    isLoading: tasksLoading,
    createTask,
    updateTask,
    deleteTask,
  } = useTasks(weekStart, weekEnd);

  const {
    notes,
    isLoading: notesLoading,
    createNote,
    updateNote,
    deleteNote,
  } = useNotes(weekStart);

  const {
    habits,
    entries,
    isLoading: habitsLoading,
    createHabit,
    deleteHabit,
    toggleEntry,
  } = useHabits(weekStart, weekEnd);

  const isLoading = tasksLoading || notesLoading || habitsLoading;

  return (
    <div className="planner">
      <div className="planner__top">
        <PlannerHeader
          weekStart={weekStart}
          weekEnd={weekEnd}
          onPrev={goToPrevWeek}
          onNext={goToNextWeek}
          onToday={goToCurrentWeek}
        />
      </div>

      {isLoading ? (
        <div className="planner__loading">Loading your week...</div>
      ) : (
        <div className="planner__body">
          <aside className="planner__sidebar">
            <NotesPanel
              notes={notes}
              onAdd={createNote}
              onUpdate={updateNote}
              onDelete={deleteNote}
            />
          </aside>

          <div className="planner__main">
            <WeekGrid
              weekDays={weekDays}
              tasks={tasks}
              onCreateTask={createTask}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
            />

            <HabitTracker
              habits={habits}
              entries={entries}
              weekDays={weekDays}
              onToggleEntry={toggleEntry}
              onCreateHabit={createHabit}
              onDeleteHabit={deleteHabit}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default WeeklyPlanner;
