import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CartHeader from "../../components/CartHeader/CartHeader";
import EmptyCart from "../../components/EmptyCart/EmptyCart";
import CartItem from "../../components/CartItem/CartItem";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import CheckoutButton from "../../components/CheckoutButton/CheckoutButton";

import imgTomate from "../../assets/icons/tomate.png";
import imgCebola from "../../assets/icons/cebola.png";

import "./style.css";

export default function CartScreen() {
  const navigate = useNavigate();
  const { hortaId } = useParams();

  const hortaIdNum = Number(hortaId) || 1;
  const hortaName = "Horta Nossa Senhora da Guia";

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Cebola",
      price: 2.0,
      quantity: 2,
      image: imgCebola,
    },
    {
      id: 2,
      name: "Tomate",
      price: 3.5,
      quantity: 1,
      image: imgTomate,
    },
  ]);

  const serviceFee = 2.0;
  const deliveryFee = 5.0;

  const subtotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const total = subtotal + serviceFee + deliveryFee;

  const isCartEmpty = cartItems.length === 0;

  function handleBack() {
    navigate(`/horta/${hortaIdNum}`);
  }

  function handleAddProducts() {
    navigate(`/horta/${hortaIdNum}`, {
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

    alert("Funcionalidade de checkout em desenvolvimento!");
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
    </div>
  );
}