import { ShoppingBag } from "lucide-react";
import "./style.css";

export default function CheckoutButton({
  onCheckout,
  disabled = false,
}) {
  return (
    <div className="checkout-container">
      <button
        className={`checkout-button ${
          disabled ? "disabled" : ""
        }`}
        onClick={onCheckout}
        disabled={disabled}
      >
        <ShoppingBag className="checkout-icon" />

        <span className="checkout-text">Finalizar Compra</span>
      </button>
    </div>
  );
}