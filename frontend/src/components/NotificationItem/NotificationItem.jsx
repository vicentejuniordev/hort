import './style.css';
export default function NotificationItem({ notification }) {

  return (
    <div className="notification-item">
      <div className="notification-icon">
        {notification.icon}
      </div>

      <div className="notification-content">
        <h4 className="notification-title">{notification.title}</h4>
        <p className="notification-message">{notification.message}</p>
        <span className="notification-time">{notification.time}</span>
      </div>

      {!notification.read && (
        <div className="notification-dot" />
      )}
    </div>
  );
}