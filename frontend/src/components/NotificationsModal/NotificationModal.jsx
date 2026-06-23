import { useEffect } from 'react';
import NotificationItem from '../NotificationItem/NotificationItem';
import './style.css';

export default function NotificationModal({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onMarkAsRead,
}) {
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  useEffect(() => {
    if (!isOpen) return undefined;

    function handleEscape(event) {
      if (event.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="notification-modal-overlay" onClick={onClose}>
      <section
        className="notification-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="notifications-title"
      >
        <div className="notification-modal-header">
          <div>
            <h3 id="notifications-title">Notificações</h3>
            <span>{unreadCount ? `${unreadCount} não ${unreadCount === 1 ? 'lida' : 'lidas'}` : 'Você está em dia'}</span>
          </div>

          <div className="notification-modal-actions">
            {unreadCount > 0 && (
              <button className="btn-check-all" onClick={onMarkAllAsRead}>
                Marcar todas como lidas
              </button>
            )}
            <button className="btn-close" onClick={onClose} aria-label="Fechar notificações">×</button>
          </div>
        </div>

        <div className="notifications-list">
          {notifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} onMarkAsRead={onMarkAsRead} />
          ))}
        </div>

        <div className="notification-modal-footer">
          <span>Toque em uma notificação para marcá-la como lida.</span>
        </div>
      </section>
    </div>
  );
}
