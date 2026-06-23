import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import CartHeader from "../../components/CartHeader/CartHeader";
import EmptyCart from "../../components/EmptyCart/EmptyCart";
import CartItem from "../../components/CartItem/CartItem";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import CheckoutButton from "../../components/CheckoutButton/CheckoutButton";

import "./style.css";

export default function CartScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { hortaId } = useParams();

  const hortaIdNum = Number(hortaId) || 1;
  const hortaName = location.state?.hortaName || "Horta";

  const [cartItems, setCartItems] = useState(() => location.state?.cartItems || []);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const serviceFee = 2.0;
  const deliveryFee = 5.0;

  const subtotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const total = subtotal + serviceFee + deliveryFee;

  const isCartEmpty = cartItems.length === 0;

  function handleBack() {
    navigate(`/view-horta/${hortaIdNum}`);
  }

  function handleAddProducts() {
    navigate(`/view-horta/${hortaIdNum}`, {
      state: { openTab: "produtos" },
    });
  }

  function removeFromCart(itemId) {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  }

  function updateQuantity(itemId, newQuantity) {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  }

  function handleCheckout() {
    if (isCartEmpty) return;
    setIsCheckoutModalOpen(true);
  }

  return (
    <div className="cart-screen">
      <CartHeader
        hortaName={hortaName}
        onBack={handleBack}
      />

      <main className="cart-screen-content">
        {isCartEmpty ? (
          <EmptyCart onAddProducts={handleAddProducts} />
        ) : (
          <>
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                />
              ))}
            </div>

            <OrderSummary
              subtotal={subtotal}
              serviceFee={serviceFee}
              deliveryFee={deliveryFee}
              total={total}
            />
          </>
        )}
      </main>

      {!isCartEmpty && (
        <CheckoutButton
          onCheckout={handleCheckout}
          disabled={isCartEmpty}
        />
      )}

      {isCheckoutModalOpen && (
        <div className="checkout-modal-overlay" onClick={() => setIsCheckoutModalOpen(false)}>
          <section className="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-modal-title" onClick={(event) => event.stopPropagation()}>
            <div className="checkout-modal-icon" aria-hidden="true">🌱</div>
            <h2 id="checkout-modal-title">Em desenvolvimento</h2>
            <p>A finalização da compra estará disponível em breve. Estamos preparando essa experiência para você.</p>
            <button type="button" onClick={() => setIsCheckoutModalOpen(false)}>Entendi</button>
          </section>
        </div>
      )}
    </div>
  );
}
