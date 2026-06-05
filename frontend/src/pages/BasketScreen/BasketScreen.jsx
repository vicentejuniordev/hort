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
  const [setIsSidebarOpen] = useState(false);

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

  return (
    <main className="my-baskets-screen">
      <BasketHeader
        onBack={() => navigate("/home")}
        onAdd={() => navigate("/home")}
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
      />

      <BottomNavigation  activeItem="baskets" setIsSidebarOpen={setIsSidebarOpen} />
    </main>
  );
}