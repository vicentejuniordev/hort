import { ChevronLeft } from "lucide-react";
import "./style.css";

export default function CartHeader({
  hortaName,
  onBack,
}) {
  return (
    <>
    <header className="cart-header">
      <button
        className="cart-header-back"
        onClick={onBack}
        aria-label="Voltar"
      >
        <ChevronLeft className="cart-header-icon" />
      </button>

      <div className="cart-header-content">
        <h1>Seu Carrinho</h1>
        <p>{hortaName}</p>
      </div>
      
    </header>
    <hr/>
    </>
  );
}