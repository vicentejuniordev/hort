import profileIcon from '../../assets/icons/profile-icon.png';
import './style.css';
import notificationsIcon from '../../assets/icons/notificacao.png';
import localIcon from '../../assets/icons/localizacao.png';
import NotificationModal from '../NotificationsModal/NotificationModal';
import {useState} from 'react';

export default function HeaderUser() {

    const [openModal, setOpenModal] = useState(false);

    return (
        <>
        <header className="header-user">
            <div className="header-user-container">
                <div className="user-info-container">
                <img src={profileIcon} alt="Profile" className="img-profile" />
                <div className="header-user-info">
                    <p style={{ fontWeight: 300 }}>Olá!👋</p>
                    <p>Bem-vindo!</p>
                </div>
            </div>
               <div     className='notifications-container'>
                <button className='notifications-button' onClick={() => setOpenModal(true)}>
                    <img id='notifications' src={notificationsIcon} alt="Notifications" />
                </button>
               </div>
            </div>
            <div className="header-user-bottom">
                <img id='img-local' src={localIcon} alt="Profile" className="img-profile" />
                <p>Rua das Flores, 123</p>
            </div>
            <hr className="header-user-hr" />
        </header>
        <NotificationModal isOpen={openModal} onClose={() => setOpenModal(false)} />
        </>
    );
}