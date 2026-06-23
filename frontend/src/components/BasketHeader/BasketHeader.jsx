import { ArrowLeft, Plus } from "lucide-react";
import "./style.css";

export default function BasketHeader({ onBack, onAdd, title = 'Minhas Cestas', showAdd = true }) {
  return (
    <div className="basket-header">
      <button className="basket-header-back" onClick={onBack}>
        <ArrowLeft className="basket-header-icon" />
      </button>

      <h1>{title}</h1>

      {showAdd ? (
        <button className="basket-header-add" onClick={onAdd}>
          <Plus className="basket-header-icon-add" />
        </button>
      ) : <span className="basket-header-spacer" aria-hidden="true" />}
    </div>
  );
}
