import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
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
          <h1 className="dashboard__title">Welcome, {user?.name}!</h1>
          <p className="dashboard__email">{user?.email}</p>
        </div>
        <button className="dashboard__logout" onClick={handleLogout}>
          Log out
        </button>
      </header>

      <section className="dashboard__content">
        <div className="dashboard__placeholder">
          <p className="dashboard__placeholder-text">
            Your tasks will appear here soon.
          </p>
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;
