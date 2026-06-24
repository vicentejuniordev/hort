import profileIcon from '../../assets/icons/profile-icon.png';
import producerIcon from '../../assets/icons/productor-icon.png';
import './style.css';
import notificationsIcon from '../../assets/icons/notificacao.png';
import localIcon from '../../assets/icons/localizacao.png';
import NotificationModal from '../NotificationsModal/NotificationModal';
import {useState} from 'react';
import { getCurrentUser } from '../../services/authStorage';

const INITIAL_NOTIFICATIONS = [
    { id: 1, title: 'Assinatura confirmada', message: 'Sua assinatura foi confirmada com sucesso.', time: 'Há 5 min', read: false, icon: '📦' },
    { id: 2, title: 'Cesta a caminho', message: 'Sua cesta está chegando. Acompanhe a entrega pelo pedido.', time: 'Há 1 hora', read: false, icon: '🚚' },
    { id: 3, title: 'Oferta especial', message: 'Aproveite 20% de desconto na sua próxima cesta.', time: 'Há 2 horas', read: true, icon: '🎉' },
];

export default function HeaderUser({ variant = 'client' }) {

    const [openModal, setOpenModal] = useState(false);
    const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
    const currentUser = getCurrentUser();
    const firstName = currentUser?.name?.trim().split(' ')[0] || 'Visitante';
    const isProducer = variant === 'producer';
    const displayName = isProducer ? (currentUser?.name?.trim() || 'Sua horta') : firstName;
    const accountLabel = isProducer
        ? (currentUser?.cnpj ? `CNPJ: ${currentUser.cnpj}` : 'Conta de produtor')
        : 'Rua das Flores, 123';
    const unreadCount = notifications.filter((notification) => !notification.read).length;

    function markAllAsRead() {
        setNotifications((currentNotifications) => currentNotifications.map((notification) => ({ ...notification, read: true })));
    }

    function markAsRead(notificationId) {
        setNotifications((currentNotifications) => currentNotifications.map((notification) => (
            notification.id === notificationId ? { ...notification, read: true } : notification
        )));
    }

    return (
        <>
        <header className={`header-user ${isProducer ? 'header-user--producer' : ''}`}>
            <div className="header-user-container">
                <div className="user-info-container">
                <img className='user-avatar' src={isProducer ? producerIcon : profileIcon} alt={isProducer ? 'Horta' : 'Perfil'} />
                <div className="header-user-info">
                    <p className="header-greeting">Olá, {displayName}! 👋</p>
                    <p>{isProducer ? 'Painel da sua horta' : 'Bem-vindo(a)!'}</p>
                </div>
            </div>
               <div     className='notifications-container'>
                <button
                    className='notifications-button'
                    onClick={() => setOpenModal(true)}
                    aria-label={`Abrir notificações${unreadCount ? ` (${unreadCount} não lidas)` : ''}`}
                >
                    <img id='notifications' src={notificationsIcon} alt="" />
                    {unreadCount > 0 && <span className="notification-count" aria-hidden="true">{unreadCount > 9 ? '9+' : unreadCount}</span>}
                </button>
               </div>
            </div>
            <div className="header-user-bottom">
                <img id='img-local' src={localIcon} alt="Localização" className="img-profile" />
                <p>{accountLabel}</p>
            </div>
            <hr className="header-user-hr" />
        </header>
        <NotificationModal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            notifications={notifications}
            onMarkAllAsRead={markAllAsRead}
            onMarkAsRead={markAsRead}
        />
        </>
    );
}
