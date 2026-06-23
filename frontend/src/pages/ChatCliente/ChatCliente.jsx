import SearchComponent from '../../components/SearchComponent/SearchComponent';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import BasketHeader from '../../components/BasketHeader/BasketHeader';
import FilterTabs from "../../components/FilterTabs/FilterTabs";
import MessageList from '../../components/MessageList/MessageList';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';


export default function MessagesScreen() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState('');

  const [messages, setMessages] = useState([
    { id: 1, sender: 'Horta Nossa Senhora da Guia', preview: 'Amanhã é dia de entrega…', time: '19:20', unread: true, favorite: true },
    { id: 2, sender: 'Horta Nossa Senhora das Graças', preview: 'Sua cesta está pronta!', time: '18:45', unread: true, favorite: false },
    { id: 3, sender: 'Horta de Todos', preview: 'Obrigado pela preferência', time: 'Ontem', unread: false, favorite: false },
    { id: 4, sender: 'Verdurão Oliveira', preview: 'Novos produtos disponíveis', time: 'Ontem', unread: false, favorite: true },
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
  const visibleMessages = filteredMessages.filter((message) => `${message.sender} ${message.preview}`.toLowerCase().includes(searchTerm.toLowerCase()));

  function openMessage(id) {
    setMessages((current) => current.map((message) => message.id === id ? { ...message, unread: false } : message));
  }

  return (
    <div className="messages-screen">
      <div className="messages-content">
      <BasketHeader title="Mensagens" showAdd={false} onBack={() => navigate('/home-client')} />
      <div className="messages-header">
        <p>CAIXA DE ENTRADA</p>
        <span className="new-count">{messages.filter(m => m.unread).length} novas</span>
      </div>

      <SearchComponent placeholder="Procurar mensagem…" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />

      <FilterTabs
        filterTabs={filterTabs}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <MessageList messages={visibleMessages} onOpen={openMessage} />

      {visibleMessages.length === 0 && <p className="messages-empty">Nenhuma mensagem encontrada.</p>}
      </div>

      <BottomNavigation activeItem="messages" />
    </div>
  );
}
