import { Link } from "react-router-dom";
import "./style.css";

export default function NavItem({
  icon: Icon,
  label,
  to,
  active = false,
  onClick,
}) {
  const content = (
    <div className={`nav-item-content ${active ? "active" : ""}`}>
      <Icon className="nav-icon" />
      <span>{label}</span>
    </div>
  );

  if (onClick) {
    return (
      <button
        className="nav-item-button"
        onClick={onClick}
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      to={to}
      className="nav-item-link"
    >
      {content}
    </Link>
  );
}