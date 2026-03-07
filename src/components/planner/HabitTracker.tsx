import { useState } from "react";
import type { FormEvent } from "react";
import type { HabitResponse } from "../../types/habit";
import type { WeekDay } from "../../utils/week";
import "./HabitTracker.css";

interface HabitTrackerProps {
  habits: HabitResponse[];
  entries: Map<string, Map<string, boolean>>;
  weekDays: WeekDay[];
  onToggleEntry: (habitId: string, date: string) => Promise<void>;
  onCreateHabit: (name: string) => Promise<void>;
  onDeleteHabit: (habitId: string) => Promise<void>;
}

function HabitTracker({
  habits,
  entries,
  weekDays,
  onToggleEntry,
  onCreateHabit,
  onDeleteHabit,
}: HabitTrackerProps) {
  const [newHabit, setNewHabit] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = newHabit.trim();
    if (!trimmed) return;
    onCreateHabit(trimmed);
    setNewHabit("");
  }

  return (
    <div className="habit-tracker">
      <h3 className="habit-tracker__heading">Habit Tracker</h3>

      {habits.length > 0 && (
        <div className="habit-tracker__table-wrap">
          <table className="habit-tracker__table">
            <thead>
              <tr>
                <th className="habit-tracker__th habit-tracker__th--name">
                  Habit
                </th>
                {weekDays.map((day) => (
                  <th key={day.date} className="habit-tracker__th">
                    {day.dayShort}
                  </th>
                ))}
                <th className="habit-tracker__th habit-tracker__th--action" />
              </tr>
            </thead>
            <tbody>
              {habits.map((habit) => (
                <tr key={habit.id} className="habit-tracker__row">
                  <td className="habit-tracker__name">{habit.name}</td>
                  {weekDays.map((day) => {
                    const checked =
                      entries.get(habit.id)?.get(day.date) ?? false;
                    return (
                      <td key={day.date} className="habit-tracker__cell">
                        <input
                          className="habit-tracker__checkbox"
                          type="checkbox"
                          checked={checked}
                          onChange={() => onToggleEntry(habit.id, day.date)}
                        />
                      </td>
                    );
                  })}
                  <td className="habit-tracker__cell habit-tracker__cell--action">
                    <button
                      className="habit-tracker__delete"
                      onClick={() => onDeleteHabit(habit.id)}
                      aria-label={`Delete ${habit.name}`}
                    >
                      &times;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <form className="habit-tracker__form" onSubmit={handleSubmit}>
        <input
          className="habit-tracker__input"
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Add a habit..."
        />
        <button className="habit-tracker__add-btn" type="submit">
          +
        </button>
      </form>

      {habits.length === 0 && (
        <p className="habit-tracker__empty">
          No habits yet. Add one to start tracking!
        </p>
      )}
    </div>
  );
}

export default HabitTracker;
