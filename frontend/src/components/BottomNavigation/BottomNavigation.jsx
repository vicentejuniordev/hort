import { Home, ShoppingBasket, MessageCircle, User } from "lucide-react";
import NavItem from "../NavItem/NavItem";
import "./style.css";

export default function BottomNavigation({
  setIsSidebarOpen,
  activeItem
}) {
  return (
    <nav className="bottom-navigation">
      <NavItem
        icon={Home}
        label="Início"
        to="/home-client"
        active={activeItem === "home"}
      />

      <NavItem
        icon={ShoppingBasket}
        label="Cestas"
        to="/minhas-cestas"
        active={activeItem === "baskets"}
      />

      <NavItem
        icon={MessageCircle}
        label="Mensagens"
        to="/mensagens"
        active={activeItem === "messages"}
      />

      <NavItem
        icon={User}
        label="Perfil"
        onClick={() => setIsSidebarOpen(true)}
        active={activeItem === "profile"}
      />
    </nav>
  );
}