import SearchComponent from '../../components/SearchComponent/SearchComponent';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import ProducerBottomNavigation from '../../components/ProducerBottomNavigation/ProducerBottomNavigation';
import ProducerSidebar from '../../components/ProducerSidebar/ProducerSidebar';
import BasketHeader from '../../components/BasketHeader/BasketHeader';
import FilterTabs from "../../components/FilterTabs/FilterTabs";
import MessageList from '../../components/MessageList/MessageList';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.css';

const clientMessages = [
  { id: 1, sender: 'Horta Nossa Senhora da Guia', preview: 'Amanhã é dia de entrega…', time: '19:20', unread: true, favorite: true },
  { id: 2, sender: 'Horta Nossa Senhora das Graças', preview: 'Sua cesta está pronta!', time: '18:45', unread: true, favorite: false },
  { id: 3, sender: 'Horta de Todos', preview: 'Obrigado pela preferência', time: 'Ontem', unread: false, favorite: false },
  { id: 4, sender: 'Verdurão Oliveira', preview: 'Novos produtos disponíveis', time: 'Ontem', unread: false, favorite: true },
];

const producerMessages = [
  { id: 1, sender: 'Ana Beatriz', detail: 'Cliente · Plano Essencial', preview: 'Olá! Posso trocar a couve por mais alface na cesta desta semana?', time: '09:42', unread: true, favorite: true },
  { id: 2, sender: 'Marcos Lima', detail: 'Cliente · Cesta de Verduras', preview: 'Recebi minha cesta e estava tudo muito fresco. Obrigado!', time: 'Ontem', unread: true, favorite: false },
  { id: 3, sender: 'Carla Souza', detail: 'Cliente · Plano Básico', preview: 'Qual o melhor dia para receber a próxima entrega?', time: 'Ontem', unread: false, favorite: true },
  { id: 4, sender: 'João Pedro', detail: 'Cliente · Cesta de Frutas', preview: 'Tenho interesse em assinar uma cesta para minha família.', time: 'Seg', unread: false, favorite: false },
];

export default function MessagesScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const isProducer = location.pathname.startsWith('/produtor');
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState('');

  const [messages, setMessages] = useState(() => isProducer ? producerMessages : clientMessages);

  const filterTabs = [
    { id: "all", label: "Todas", count: messages.length },
    { id: "unread", label: "Não lidas", count: messages.filter(m => m.unread).length },
    { id: "favorites", label: "Favoritos", count: messages.filter(m => m.favorite).length },
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
    <div className={`messages-screen ${isProducer ? 'messages-screen--producer' : ''}`}>
      {isProducer && <ProducerSidebar activeItem="messages" />}
      <div className="messages-main">
      <div className="messages-content">
      <BasketHeader title="Mensagens" showAdd={false} onBack={() => navigate(isProducer ? '/produtor' : '/home-client')} />
      <div className="messages-header">
        <p>{isProducer ? 'MENSAGENS DOS CLIENTES' : 'CAIXA DE ENTRADA'}</p>
        <span className="new-count">{messages.filter(m => m.unread).length} novas</span>
      </div>

      <SearchComponent placeholder="Procurar mensagem…" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />

      <FilterTabs
        filterTabs={filterTabs}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <MessageList
        messages={visibleMessages}
        onOpen={openMessage}
        participantType={isProducer ? 'client' : 'producer'}
        detailPath={isProducer ? '/produtor/mensagens' : '/mensagens'}
      />

      {visibleMessages.length === 0 && <p className="messages-empty">Nenhuma mensagem encontrada.</p>}
      </div>
      </div>

      {isProducer ? <ProducerBottomNavigation activeItem="messages" /> : <BottomNavigation activeItem="messages" />}
    </div>
  );
}
