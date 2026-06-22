import { Paperclip, Send } from "lucide-react";
import "./style.css";
import { useState } from "react";

export default function ChatInput({ handleSendMessage }) {
  const [newMessage, setNewMessage] = useState("");

  function handleSend() {
    if (newMessage.trim() === "") return;
    handleSendMessage(newMessage);
    setNewMessage("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSend();
  }

  return (
    <div className="chat-input">
      <button className="icon-button">
        <Paperclip />
      </button>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Digite uma mensagem..."
      />
      <button className="send-button" onClick={handleSend}>
        <Send />
      </button>
    </div>
  );
}