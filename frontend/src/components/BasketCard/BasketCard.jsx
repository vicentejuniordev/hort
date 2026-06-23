import {
  Calendar,
  Package,
  Edit3,
  Pause,
  Play,
  Trash2,
} from "lucide-react";

import "./style.css";

export default function BasketCard({
  basket,
  onPause,
  onDelete,
  onEdit,
}) {
  const statusConfig = {
    active: {
      label: "Ativa",
      className: "status-active",
    },
    paused: {
      label: "Pausada",
      className: "status-paused",
    },
    canceled: {
      label: "Cancelada",
      className: "status-canceled",
    },
  };

  const config = statusConfig[basket.status];
  const isDisabled = basket.status === "canceled";

  return (
    <div className={`basket-card ${isDisabled ? "disabled" : ""}`}>
      <div className="basket-card-header">
        <div className="basket-image-box">
          <img src={basket.image} alt={basket.name} />
        </div>

        <div className="basket-info">
          <div className="basket-title-row">
            <h3>{basket.name}</h3>

            <span className={`basket-status ${config.className}`}>
              {config.label}
            </span>
          </div>

          <div className="basket-price">
            R$ {basket.price.toFixed(2).replace(".", ",")}
            <span>/mês</span>
          </div>
        </div>
      </div>

      <div className="basket-details">
        <div className="basket-detail-item">
          <div className="detail-icon gray">
            <Calendar className="icon" />
          </div>

          <span>
            Próxima entrega:{" "}
            <strong>
              {basket.deliveryDate} - {basket.deliveryDay}
            </strong>
          </span>
        </div>

        <div className="basket-detail-item">
          <div className="detail-icon green">
            <Package className="icon" />
          </div>

          <div className="basket-products-info">
            <strong>{basket.vegetables} Verduras</strong>
            <span>•</span>
            <span>{basket.customizable} Personalizáveis</span>
          </div>
        </div>
      </div>

      <div className="basket-actions">
        {basket.status === "active" && (
          <>
            <button className="btn-main" onClick={() => onEdit(basket.id)}>
              <Edit3 className="btn-icon" />
              Editar
            </button>

            <button
              className="btn-warning"
              onClick={() => onPause(basket.id)}
              title="Pausar assinatura"
            >
              <Pause className="btn-icon" />
            </button>

            <button
              className="btn-danger"
              onClick={() => onDelete(basket.id)}
              title="Cancelar assinatura"
            >
              <Trash2 className="btn-icon" />
            </button>
          </>
        )}

        {basket.status === "paused" && (
          <>
            <button
              className="btn-main"
              onClick={() => onPause(basket.id)}
            >
              <Play className="btn-icon" />
              Reativar
            </button>

            <button
              className="btn-danger"
              onClick={() => onDelete(basket.id)}
              title="Cancelar assinatura"
            >
              <Trash2 className="btn-icon" />
            </button>
          </>
        )}

        {basket.status === "canceled" && (
          <>
            <button className="btn-disabled" disabled>
              Cancelada
            </button>

            <button
              className="btn-danger"
              onClick={() => onDelete(basket.id)}
              title="Excluir registro"
            >
              <Trash2 className="btn-icon" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
