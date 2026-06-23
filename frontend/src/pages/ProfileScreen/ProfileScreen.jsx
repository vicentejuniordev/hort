import { Bell, ChevronRight, CreditCard, Heart, LogOut, Pencil, Settings, UserRound } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profileIcon from '../../assets/icons/profile-icon.png';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import { getCurrentUser, logoutUser, updateCurrentUser } from '../../services/authStorage';
import './style.css';

const menuItems = [
  { icon: UserRound, label: 'Minha conta', description: 'Dados pessoais e contato' },
  { icon: CreditCard, label: 'Pagamento', description: 'Métodos e assinaturas' },
  { icon: Heart, label: 'Favoritos', description: 'Hortas salvas por você' },
  { icon: Bell, label: 'Notificações', description: 'Preferências de avisos' },
  { icon: Settings, label: 'Configurações', description: 'Ajustes do aplicativo' },
];

export default function ProfileScreen() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => getCurrentUser());
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || 'Visitante');
  const [phone, setPhone] = useState(user?.phone || '');

  const handleSave = (event) => {
    event.preventDefault();
    const updatedUser = updateCurrentUser({ name, phone });
    if (updatedUser) setUser(updatedUser);
    setEditing(false);
  };

  const handleLogout = () => { logoutUser(); navigate('/login'); };
  const initials = (user?.name || 'V').split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase();

  return (
    <main className="profile-page">
      <section className="profile-content">
        <header className="profile-header"><p>MINHA CONTA</p><h1>Perfil</h1></header>
        <section className="profile-summary">
          <div className="profile-avatar"><img src={profileIcon} alt="" /><span>{initials}</span></div>
          <div><h2>{user?.name || 'Visitante'}</h2><p>{user?.email || 'Entre para acessar sua conta'}</p><span className="profile-role">{user?.role === 'producer' ? 'Produtor' : 'Cliente'}</span></div>
          <button className="profile-edit" type="button" onClick={() => setEditing(true)} aria-label="Editar perfil"><Pencil size={17} /></button>
        </section>
        <section className="profile-menu">{menuItems.map(({ icon: Icon, label, description }) => <button key={label} type="button" onClick={() => label === 'Minha conta' && setEditing(true)}><Icon /><span><strong>{label}</strong><small>{description}</small></span><ChevronRight /></button>)}</section>
        <button className="profile-logout" type="button" onClick={handleLogout}><LogOut size={18} />Sair da conta</button>
      </section>
      <BottomNavigation activeItem="profile" />
      {editing && <div className="profile-modal-overlay" onClick={() => setEditing(false)}><form className="profile-modal" onSubmit={handleSave} onClick={(event) => event.stopPropagation()}><h2>Editar perfil</h2><label>Nome completo<input value={name} onChange={(event) => setName(event.target.value)} required /></label><label>Telefone<input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="(00) 00000-0000" /></label><div><button type="button" onClick={() => setEditing(false)}>Cancelar</button><button type="submit">Salvar</button></div></form></div>}
    </main>
  );
}
