import NotificationItem from "../NotificationItem/NotificationItem";
import "./style.css";

export default function NotificationModal({
  isOpen,
  onClose,
}) {
  const notifications = [
    {
      id: 1,
      title: "Assinatira confirmada",
      message: "Sua assinatura foi confirmada com sucesso",
      time: "Há 5 min",
      read: false,
      icon: "📦",
    },
    {
      id: 2,
      title: "Cesta a caminho",
      message: "Sua cesta está chegando",
      time: "Há 1 hora",
      read: false,
      icon: "🚚",
    },
    {
      id: 3,
      title: "Oferta especial",
      message: "Aproveite 20% de desconto na próxima compra",
      time: "Há 2 horas",
      read: true,
      icon: "🎉",
    },
  ];

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h3>Notificações</h3>
            <span>3 não lidas</span>
          </div>

          <div className="modal-actions">
            <button className="btn-check-all">
              Marcar todas
            </button>

            <button
              className="btn-close"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
        </div>

        <div className="notifications-list">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>

        <div className="modal-footer">
          <button className="btn-view-all">
            Ver todas as notificações
          </button>
        </div>
      </div>
    </div>
  );
}