import { Trash2, Pencil } from "lucide-react";
import "./style.css";

export default function PlanManagementCard({
  plan,
  onDelete,
  onEdit,
}) {
  return (
    <article className="plan-management-card">
      <div className="plan-management-header">
        <div className="plan-management-icon-box">
          <img
            src={plan.icon}
            alt={plan.name}
            className="plan-management-icon"
          />
        </div>

        <div className="plan-management-info">
          <h3>{plan.name}</h3>
          <p>{plan.description}</p>
        </div>

        <div className="plan-management-price">
          <strong>
            R$ {plan.price.toFixed(2).replace(".", ",")}
          </strong>

          <span>/mês</span>
        </div>
      </div>

      <div className="plan-management-stats">
        <p>
          <strong>{plan.subscribers}</strong>{" "}
          assinante
          {plan.subscribers !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="plan-management-actions">
        <button
          className="delete-plan-button"
          onClick={() => onDelete(plan.id)}
        >
          <Trash2 className="action-icon" />
          Excluir
        </button>

        <button
          className="edit-plan-button"
          onClick={() => onEdit(plan.id)}
        >
          <Pencil className="action-icon" />
          Editar
        </button>
      </div>
    </article>
  );
}