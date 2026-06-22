import { useParams, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import ChatInput from "../../components/ChatImput/ChatImput";
import "./Style.css";

export default function MessageDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [conversation, setConversation] = useState([
    { from: "Joãozinho", text: "Olá! Boa tarde, como posso ajudar?", time: "14:30" },
    { from: "Você", text: "Oi! Gostaria de saber se vocês têm alface disponível para entrega amanhã", time: "14:32" },
  ]);

  const messagesEndRef = useRef(null);

  function handleSendMessage(text) {
    if (!text || text.trim() === "") return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setConversation((prev) => [...prev, { from: "Você", text, time }]);
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  return (
    <div className="chat-screen">
      <header className="chat-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          &#8592;
        </button>
        <div className="chat-header-avatar">
          <div className="avatar-circle">J</div>
        </div>
        <div className="chat-header-info">
          <span className="chat-header-name">Joãozinho</span>
          <span className="chat-header-status">Online</span>
        </div>
        <div className="chat-header-actions">
          <button className="header-action-btn">&#128222;</button>
          <button className="header-action-btn">&#9654;</button>
          <button className="header-action-btn">&#8942;</button>
        </div>
      </header>

      <div className="chat-date-divider">
        <span>Hoje</span>
      </div>

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

      <ChatInput handleSendMessage={handleSendMessage} />
    </div>
  );
}