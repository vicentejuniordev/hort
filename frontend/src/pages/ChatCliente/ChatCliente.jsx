import HeaderUser from '../../components/HeaderUser/HeaderUser';
import SearchComponent from '../../components/SearchComponent/SearchComponent';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import FilterTabs from "../../components/FilterTabs/FilterTabs";
import MessageList from '../../components/MessageList/MessageList';
import MessageDetailScreen from '../MessageDetailScreen/MessageDetailScreen';
import { useState } from 'react';
import './style.css';


export default function MessagesScreen() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  const [messages] = useState([
    { id: 1, sender: 'Horta Nossa Senhora da Guia', preview: 'Amanhã é dia de entrega…', time: '19:20', unread: true },
    { id: 2, sender: 'Horta Nossa Senhora das Graças', preview: 'Sua cesta está pronta!', time: '18:45', unread: true },
    { id: 3, sender: 'Horta de Todos', preview: 'Obrigado pela preferência', time: 'Ontem', unread: false },
    { id: 4, sender: 'Verdurão Oliveira', preview: 'Novos produtos disponíveis', time: 'Ontem', unread: false },
  ]);

  const filterTabs = [
    { id: "all", label: "Todas", count: messages.length },
    { id: "unread", label: "Não lidas", count: messages.filter(m => m.unread).length },
    { id: "favorites", label: "Favoritos", count: 0 }, // implementar depois
  ];

  const filteredMessages =
    activeFilter === "all"
      ? messages
      : activeFilter === "unread"
      ? messages.filter(m => m.unread)
      : messages.filter(m => m.favorite);

  return (
    <div className="messages-screen">
      <div className="messages-header">
        <h2 style={{ marginLeft: "10px" }}>Mensagens</h2>
        <span 
        style={{ 
          textAlign: "center"
        }}
        className="new-count">{messages.filter(m => m.unread).length} novas</span>
      </div>

      <SearchComponent placeholder="Procurar mensagem…"
        style={{ 
          width: "100%", 
          display: "block", 
          margin: "12px 0" 
        }}
      />

      <FilterTabs
        filterTabs={filterTabs}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <MessageList messages={filteredMessages} />

      <BottomNavigation activeItem="messages" setIsSidebarOpen={setIsSidebarOpen} />
    </div>
  );
}
