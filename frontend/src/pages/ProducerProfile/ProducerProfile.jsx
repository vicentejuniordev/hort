import { useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft, User, CreditCard, BarChart2, Bell, MapPin, Shield, HelpCircle, LogOut, Star, ShoppingBasket, Users } from 'lucide-react';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import './style.css';

const stats = [
  { icon: <Users size={22} strokeWidth={1.5} />, value: '148', label: 'Clientes' },
  { icon: <Star size={22} strokeWidth={1.5} />, value: '4.9', label: 'Avaliação' },
  { icon: <ShoppingBasket size={22} strokeWidth={1.5} />, value: '32', label: 'Cestas' },
];

const gestao = [
  { icon: <User size={18} strokeWidth={1.5} />, title: 'Minha Conta Hort', subtitle: 'Dados da horta e perfil público' },
  { icon: <CreditCard size={18} strokeWidth={1.5} />, title: 'Configurações de Pagamento', subtitle: 'Métodos e histórico financeiro' },
  { icon: <BarChart2 size={18} strokeWidth={1.5} />, title: 'Estatísticas de Vendas', subtitle: 'Desempenho e análise de pedidos' },
];

const conta = [
  { icon: <Bell size={18} strokeWidth={1.5} />, title: 'Notificações', subtitle: 'Alertas de pedidos e mensagens', badge: 4 },
  { icon: <MapPin size={18} strokeWidth={1.5} />, title: 'Área de Entrega', subtitle: 'Regiões e raio de cobertura' },
  { icon: <Shield size={18} strokeWidth={1.5} />, title: 'Privacidade e Segurança', subtitle: 'Senha, dados e permissões' },
  { icon: <HelpCircle size={18} strokeWidth={1.5} />, title: 'Ajuda e Suporte', subtitle: 'Central de ajuda e contato' },
];

function MenuSection({ title, items }) {
  return (
    <div className="profile-section">
      <p className="profile-section-label">{title}</p>
      <div className="profile-menu-group">
        {items.map((item, idx) => (
          <button className="profile-menu-item" key={idx}>
            <div className="profile-menu-icon">{item.icon}</div>
            <div className="profile-menu-text">
              <span className="profile-menu-title">
                {item.title}
                {item.badge && <span className="profile-badge">{item.badge}</span>}
              </span>
              <span className="profile-menu-subtitle">{item.subtitle}</span>
            </div>
            <ChevronRight size={16} color="#94a3b8" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ProducerProfile() {
  const navigate = useNavigate();
  return (
    <div className="profile-screen">
      <div className="profile-header">
        <button className="profile-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="profile-title">Perfil</h1>
      </div>
      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-card-info">
            <div className="profile-avatar-placeholder" />
            <div className="profile-card-text">
              <p className="profile-name">Horta Nossa Senhora da Guia</p>
              <p className="profile-email">hort@gmail.com</p>
              <div className="profile-badges">
                <span className="badge badge-verified">✓ Produtor Verificado</span>
                <span className="badge badge-top">🌿 Top Produtor</span>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-stats">
          {stats.map((s, i) => (
            <div className="profile-stat-item" key={i}>
              <div className="profile-stat-icon">{s.icon}</div>
              <p className="profile-stat-value">{s.value}</p>
              <p className="profile-stat-label">{s.label}</p>
            </div>
          ))}
        </div>
        <MenuSection title="GESTÃO" items={gestao} />
        <MenuSection title="CONTA" items={conta} />
        <div className="profile-section">
          <div className="profile-menu-group">
            <button className="profile-menu-item profile-logout">
              <div className="profile-menu-icon profile-logout-icon">
                <LogOut size={18} strokeWidth={1.5} />
              </div>
              <div className="profile-menu-text">
                <span className="profile-menu-title">Sair da conta</span>
                <span className="profile-menu-subtitle">Encerrar sessão</span>
              </div>
              <ChevronRight size={16} color="#ef4444" />
            </button>
          </div>
        </div>
        <p className="profile-footer">HORT © 2026 · v1.5.0</p>
      </div>
      <BottomNavigation activeItem="profile" setIsSidebarOpen={() => {}} />
    </div>
  );
}
