import './style.css';

export default function NotificationItem({ notification, onMarkAsRead }) {
  return (
    <button
      type="button"
      className={`notification-item ${notification.read ? '' : 'notification-unread'}`}
      onClick={() => onMarkAsRead(notification.id)}
      aria-label={`${notification.title}. ${notification.read ? 'Lida' : 'Não lida'}`}
    >
      <div className="notification-icon">{notification.icon}</div>

      <div className="notification-content">
        <h4 className="notification-title">{notification.title}</h4>
        <p className="notification-message">{notification.message}</p>
        <span className="notification-time">{notification.time}</span>
      </div>

      {!notification.read && <span className="notification-dot" aria-label="Não lida" />}
    </button>
  );
}
