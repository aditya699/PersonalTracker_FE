import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import WeeklyPlanner from "../components/planner/WeeklyPlanner";
import "./DashboardPage.css";

function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <main className="dashboard">
      <header className="dashboard__header">
        <div>
          <h1 className="dashboard__title">
            <span className="dashboard__brand">Modern</span>
            <span className="dashboard__brand-accent">Life</span>
            <span className="dashboard__brand">Tracker</span>
          </h1>
          <p className="dashboard__email">Welcome, {user?.name}</p>
        </div>
        <button className="dashboard__logout" onClick={handleLogout}>
          Log out
        </button>
      </header>

      <section className="dashboard__content">
        <WeeklyPlanner />
      </section>
    </main>
  );
}

export default DashboardPage;
