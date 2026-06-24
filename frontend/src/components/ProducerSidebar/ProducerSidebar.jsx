import { Home, MessageCircle, Package, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logoHort from "../../assets/icons/logo.png";
import { getCurrentUser } from "../../services/authStorage";
import "./style.css";

const navigationItems = [
  { id: "home", label: "Início", icon: Home, to: "/produtor" },
  { id: "baskets", label: "Planos e produtos", icon: Package, to: "/produtor/gerenciar-planos" },
  { id: "messages", label: "Mensagens", icon: MessageCircle, to: "/produtor/mensagens" },
  { id: "profile", label: "Meu perfil", icon: User, to: "/produtor/perfil" },
];

export default function ProducerSidebar({ activeItem }) {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const farmName = currentUser?.name?.trim() || "Sua horta";
  const accountDetail = currentUser?.cnpj ? `CNPJ ${currentUser.cnpj}` : "Conta de produtor";

  return (
    <aside className="producer-sidebar" aria-label="Navegação do produtor">
      <div className="producer-sidebar__brand"><img src={logoHort} alt="Hort" /></div>
      <nav className="producer-sidebar__nav">
        {navigationItems.map(({ id, label, icon: Icon, to }) => (
          <button className={`producer-sidebar__item ${activeItem === id ? "producer-sidebar__item--active" : ""}`} key={id} type="button" onClick={() => navigate(to)}>
            <Icon size={19} /> {label}
          </button>
        ))}
      </nav>
      <div className="producer-sidebar__farm">
        <span className="producer-sidebar__avatar" aria-hidden="true">{farmName.charAt(0).toLocaleUpperCase("pt-BR")}</span>
        <div><strong>{farmName}</strong><span>{accountDetail}</span></div>
      </div>
    </aside>
  );
}
