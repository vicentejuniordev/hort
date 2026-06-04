import profileIcon from '../../assets/icons/profile-icon.png';
import './style.css';
import notificationsIcon from '../../assets/icons/notificacao.png';
import localIcon from '../../assets/icons/localizacao.png';

export default function HeaderUser() {
    return (
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
                <img id='notifications' src={notificationsIcon} alt="Notifications" />
               </div>
            </div>
            <div className="header-user-bottom">
                <img id='img-local' src={localIcon} alt="Profile" className="img-profile" />
                <p>Rua das Flores, 123</p>
            </div>
            <hr className="header-user-hr" />
        </header>
    );
}