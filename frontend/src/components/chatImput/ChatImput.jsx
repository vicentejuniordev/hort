import { Stamp } from "lucide-react"
<div className="chat-input">
  <input
    type="text"
    value={newMessage}
    onChange={(e) => setNewMessage(e.target.value)}
    placeholder="Digite sua mensagem..."
  />
  <button onClick={handleSendMessage}>Enviar</button>
</div>
