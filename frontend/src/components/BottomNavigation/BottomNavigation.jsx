import { Home, ShoppingCart, MessageCircle, User } from "lucide-react";
import NavItem from "../NavItem/NavItem";
import "./style.css";

export default function BottomNavigation({
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
        icon={ShoppingCart}
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
        to="/perfil"
        active={activeItem === "profile"}
      />
    </nav>
  );
}
