import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DetailHeader from "../../components/DetailHeader/DetailHeader";
import HortaHero from "../../components/HortaHero/HortaHero";
import HortaTabs from "../../components/HortaTabs/HortaTabs";
import AboutTab from "../../components/AboutTab/AboutTab";
import PlansTab from "../../components/PlansTab/PlansTab";
import ProductsTab from "../../components/ProductsTab/ProductsTab";
import FloatingCartButton from "../../components/FloatingCartButton/FloatingCartButton";
import HortaBottomNavigation from "../../components/HortaBottomNavigation/HortaBottomNavigation";

import imgHorta from "../../assets/img/img_horta_01.png";
import imgProduto from "../../assets/img/img_horta_01.png";

import "./style.css";

export default function HortaDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const hortaId = Number(id) || 1;
  const produtosRef = useRef(null);

  const [activeTab, setActiveTab] = useState("sobre");
  const [isFavorite, setIsFavorite] = useState(false);

  const [products, setProducts] = useState([
    { id: 1, name: "Cebola", price: 2.0, image: imgProduto, quantity: 0 },
    { id: 2, name: "Tomate", price: 3.5, image: imgProduto, quantity: 0 },
    { id: 3, name: "Alface", price: 2.5, image: imgProduto, quantity: 0 },
    { id: 4, name: "Cenoura", price: 3.0, image: imgProduto, quantity: 0 },
  ]);

  const cartCount = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const horta = {
    id: hortaId,
    name: "Horta Nossa Senhora da Guia",
    image: imgHorta,
    rating: 4.6,
    reviews: 120,
    distance: "5km",
    address: "Rua das Flores, 123",
  };

  const plans = [
    {
      id: "basico",
      name: "Plano Básico",
      price: 19.99,
      description: "Ideal para começar sua jornada saudável",
      features: ["Entregas 1x por semana", "Acesso a frutas limitadas"],
      recommended: false,
    },
    {
      id: "essencial",
      name: "Plano Essencial",
      price: 39.99,
      description: "Perfeito para famílias e uso regular",
      features: ["Entregas 3x por semana", "Suporte prioritário", "10% de desconto"],
      recommended: true,
    },
    {
      id: "premium",
      name: "Plano Premium",
      price: 99.9,
      description: "A melhor experiência HORT completa",
      features: ["Entregas todos os dias", "Acesso ilimitado", "Produtos exclusivos"],
      recommended: false,
    },
  ];

  function updateQuantity(productId, delta) {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? {
              ...product,
              quantity: Math.max(0, product.quantity + delta),
            }
          : product
      )
    );
  }

  return (
    <div className="horta-details-page">
      <DetailHeader
        isFavorite={isFavorite}
        onBack={() => navigate("/home")}
        onToggleFavorite={() => setIsFavorite(!isFavorite)}
        onShare={() => console.log("Compartilhar")}
      />

      <HortaHero horta={horta} />

      <HortaTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="horta-details-content">
        {activeTab === "sobre" && <AboutTab />}

        {activeTab === "planos" && (
          <PlansTab plans={plans} />
        )}

        {activeTab === "produtos" && (
          <ProductsTab
            ref={produtosRef}
            products={products}
            updateQuantity={updateQuantity}
          />
        )}
      </main>

      {cartCount > 0 && (
        <FloatingCartButton
          cartCount={cartCount}
          onClick={() => navigate(`/carrinho/${hortaId}`)}
        />
      )}

      <HortaBottomNavigation
        cartCount={cartCount}
        onCartClick={() => navigate(`/carrinho/${hortaId}`)}
      />
    </div>
  );
}