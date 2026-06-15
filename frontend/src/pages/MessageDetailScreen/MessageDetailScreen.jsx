import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./Style.css";

export default function MessageDetailScreen() {
  const { id } = useParams();
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

  // Scroll automático para o fim
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  return (
    <div className="chat-screen">
      <header className="chat-header">
        <h3>Conversa com fornecedor {id}</h3>
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

      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
}
