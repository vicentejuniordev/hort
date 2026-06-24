import { Home, MessageCircle, ShoppingCart, User } from "lucide-react";
import BottomNavigation from "../BottomNavigation/BottomNavigation";

const producerItems = [
  { id: "home", icon: Home, label: "Início", to: "/produtor" },
  { id: "baskets", icon: ShoppingCart, label: "Cestas", to: "/produtor/gerenciar-planos" },
  { id: "messages", icon: MessageCircle, label: "Mensagens", to: "/produtor/mensagens" },
  { id: "profile", icon: User, label: "Perfil", to: "/produtor/perfil" },
];

export default function ProducerBottomNavigation({ activeItem }) {
  return <BottomNavigation activeItem={activeItem} items={producerItems} />;
}
