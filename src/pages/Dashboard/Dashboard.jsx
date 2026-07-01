import { FiBell, FiCalendar, FiUsers, FiActivity, FiClock, FiArrowRight, FiUser, FiSettings } from "react-icons/fi";
import "./Dashboard.css";

const appointments = [
  { doctor: "Dr. Sarah Johnson", speciality: "Cardiologist", date: "Jul 15, 2026", time: "10:30 AM", status: "Confirmed" },
  { doctor: "Dr. Mark Chen", speciality: "Dermatologist", date: "Jul 18, 2026", time: "2:00 PM", status: "Pending" },
  { doctor: "Dr. Priya Sharma", speciality: "Gynecologist", date: "Jul 22, 2026", time: "11:00 AM", status: "Confirmed" },
];

const stats = [
  { icon: FiCalendar, value: "6", label: "Appointments" },
  { icon: FiUsers, value: "3", label: "Doctors" },
  { icon: FiActivity, value: "12", label: "Reports" },
  { icon: FiClock, value: "2", label: "Pending" },
];

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <span className="sidebar-dot">✦</span> MediConnect
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item active"><FiUser /> Dashboard</a>
          <a href="#" className="nav-item"><FiCalendar /> Appointments</a>
          <a href="#" className="nav-item"><FiUsers /> Doctors</a>
          <a href="#" className="nav-item"><FiActivity /> Health Records</a>
          <a href="#" className="nav-item"><FiSettings /> Settings</a>
        </nav>
        <div className="sidebar-user">
          <div className="sidebar-avatar">JD</div>
          <div className="sidebar-user-info">
            <strong>John Doe</strong>
            <span>john@example.com</span>
          </div>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Welcome back, John 👋</h1>
          <div className="header-actions">
            <button className="header-btn"><FiBell /></button>
          </div>
        </header>

        <div className="stats-grid-dash">
          {stats.map((s) => (
            <div key={s.label} className="stat-card-dash">
              <div className="stat-card-icon"><s.icon /></div>
              <div className="stat-card-value">{s.value}</div>
              <div className="stat-card-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Upcoming Appointments</h2>
            <a href="#" className="view-all">View All <FiArrowRight /></a>
          </div>
          <div className="appointments-list">
            {appointments.map((a) => (
              <div key={a.doctor} className="appointment-card">
                <div className="appt-left">
                  <div className="appt-date-box">
                    <span className="appt-day">{a.date.split(',')[0]}</span>
                    <span className="appt-time">{a.time}</span>
                  </div>
                  <div className="appt-info">
                    <h4>{a.doctor}</h4>
                    <span>{a.speciality}</span>
                  </div>
                </div>
                <span className={`appt-status ${a.status.toLowerCase()}`}>{a.status}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
