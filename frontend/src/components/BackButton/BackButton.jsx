import { useNavigate } from 'react-router-dom';
import './style.css';

export default function BackButton({ to, label = 'Voltar' }) {
  const navigate = useNavigate();

  return (
    <button className="app-back-button" type="button" onClick={() => (to ? navigate(to) : navigate(-1))}>
      <span className="app-back-icon" aria-hidden="true">←</span>
      <span>{label}</span>
    </button>
  );
}
