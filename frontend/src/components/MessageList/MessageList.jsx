import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import productorIcon from "../../assets/icons/productor-icon.png";

export default function MessageList({ messages }) {
  const navigate = useNavigate();

  return (
    <ul className="messages-list">
      {messages.map((msg) => (
        <li
          key={msg.id}
          className={`message-item ${msg.unread ? "unread" : ""}`}
          onClick={() => navigate(`/mensagens/${msg.id}`)} // corrigido
          style={{ cursor: "pointer" }}
        >
          <img src={productorIcon} alt="Productor" className="message-icon" />

          <div className="content">
            <strong>{msg.sender}</strong>
            <p>{msg.preview}</p>
          </div>

          <span className="time">{msg.time}</span>
        </li>
      ))}
    </ul>
  );
}
