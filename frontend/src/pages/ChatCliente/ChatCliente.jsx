import HeaderUser from '../../components/HeaderUser/HeaderUser';
import SearchComponent from '../../components/SearchComponent/SearchComponent';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import './style.css';
import { useState } from 'react';
import MessageList from '../../components/MessageList/MessageList';

export default function MessagesScreen() {
  const [ setIsSidebarOpen] = useState(true);

  const [messages] = useState([
    { id: 1, sender: 'Horta Nossa Senhora da Guia', preview: 'Amanhã é dia de entrega…', time: '19:20', unread: true },
    { id: 2, sender: 'Horta Nossa Senhora das Graças', preview: 'Sua cesta está pronta!', time: '18:45', unread: true },
    { id: 3, sender: 'Horta de Todos', preview: 'Obrigado pela preferência', time: 'Ontem', unread: false },
    { id: 4, sender: 'Verdurão Oliveira', preview: 'Novos produtos disponíveis', time: 'Ontem', unread: false },
  ]);

  return (
    <div className="messages-screen">


      <div className="messages-header">
        <h2>Mensagens</h2>
        <span className="new-count">{messages.filter(m => m.unread).length} novas</span>
      </div>
<SearchComponent placeholder="Procurar mensagem…" />

      <div className="filters">
        <button>Todas</button>
        <button>Não lidas</button>
        <button>Favoritos</button>
      </div>

      

      <MessageList messages={messages} />

      <BottomNavigation activeItem="messages" setIsSidebarOpen={setIsSidebarOpen} />
    </div>
  );
}
