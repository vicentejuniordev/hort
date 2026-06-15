import { useNavigate } from "react-router-dom";

function MessageList({ messages }) {
  const navigate = useNavigate();

  return (
    <div className="message-list">
      {messages.map((m) => (
        <div 
          key={m.id} 
          className="message-item" 
          onClick={() => navigate(`/messages/${m.id}`)}
        >
          <h4>{m.sender}</h4>
          <p>{m.preview}</p>
          <span>{m.time}</span>
        </div>
      ))}
    </div>
  );
}
