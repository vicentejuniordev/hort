import React, { useState } from 'react';
import './style.css';
import ProducerPlanCard from '../../components/ProducerPlanCard/ProducerPlanCard';
import ProducerProductCard from '../../components/ProducerProductCard/ProducerProductCard';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
// Dados de exemplo rápidos
const initialPlans = [
  {
    id: 1,
    icon: '🧺',
    name: 'Plano Básico',
    description: 'Acessos a frutas limitadas e entregas apenas uma vez por semana.'
  },
  {
    id: 2,
    icon: '🧺',
    name: 'Plano Básico',
    description: 'Acessos a frutas limitadas e entregas apenas uma vez por semana.'
  },
  {
    id: 3,
    icon: '👑',
    name: 'Plano Premium',
    description: 'Acessos a frutas limitadas e entregas apenas uma vez por semana.'
  }
];

const initialProducts = [
  {
    id: 1,
    image: '/../assets/icons/tomate.png',
    name: 'Tomate Cereja',
    price: 2.0,
    stock: 20
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/120x80?text=Tomate',
    name: 'Tomate Cereja',
    price: 2.0,
    stock: 20
  }
];

export default function ProducerDashboard() {
  const [plans, setPlans] = useState(initialPlans);
  const [products, setProducts] = useState(initialProducts);

  function handleDeletePlan(id) {
    setPlans(prev => prev.filter(p => p.id !== id));
  }

  function handleEditPlan(id) {
    const plan = plans.find(p => p.id === id);
    if (!plan) return;
    const newName = prompt('Editar nome do plano', plan.name);
    if (newName !== null && newName.trim() !== '') {
      setPlans(prev => prev.map(p => (p.id === id ? { ...p, name: newName } : p)));
    }
  }

  function handleDeleteProduct(id) {
    setProducts(prev => prev.filter(p => p.id !== id));
  }

  function handleEditProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    const newPrice = prompt('Editar preço do produto (use ponto para decimal)', product.price);
    const parsed = parseFloat(newPrice);
    if (!isNaN(parsed)) {
      setProducts(prev => prev.map(p => (p.id === id ? { ...p, price: parsed } : p)));
    }
  }

  return (
    <div className="producer-dashboard">
      <header className="producer-header">
        <div className="producer-logo">
          <span className="producer-logo-icon">🌿</span>
          <h1 className="producer-logo-text">HORT</h1>
        </div>
      </header>

      <main className="producer-main">
        <section className="producer-section">
          <h2 className="producer-section-title">Planos Ativos</h2>
          <div className="producer-list">
            {plans.map(plan => (
              <ProducerPlanCard
                key={plan.id}
                plan={plan}
                onDelete={handleDeletePlan}
                onEdit={handleEditPlan}
              />
            ))}
            {plans.length === 0 && <p className="empty-text">Nenhum plano ativo</p>}
          </div>
        </section>

        <section className="producer-section">
          <h2 className="producer-section-title">Hortaliças Ativas</h2>
          <div className="producer-products-grid">
            {products.map(product => (
              <ProducerProductCard
                key={product.id}
                product={product}
                onDelete={handleDeleteProduct}
                onEdit={handleEditProduct}
              />
            ))}
            {products.length === 0 && <p className="empty-text">Nenhum produto ativo</p>}
          </div>
        </section>
      </main>

      <BottomNavigation />
    </div>
  );
}
