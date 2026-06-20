import { useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  ShoppingBasket,
  Heart,
  Bell,
  CreditCard,
  HelpCircle,
  LogOut,
  User,
} from 'lucide-react';
import { useState } from 'react';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import './style.css';

const menuItems = [
  {
    section: 'Minha Atividade',
    items: [
      {
        icon: ShoppingBasket,
        title: 'Minhas Cestas',
        path: '/minhas-cestas',
      },
      {
        icon: Heart,
        title: 'Favoritos',
        path: '/favoritos',
      },
      {
        icon: Bell,
        title: 'Notificações',
        path: '/notificacoes',
        badge: 3,
      },
    ],
  },
  {
    section: 'Pagamento',
    items: [
      {
        icon: CreditCard,
        title: 'Métodos de Pagamento',
        path: '/pagamento',
      },
    ],
  },
  {
    section: 'Ajuda',
    items: [
      {
        icon: HelpCircle,
        title: 'Central de ajuda (FAQ)',
        path: '/ajuda',
      },
    ],
  },
];

export default function ClientProfile() {
  const navigate = useNavigate();
  const [, setIsSidebarOpen] = useState(false);

  return (
    <div className="psc-screen">
      <div className="psc-hero">
        <div className="psc-avatar-ring">
          <User size={40} color="#22c55e" />
        </div>

        <h1 className="psc-name">João da Silva</h1>

        <button className="psc-edit-btn">
          Editar Perfil
        </button>
      </div>

      <div className="psc-content">
        {menuItems.map((group) => (
          <div key={group.section} className="psc-section">
            <p className="psc-section-label">
              {group.section}
            </p>

            <div className="psc-menu-group">
              {group.items.map((item, idx) => {
                const Icon = item.icon;

                return (
                  <button
                    key={idx}
                    className="psc-menu-item"
                    onClick={() => navigate(item.path)}
                  >
                    <div className="psc-menu-icon">
                      <Icon size={20} />
                    </div>

                    <span className="psc-menu-title">
                      {item.title}
                    </span>

                    {item.badge && (
                      <span className="psc-badge">
                        {item.badge}
                      </span>
                    )}

                    <ChevronRight
                      size={16}
                      color="#94a3b8"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div className="psc-section">
          <div className="psc-menu-group psc-logout-group">
            <button
              className="psc-menu-item"
              onClick={() => navigate('/login')}
            >
              <div className="psc-menu-icon psc-logout-icon">
                <LogOut size={20} />
              </div>

              <span className="psc-menu-title psc-logout-title">
                Sair
              </span>

              <ChevronRight
                size={16}
                color="#ef4444"
              />
            </button>
          </div>
        </div>
      </div>

      <BottomNavigation
        activeItem="profile"
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </div>
  );
}
