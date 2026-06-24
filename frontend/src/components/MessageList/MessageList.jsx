import { useNavigate } from "react-router-dom";
import "./style.css";
import productorIcon from "../../assets/icons/productor-icon.png";
import profileIcon from "../../assets/icons/profile-icon.png";

export default function MessageList({ messages, onOpen, participantType = 'producer', detailPath = '/mensagens' }) {
  const navigate = useNavigate();

  return (
    <ul className="messages-list">
      {messages.map((msg) => (
        <li
          key={msg.id}
          className={`message-item ${msg.unread ? "unread" : ""}`}
          onClick={() => { onOpen(msg.id); navigate(`${detailPath}/${msg.id}`); }}
        >
          <img src={participantType === 'client' ? profileIcon : productorIcon} alt={participantType === 'client' ? 'Cliente' : 'Produtor'} className="message-icon" />

          <div className="content">
            <strong>{msg.sender}</strong>
            {msg.detail && <span className="message-detail">{msg.detail}</span>}
            <p>{msg.preview}</p>
          </div>

          <span className="time">{msg.time}</span>
        </li>
      ))}
    </ul>
  );
}
