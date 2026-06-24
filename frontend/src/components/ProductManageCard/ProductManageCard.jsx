import { Pencil, Trash2 } from "lucide-react";
import "./style.css";

export default function ProductManagementCard({ product, onDelete, onEdit }) {
  return (
    <article className="product-management-card">
      <div className="product-management-image"><img src={product.icon} alt="" /></div>
      <div className="product-management-info">
        <h3>{product.name}</h3>
        <div className="product-management-metrics"><span>Preço<strong>R$ {product.price.toFixed(2).replace(".", ",")}</strong></span><span>Estoque<strong>{product.stock} un.</strong></span></div>
      </div>
      <div className="product-management-actions">
        <button type="button" className="edit-product-button" onClick={() => onEdit(product.id)}><Pencil className="product-action-icon" /> Editar</button>
        <button type="button" className="delete-product-button" onClick={() => onDelete(product.id)} aria-label={`Excluir ${product.name}`}><Trash2 className="product-action-icon" /> Excluir</button>
      </div>
    </article>
  );
}
