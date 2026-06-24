import { Home, ShoppingCart, MessageCircle, User } from "lucide-react";
import NavItem from "../NavItem/NavItem";
import "./style.css";

const defaultItems = [
  { id: "home", icon: Home, label: "Início", to: "/home-client" },
  { id: "baskets", icon: ShoppingCart, label: "Cestas", to: "/minhas-cestas" },
  { id: "messages", icon: MessageCircle, label: "Mensagens", to: "/mensagens" },
  { id: "profile", icon: User, label: "Perfil", to: "/perfil" },
];

export default function BottomNavigation({
  activeItem,
  items = defaultItems,
}) {
  return (
    <nav className="bottom-navigation">
      {items.map(({ id, icon, label, to, onClick }) => (
        <NavItem
          key={id}
          icon={icon}
          label={label}
          to={to}
          onClick={onClick}
          active={activeItem === id}
        />
      ))}
    </nav>
  );
}
