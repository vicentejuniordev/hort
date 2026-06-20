import { Trash2, Minus, Plus } from "lucide-react";
import "./style.css";

export default function CartItem({
  item,
  removeFromCart,
  updateQuantity,
}) {
  const subtotal = item.price * item.quantity;

  return (
    <article className="cart-item">
      <div className="cart-item-content">
        <div className="cart-item-image">
          <img src={item.image} alt={item.name} />
        </div>

        <div className="cart-item-info">
          <div className="cart-item-header">
            <h3>{item.name}</h3>

            <button
              className="cart-remove-button"
              onClick={() => removeFromCart(item.id)}
              aria-label="Remover item"
            >
              <Trash2 className="cart-remove-icon" />
            </button>
          </div>

          <p className="cart-item-price">
            R$ {item.price.toFixed(2).replace(".", ",")}
          </p>

          <div className="cart-item-bottom">
            <div className="cart-quantity-control">
              <button
                onClick={() =>
                  updateQuantity(item.id, item.quantity - 1)
                }
                aria-label="Diminuir quantidade"
              >
                <Minus className="cart-quantity-icon" />
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() =>
                  updateQuantity(item.id, item.quantity + 1)
                }
                aria-label="Aumentar quantidade"
              >
                <Plus className="cart-quantity-icon green" />
              </button>
            </div>

            <span className="cart-subtotal">
              Subtotal:{" "}
              <strong>
                R$ {subtotal.toFixed(2).replace(".", ",")}
              </strong>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}