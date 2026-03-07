import { formatDateShort } from "../../utils/week";
import "./PlannerHeader.css";

interface PlannerHeaderProps {
  weekStart: string;
  weekEnd: string;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

function PlannerHeader({
  weekStart,
  weekEnd,
  onPrev,
  onNext,
  onToday,
}: PlannerHeaderProps) {
  return (
    <div className="planner-header">
      <h2 className="planner-header__title">
        {formatDateShort(weekStart)} – {formatDateShort(weekEnd)}
      </h2>
      <div className="planner-header__nav">
        <button
          className="planner-header__btn"
          onClick={onPrev}
          aria-label="Previous week"
        >
          &larr;
        </button>
        <button className="planner-header__btn" onClick={onToday}>
          Today
        </button>
        <button
          className="planner-header__btn"
          onClick={onNext}
          aria-label="Next week"
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}

export default PlannerHeader;
