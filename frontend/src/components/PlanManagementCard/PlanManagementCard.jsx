import { Pencil, Trash2, Users } from "lucide-react";
import "./style.css";

export default function PlanManagementCard({ plan, onDelete, onEdit }) {
  return (
    <article className="plan-management-card">
      <div className="plan-management-card__top">
        <div className="plan-management-icon-box">
          <img src={plan.icon} alt="" className="plan-management-icon" />
        </div>
        <span className="plan-management-status">Ativo</span>
      </div>

      <div className="plan-management-info">
        <h3>{plan.name}</h3>
        <p>{plan.description}</p>
      </div>

      <div className="plan-management-summary">
        <div><span>Mensalidade</span><strong>R$ {plan.price.toFixed(2).replace(".", ",")}</strong></div>
        <div><span><Users size={14} /> Assinantes</span><strong>{plan.subscribers}</strong></div>
      </div>

      <div className="plan-management-actions">
        <button type="button" className="edit-plan-button" onClick={() => onEdit(plan.id)}><Pencil className="action-icon" /> Editar</button>
        <button type="button" className="delete-plan-button" onClick={() => onDelete(plan.id)} aria-label={`Excluir ${plan.name}`}><Trash2 className="action-icon" /> Excluir</button>
      </div>
    </article>
  );
}
