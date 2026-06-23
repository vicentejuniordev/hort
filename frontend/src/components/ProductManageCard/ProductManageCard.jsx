import { Trash2, Pencil } from "lucide-react";
import "./style.css";

export default function ProductManagementCard({
  product,
  onDelete,
  onEdit,
}) {
  return (
    <article className="product-management-card">
      <div className="product-management-image">
        <img src={product.icon} alt={product.name} />
      </div>

      <div className="product-management-info">
        <h3>{product.name}</h3>

        <p>
          Valor:{" "}
          <strong>
            R$ {product.price.toFixed(2).replace(".", ",")}
          </strong>
        </p>

        <p>
          Estoque:{" "}
          <strong>{product.stock} unidades</strong>
        </p>
      </div>

      <div className="product-management-actions">
        <button
          className="delete-product-button"
          onClick={() => onDelete(product.id)}
        >
          <Trash2 className="product-action-icon" />
          Excluir
        </button>

        <button
          className="edit-product-button"
          onClick={() => onEdit(product.id)}
        >
          <Pencil className="product-action-icon" />
          Editar
        </button>
      </div>
    </article>
  );
}