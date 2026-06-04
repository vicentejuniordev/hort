
import "./style.css";

export default function CategoryButton({
  label,
  value,
  icon: Icon,
  activeCategory,
  setActiveCategory,
}) {
  const isActive = activeCategory === value;

  function handleClick() {
    setActiveCategory(isActive ? null : value);
  }

  return (
    <button
      onClick={handleClick}
      className={`category-button ${isActive ? "active" : ""}`}
    >
      <Icon className="category-icon" />
      <span>{label}</span>
    </button>
  );
}