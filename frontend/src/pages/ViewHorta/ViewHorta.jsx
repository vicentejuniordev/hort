import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DetailHeader from "../../components/DetailHeader/DetailHeader";
import HortaHero from "../../components/HortaHero/HortaHero";
import HortaTabs from "../../components/HortaTabs/HortaTabs";
import AboutTab from "../../components/AboutTab/AboutTab";
import PlansTab from "../../components/PlansTab/PlansTab";
import ProductsTab from "../../components/ProductsTab/ProductsTab";
import HortaBottomNavigation from "../../components/HortaBottomNavigation/HortaBottomNavigation";

import imgHorta from "../../assets/img/img_horta_01.png";
import imgHorta2 from "../../assets/img/img_horta_02.png";
import planBasket from "../../assets/img/plan-basket.png";
import onionImage from "../../assets/icons/cebola.png";
import tomatoImage from "../../assets/icons/tomate.png";

import "./style.css";

const HORTAS = {
  1: {
    id: 1,
    name: "Horta do João",
    image: imgHorta,
    rating: 4.7,
    reviews: 88,
    distance: "1,2 km",
    address: "Rua das Flores, 123",
    description: "Horta comunitária com variedade de hortaliças frescas e cultivadas localmente.",
  },
  2: {
    id: 2,
    name: "Hortifrúti da Maria",
    image: imgHorta2,
    rating: 4.8,
    reviews: 126,
    distance: "2,5 km",
    address: "Avenida Central, 450",
    description: "Hortifrúti orgânico com frutas frescas selecionadas todos os dias.",
  },
  3: {
    id: 3,
    name: "Horta da Ana",
    image: imgHorta,
    rating: 4.6,
    reviews: 73,
    distance: "3,1 km",
    address: "Rua das Palmeiras, 78",
    description: "Horta local especializada em plantas medicinais e produtos orgânicos.",
  },
  4: {
    id: 4,
    name: "Hortifrúti do Pedro",
    image: imgHorta2,
    rating: 4.5,
    reviews: 61,
    distance: "3,8 km",
    address: "Rua do Mercado, 210",
    description: "Hortifrúti com uma variedade de frutas e verduras para o dia a dia.",
  },
  5: {
    id: 5,
    name: "Hortifrúti da Clara",
    image: imgHorta,
    rating: 4.9,
    reviews: 142,
    distance: "4,2 km",
    address: "Praça das Acácias, 35",
    description: "Hortifrúti orgânico com produtos frescos, sazonais e de qualidade.",
  },
};

export default function HortaDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const hortaId = Number(id) || 1;
  const produtosRef = useRef(null);

  const [activeTab, setActiveTab] = useState("sobre");
  const [isFavorite, setIsFavorite] = useState(false);

  const [products, setProducts] = useState([
    { id: 1, name: "Cebola", price: 2.0, image: onionImage, quantity: 0 },
    { id: 2, name: "Tomate", price: 3.5, image: tomatoImage, quantity: 0 },
    { id: 3, name: "Alface", price: 2.5, image: planBasket, quantity: 0 },
    { id: 4, name: "Cenoura", price: 3.0, image: planBasket, quantity: 0 },
  ]);

  const cartCount = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const horta = HORTAS[hortaId] ?? HORTAS[1];

  const plans = [
    {
      id: "basico",
      name: "Plano Básico",
      price: 19.99,
      icon: "🌱",
      image: planBasket,
      description: "Ideal para começar sua jornada saudável",
      features: ["Entregas 1x por semana", "Acesso a frutas limitadas"],
      recommended: false,
    },
    {
      id: "essencial",
      name: "Plano Essencial",
      price: 39.99,
      icon: "⭐",
      image: planBasket,
      description: "Perfeito para famílias e uso regular",
      features: ["Entregas 3x por semana", "Suporte prioritário", "10% de desconto"],
      recommended: true,
    },
    {
      id: "premium",
      name: "Plano Premium",
      price: 99.9,
      icon: "👑",
      image: planBasket,
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
        onBack={() => navigate("/home-client")}
        onToggleFavorite={() => setIsFavorite(!isFavorite)}
        onShare={() => console.log("Compartilhar")}
      />

      <HortaHero horta={horta} />

      <HortaTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="horta-details-content">
        {activeTab === "sobre" && <AboutTab horta={horta} />}

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

      <HortaBottomNavigation
        cartCount={cartCount}
        onHomeClick={() => setActiveTab('sobre')}
        onCartClick={() => navigate(`/carrinho/${hortaId}`, {
          state: {
            cartItems: products.filter((product) => product.quantity > 0),
            hortaName: horta.name,
          },
        })}
      />
    </div>
  );
}
