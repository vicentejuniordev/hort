import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BasketHeader from "../../components/BasketHeader/BasketHeader";
import FilterTabs from "../../components/FilterTabs/FilterTabs";
import BasketList from "../../components/BasketList/BasketList";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import cestaImg from "../../assets/img/img_horta_01.png";
import "./style.css";

export default function BasketsScreen() {
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState("all");
  const [editingBasketId, setEditingBasketId] = useState(null);

  const [baskets, setBaskets] = useState([
    {
      id: 1,
      name: "Cesta Orgânica",
      price: 89.9,
      image: cestaImg,
      deliveryDate: "12/06",
      deliveryDay: "Quarta-feira",
      vegetables: 8,
      customizable: 3,
      status: "active",
      items: [
        { id: "tomato", name: "Tomate", category: "Frutas e legumes" },
        { id: "onion", name: "Cebola", category: "Frutas e legumes" },
        { id: "lettuce", name: "Alface", category: "Folhas" },
      ],
    },
    {
      id: 2,
      name: "Cesta Família",
      price: 129.9,
      image: cestaImg,
      deliveryDate: "15/06",
      deliveryDay: "Sábado",
      vegetables: 12,
      customizable: 5,
      status: "paused",
      items: [
        { id: "carrot", name: "Cenoura", category: "Frutas e legumes" },
        { id: "lettuce", name: "Alface", category: "Folhas" },
      ],
    },
    {
      id: 3,
      name: "Cesta Pequena",
      price: 59.9,
      image: cestaImg,
      deliveryDate: "Cancelada",
      deliveryDay: "",
      vegetables: 5,
      customizable: 2,
      status: "canceled",
      items: [],
    },
  ]);

  const filterTabs = [
    {
      id: "all",
      label: "Todas",
      count: baskets.length,
    },
    {
      id: "active",
      label: "Ativas",
      count: baskets.filter((basket) => basket.status === "active").length,
    },
    {
      id: "paused",
      label: "Pausadas",
      count: baskets.filter((basket) => basket.status === "paused").length,
    },
    {
      id: "canceled",
      label: "Canceladas",
      count: baskets.filter((basket) => basket.status === "canceled").length,
    },
  ];

  const filteredBaskets =
    activeFilter === "all"
      ? baskets
      : baskets.filter((basket) => basket.status === activeFilter);

  function handlePauseBasket(id) {
    setBaskets((prevBaskets) =>
      prevBaskets.map((basket) =>
        basket.id === id
          ? {
              ...basket,
              status: basket.status === "active" ? "paused" : "active",
            }
          : basket
      )
    );
  }

  function handleDeleteBasket(id) {
    setBaskets((prevBaskets) =>
      prevBaskets.map((basket) =>
        basket.id === id
          ? {
              ...basket,
              status: "canceled",
            }
          : basket
      )
    );
  }

  const productOptions = {
    "Frutas e legumes": [
      { id: "tomato", name: "Tomate" },
      { id: "onion", name: "Cebola" },
      { id: "carrot", name: "Cenoura" },
      { id: "potato", name: "Batata" },
      { id: "beet", name: "Beterraba" },
    ],
    Folhas: [
      { id: "lettuce", name: "Alface" },
      { id: "kale", name: "Couve" },
      { id: "arugula", name: "Rúcula" },
    ],
  };

  function handleSwapItem(basketId, itemIndex, nextItemId) {
    setBaskets((currentBaskets) => currentBaskets.map((basket) => {
      if (basket.id !== basketId) return basket;
      const currentItem = basket.items[itemIndex];
      const nextItem = productOptions[currentItem.category].find((item) => item.id === nextItemId);
      const nextItems = [...basket.items];
      nextItems[itemIndex] = { ...nextItem, category: currentItem.category };
      return { ...basket, items: nextItems };
    }));
  }

  const editingBasket = baskets.find((basket) => basket.id === editingBasketId);

  return (
    <main className="my-baskets-screen">
      <BasketHeader
        onBack={() => navigate("/home-client")}
        onAdd={() => navigate("/home-client")}
      />

      <FilterTabs
        filterTabs={filterTabs}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <BasketList
        baskets={filteredBaskets}
        onPause={handlePauseBasket}
        onDelete={handleDeleteBasket}
        onEdit={setEditingBasketId}
      />

      <BottomNavigation activeItem="baskets" />

      {editingBasket && (
        <div className="basket-editor-overlay" onClick={() => setEditingBasketId(null)}>
          <section className="basket-editor" role="dialog" aria-modal="true" aria-labelledby="basket-editor-title" onClick={(event) => event.stopPropagation()}>
            <div className="basket-editor-header">
              <div>
                <p>PERSONALIZE SUA CESTA</p>
                <h2 id="basket-editor-title">{editingBasket.name}</h2>
              </div>
              <button type="button" onClick={() => setEditingBasketId(null)} aria-label="Fechar edição">×</button>
            </div>
            <p className="basket-editor-description">Troque os itens disponíveis por opções equivalentes da mesma categoria.</p>
            <div className="basket-editor-items">
              {editingBasket.items.map((item, index) => (
                <label className="basket-editor-item" key={`${item.id}-${index}`}>
                  <span><strong>{item.name}</strong><small>{item.category}</small></span>
                  <select value={item.id} onChange={(event) => handleSwapItem(editingBasket.id, index, event.target.value)}>
                    {productOptions[item.category].map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
                  </select>
                </label>
              ))}
            </div>
            <button className="basket-editor-save" type="button" onClick={() => setEditingBasketId(null)}>Salvar alterações</button>
          </section>
        </div>
      )}
    </main>
  );
}
