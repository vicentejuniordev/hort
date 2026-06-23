import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import CheckoutHeader from "../../components/CheckoutHeader/CheckoutHeader";
import SubscriptionTabs from "../../components/SubscriptionTabs/SubscriptionTabs";
import ManagerSectionHeader from "../../components/ManageSectionHeader/ManageSectionHeader";
import PlanManagementCard from "../../components/PlanManagementCard/PlanManagementCard";
import ProductManagementCard from "../../components/ProductManageCard/ProductManageCard";

import imgPlano from "../../assets/img/img_horta_01.png";

import imgCebola from "../../assets/icons/cebola.png";
import imgTomate from "../../assets/icons/tomate.png";

import "./style.css";

export default function ProducerManagerPlans() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("planos");

  const [plans, setPlans] = useState([
    {
      id: 1,
      name: "Plano Básico",
      description: "Ideal para clientes que querem começar.",
      price: 19.99,
      subscribers: 2,
      icon: imgPlano,
    },
    {
      id: 2,
      name: "Plano Essencial",
      description: "Plano completo para compras recorrentes.",
      price: 39.99,
      subscribers: 5,
      icon: imgPlano,
    },
  ]);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Cebola",
      price: 2.5,
      stock: 30,
      icon: imgCebola,
    },
    {
      id: 2,
      name: "Tomate",
      price: 3.5,
      stock: 25,
      icon: imgTomate,
    },
    {
      id: 3,
      name: "Alface",
      price: 2.0,
      stock: 15,
      icon: imgPlano,
    },
  ]);

  function deletePlan(planId) {
    setPlans((prevPlans) =>
      prevPlans.filter((plan) => plan.id !== planId)
    );
  }

  function deleteProduct(productId) {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  }

  function handleAdd() {
    if (activeTab === "planos") {
      console.log("Adicionar plano");
      return;
    }

    console.log("Adicionar produto");
  }

  return (
    <div className="producer-manager-plans">
      <CheckoutHeader onBack={() => navigate(-1)} />

      <SubscriptionTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="producer-manager-content">
        {activeTab === "planos" && (
          <>
            <ManagerSectionHeader
              title="Planos Ativos"
              count={plans.length}
              itemName="plano"
              buttonLabel="Adicionar"
              onAdd={handleAdd}
            />

            <div className="plans-list">
              {plans.map((plan) => (
                <PlanManagementCard
                  key={plan.id}
                  plan={plan}
                  onDelete={deletePlan}
                  onEdit={(id) => navigate(`/planos/${id}/editar`)}
                />
              ))}
            </div>
          </>
        )}

        {activeTab === "produtos" && (
          <>
            <ManagerSectionHeader
              title="Hortaliças Ativas"
              count={products.length}
              itemName="produto"
              buttonLabel="Adicionar"
              onAdd={handleAdd}
            />

            <div className="products-grid">
              {products.map((product) => (
                <ProductManagementCard
                  key={product.id}
                  product={product}
                  onDelete={deleteProduct}
                  onEdit={(id) => navigate(`/produtos/${id}/editar`)}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <BottomNavigation activeItem="perfil" />
    </div>
  );
}