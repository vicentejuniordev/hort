import { ArrowLeft, BarChart3, Bell, ChevronRight, CreditCard, Leaf, LogOut, MapPin, Pencil, Settings, ShoppingBasket, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import productorIcon from "../../assets/icons/productor-icon.png";
import ProducerBottomNavigation from "../../components/ProducerBottomNavigation/ProducerBottomNavigation";
import ProducerSidebar from "../../components/ProducerSidebar/ProducerSidebar";
import { getCurrentUser, logoutUser, updateCurrentUser } from "../../services/authStorage";
import "./style.css";

const managementItems = [
  { icon: Leaf, title: "Minha horta", subtitle: "Dados da horta e perfil público" },
  { icon: CreditCard, title: "Pagamentos", subtitle: "Métodos e histórico financeiro" },
  { icon: BarChart3, title: "Estatísticas de vendas", subtitle: "Desempenho de pedidos e cestas" },
];

const accountItems = [
  { icon: Bell, title: "Notificações", subtitle: "Alertas de pedidos e mensagens", badge: 4 },
  { icon: MapPin, title: "Área de entrega", subtitle: "Regiões e raio de cobertura" },
  { icon: Settings, title: "Configurações", subtitle: "Preferências da conta" },
];

function MenuSection({ title, items, onEdit }) {
  return (
    <section className="client-profile-section">
      <p>{title}</p>
      <div className="client-profile-menu-group">
        {items.map(({ icon: Icon, title: itemTitle, subtitle, badge }) => (
          <button key={itemTitle} type="button" onClick={() => itemTitle === "Minha horta" && onEdit()}>
            <span className="client-profile-menu-icon"><Icon size={18} strokeWidth={1.7} /></span>
            <span className="client-profile-menu-text"><strong>{itemTitle}{badge && <i>{badge}</i>}</strong><small>{subtitle}</small></span>
            <ChevronRight size={16} />
          </button>
        ))}
      </div>
    </section>
  );
}

export default function ProducerProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => getCurrentUser());
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "Sua horta");
  const [phone, setPhone] = useState(user?.phone || "");

  function handleSave(event) {
    event.preventDefault();
    const updatedUser = updateCurrentUser({ name, phone });
    if (updatedUser) setUser(updatedUser);
    setEditing(false);
  }

  function handleLogout() { logoutUser(); navigate("/login"); }

  return (
    <div className="client-profile-page">
      <ProducerSidebar activeItem="profile" />
      <div className="client-profile-main">
        <header className="client-profile-header">
          <button type="button" onClick={() => navigate("/produtor")} aria-label="Voltar"><ArrowLeft size={20} /></button>
          <h1>Perfil da horta</h1>
        </header>

        <main className="client-profile-content">
          <section className="client-profile-card">
            <img src={productorIcon} alt="" />
            <div><h2>{user?.name || "Sua horta"}</h2><p>{user?.email || "Entre para acessar sua conta"}</p><span>Produtor verificado</span></div>
            <button type="button" onClick={() => setEditing(true)} aria-label="Editar perfil"><Pencil size={17} /></button>
          </section>

          <section className="client-profile-stats" aria-label="Resumo da horta">
            <div><Users size={21} /><strong>148</strong><span>Clientes</span></div>
            <div><ShoppingBasket size={21} /><strong>32</strong><span>Cestas ativas</span></div>
            <div><BarChart3 size={21} /><strong>4,9</strong><span>Avaliação</span></div>
          </section>

          <MenuSection title="GESTÃO" items={managementItems} onEdit={() => setEditing(true)} />
          <MenuSection title="CONTA" items={accountItems} onEdit={() => setEditing(true)} />

          <button className="client-profile-logout" type="button" onClick={handleLogout}><span><LogOut size={18} /></span><div><strong>Sair da conta</strong><small>Encerrar sessão neste dispositivo</small></div><ChevronRight size={16} /></button>
          <p className="client-profile-footer">HORT © 2026 · v1.5.0</p>
        </main>
      </div>

      <ProducerBottomNavigation activeItem="profile" />

      {editing && <div className="client-profile-modal-overlay" onMouseDown={() => setEditing(false)}><form className="client-profile-modal" onSubmit={handleSave} onMouseDown={(event) => event.stopPropagation()}><h2>Editar dados da horta</h2><label>Nome da horta<input value={name} onChange={(event) => setName(event.target.value)} required /></label><label>Telefone<input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="(00) 00000-0000" /></label><div><button type="button" onClick={() => setEditing(false)}>Cancelar</button><button type="submit">Salvar</button></div></form></div>}
    </div>
  );
}
