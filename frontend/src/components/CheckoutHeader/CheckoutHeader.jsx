import { ChevronLeft, Leaf } from "lucide-react";
import "./style.css";

export default function CheckoutHeader({ onBack }) {
  return (
    <header className="checkout-header">
      <button
        className="checkout-back-button"
        onClick={onBack}
        aria-label="Voltar"
      >
        <ChevronLeft className="checkout-back-icon" />
      </button>

      <div className="checkout-logo">
        <Leaf className="checkout-logo-icon" />
        <span>HORT</span>
      </div>
    </header>
  );
}