import { Home, ShoppingCart } from "lucide-react";
import "./style.css";

export default function HortaBottomNavigation({
  cartCount,
  onCartClick,
  onHomeClick,
}) {
  return (
    <nav className="horta-bottom-nav">
      <button type="button" onClick={onHomeClick}>
        <Home className="bottom-nav-icon" />
        <span>Início</span>
      </button>

      <button type="button" onClick={onCartClick}>
        <div className="bottom-cart-wrapper">
          <ShoppingCart className="bottom-nav-icon" />
          {cartCount > 0 && <strong>{cartCount}</strong>}
        </div>
        <span>Carrinho</span>
      </button>
    </nav>
  );
}
