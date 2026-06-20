import { ShoppingBag } from "lucide-react";
import "./style.css";

export default function EmptyCart({ onAddProducts }) {
  return (
    <div className="empty-cart">
      <div className="empty-cart-icon-box">
        <ShoppingBag className="empty-cart-icon" />
      </div>

      <p>Seu carrinho está vazio</p>

      <button onClick={onAddProducts}>
        Adicionar Produtos
      </button>
    </div>
  );
}