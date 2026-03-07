import { useState } from "react";
import type { FormEvent } from "react";
import type { TaskResponse, TaskCreate, TaskUpdate } from "../../types/task";
import { TaskStatus } from "../../types/task";
import type { WeekDay } from "../../utils/week";
import { formatDate } from "../../utils/week";
import "./DayColumn.css";

interface DayColumnProps {
  day: WeekDay;
  tasks: TaskResponse[];
  onCreateTask: (data: TaskCreate) => Promise<void>;
  onUpdateTask: (taskId: string, data: TaskUpdate) => Promise<void>;
  onDeleteTask: (taskId: string) => Promise<void>;
}

function DayColumn({
  day,
  tasks,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
}: DayColumnProps) {
  const [newTitle, setNewTitle] = useState("");
  const today = formatDate(new Date());
  const isToday = day.date === today;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = newTitle.trim();
    if (!trimmed) return;
    onCreateTask({ title: trimmed, scheduled_date: day.date });
    setNewTitle("");
  }

  function toggleDone(task: TaskResponse) {
    const newStatus =
      task.status === TaskStatus.Done ? TaskStatus.Todo : TaskStatus.Done;
    onUpdateTask(task.id, { status: newStatus });
  }

  return (
    <div className={`day-col${isToday ? " day-col--today" : ""}`}>
      <div className="day-col__header">
        <span className="day-col__day-name">{day.dayShort}</span>
        <span className="day-col__day-num">{day.dayOfMonth}</span>
      </div>

      <ul className="day-col__tasks">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`day-task${task.status === TaskStatus.Done ? " day-task--done" : ""}`}
          >
            <input
              className="day-task__checkbox"
              type="checkbox"
              checked={task.status === TaskStatus.Done}
              onChange={() => toggleDone(task)}
            />
            <span className="day-task__title">{task.title}</span>
            <button
              className="day-task__delete"
              onClick={() => onDeleteTask(task.id)}
              aria-label="Delete task"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>

      <form className="day-col__add" onSubmit={handleSubmit}>
        <input
          className="day-col__add-input"
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="+ Add task"
        />
      </form>
    </div>
  );
}

export default DayColumn;
