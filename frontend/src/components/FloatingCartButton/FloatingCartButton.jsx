import { ShoppingCart } from "lucide-react";
import "./style.css";

export default function FloatingCartButton({ cartCount, onClick }) {
  return (
    <button
      className="floating-cart-button"
      onClick={onClick}
      aria-label="Ver carrinho"
    >
      <ShoppingCart className="floating-cart-icon" />
      <span>{cartCount}</span>
    </button>
  );
}