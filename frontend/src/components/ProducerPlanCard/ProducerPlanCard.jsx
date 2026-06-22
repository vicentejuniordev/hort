import './style.css';

export default function ProducerPlanCard({ plan, onDelete, onEdit }) {
  return (
    <div className="producer-plan-card">
      <div className="producer-plan-header">
        <span className="producer-plan-icon">{plan.icon}</span>
        <h3 className="producer-plan-name">{plan.name}</h3>
      </div>

      <p className="producer-plan-description">{plan.description}</p>

      <hr className="producer-plan-divider" />

      <div className="producer-plan-actions">
        <button
          className="producer-plan-btn btn-delete"
          onClick={() => onDelete(plan.id)}
        >
          Excluir
        </button>
        <button
          className="producer-plan-btn btn-edit"
          onClick={() => onEdit(plan.id)}
        >
          Editar
        </button>
      </div>
    </div>
  );
}