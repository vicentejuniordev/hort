import { Plus } from "lucide-react";
import "./style.css";

export default function ManagerSectionHeader({
  title,
  count,
  itemName,
  buttonLabel = "Adicionar",
  onAdd,
  showButton = true,
}) {
  const isPlural = count !== 1;

  return (
    <div className="manager-section-header">
      <div className="manager-section-info">
        <h1>{title}</h1>

        <p>
          {count} {itemName}
          {isPlural ? "s" : ""} cadastrado
          {isPlural ? "s" : ""}
        </p>
      </div>

      {showButton && (
        <button
          type="button"
          className="manager-section-button"
          onClick={onAdd}
        >
          <Plus className="manager-section-icon" />
          {buttonLabel}
        </button>
      )}
    </div>
  );
}
