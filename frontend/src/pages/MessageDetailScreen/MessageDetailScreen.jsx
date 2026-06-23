import { useNavigate, useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./Style.css";

export default function MessageDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const names = { 1: 'Horta Nossa Senhora da Guia', 2: 'Horta Nossa Senhora das Graças', 3: 'Horta de Todos', 4: 'Verdurão Oliveira' };
  const senderName = names[id] || 'Fornecedor';
  const [conversation, setConversation] = useState([
    { from: "Joãozinho", text: "Olá! Boa tarde, como posso ajudar?", time: "14:30" },
    { from: "Você", text: "Oi! Gostaria de saber se vocês têm alface disponível para entrega amanhã", time: "14:32" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  function handleSendMessage() {
    if (newMessage.trim() === "") return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setConversation((prev) => [...prev, { from: "Você", text: newMessage, time }]);
    setNewMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleSendMessage();
  }

  // Scroll automático para o fim
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  return (
    <div className="chat-screen">
      <header className="chat-header">
        <button type="button" className="chat-back-button" onClick={() => navigate('/mensagens')} aria-label="Voltar para mensagens">←</button>
        <div><p>CONVERSA COM</p><h1>{senderName}</h1></div>
      </header>

      <div className="chat-messages">
        {conversation.map((msg, index) => (
          <div 
            key={index} 
            className={`chat-bubble ${msg.from === "Você" ? "sent" : "received"}`}
          >
            <p>{msg.text}</p>
            <span className="chat-time">{msg.time}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
