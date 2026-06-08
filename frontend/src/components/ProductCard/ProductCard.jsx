import { Plus, Minus } from "lucide-react";
import "./style.css";

export default function ProductCard({ product, updateQuantity }) {
  return (
    <article className="product-card">
      <div className="product-image-box">
        <img src={product.image} alt={product.name} />
      </div>

      <h3>{product.name}</h3>

      <p>R$ {product.price.toFixed(2).replace(".", ",")}</p>

      {product.quantity === 0 ? (
        <button
          className="add-product-button"
          onClick={() => updateQuantity(product.id, 1)}
        >
          <Plus className="product-button-icon" />
          Adicionar
        </button>
      ) : (
        <div className="quantity-control">
          <button onClick={() => updateQuantity(product.id, -1)}>
            <Minus className="product-button-icon" />
          </button>

          <strong>{product.quantity}</strong>

          <button onClick={() => updateQuantity(product.id, 1)}>
            <Plus className="product-button-icon" />
          </button>
        </div>
      )}
    </article>
  );
}