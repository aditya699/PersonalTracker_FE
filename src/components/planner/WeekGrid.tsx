import type { TaskResponse, TaskCreate, TaskUpdate } from "../../types/task";
import type { WeekDay } from "../../utils/week";
import DayColumn from "./DayColumn";
import "./WeekGrid.css";

interface WeekGridProps {
  weekDays: WeekDay[];
  tasks: TaskResponse[];
  onCreateTask: (data: TaskCreate) => Promise<void>;
  onUpdateTask: (taskId: string, data: TaskUpdate) => Promise<void>;
  onDeleteTask: (taskId: string) => Promise<void>;
}

function WeekGrid({
  weekDays,
  tasks,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
}: WeekGridProps) {
  function tasksForDay(date: string) {
    return tasks.filter((t) => t.scheduled_date === date);
  }

  return (
    <div className="week-grid">
      {weekDays.map((day) => (
        <DayColumn
          key={day.date}
          day={day}
          tasks={tasksForDay(day.date)}
          onCreateTask={onCreateTask}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
}

export default WeekGrid;
