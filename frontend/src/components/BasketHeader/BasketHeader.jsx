import { ArrowLeft, Plus } from "lucide-react";
import "./style.css";

export default function BasketHeader({ onBack, onAdd }) {
  return (
    <div className="basket-header">
      <button className="basket-header-back" onClick={onBack}>
        <ArrowLeft className="basket-header-icon" />
      </button>

      <h1>Minhas Cestas</h1>

      <button className="basket-header-add" onClick={onAdd}>
        <Plus className="basket-header-icon-add" />
      </button>
    </div>
  );
}