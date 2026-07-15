import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const NAV_ITEMS = [
  { to: "/wardrobe", label: "Wardrobe", icon: "👗" },
  { to: "/generate", label: "Generate", icon: "✨" },
  { to: "/thrift", label: "Thrift Search", icon: "🛍️" },
  { to: "/history", label: "History", icon: "📋" },
  { to: "/profile", label: "Profile", icon: "👤" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <NavLink to="/">CHER.</NavLink>
      </div>
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `sidebar-link${isActive ? " sidebar-link--active" : ""}`}
          >
            <span className="sidebar-link-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
