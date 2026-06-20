import { Link } from "react-router-dom";
import { Home, ShoppingBasket } from "lucide-react";
import "./style.css";

export default function HortaBottomNavigation({
  cartCount,
  onCartClick,
}) {
  return (
    <nav className="horta-bottom-nav">
      <Link to="/home">
        <Home className="bottom-nav-icon" />
        <span>Início</span>
      </Link>

      <button onClick={onCartClick}>
        <div className="bottom-cart-wrapper">
          <ShoppingBasket className="bottom-nav-icon" />
          {cartCount > 0 && <strong>{cartCount}</strong>}
        </div>
        <span>Carrinho</span>
      </button>
    </nav>
  );
}