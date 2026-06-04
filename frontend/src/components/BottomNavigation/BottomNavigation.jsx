import { Home, ShoppingBasket, MessageCircle, User } from "lucide-react";
import NavItem from "../NavItem/NavItem";
import "./style.css";

export default function BottomNavigation({
  setIsSidebarOpen,
}) {
  return (
    <nav className="bottom-navigation">
      <NavItem
        icon={Home}
        label="Início"
        to="/"
        active
      />

      <NavItem
        icon={ShoppingBasket}
        label="Cestas"
        to="/minhas-cestas"
      />

      <NavItem
        icon={MessageCircle}
        label="Mensagens"
        to="/mensagens"
      />

      <NavItem
        icon={User}
        label="Perfil"
        onClick={() => setIsSidebarOpen(true)}
      />
    </nav>
  );
}