import './LoginScreen.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../../services/authStorage';
import logo from '../../assets/icons/logo.png';
import BackButton from '../../components/BackButton/BackButton';

export default function LoginScreen({ onVoltar, onFazerLogin, onCriarConta }) {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = {};

    if (!identifier.trim()) validationErrors.identifier = 'Informe seu e-mail, telefone ou CNPJ.';
    if (!password) validationErrors.password = 'Informe sua senha.';

    setErrors(validationErrors);
    setLoginError('');
    if (Object.keys(validationErrors).length > 0) return;

    const user = await authenticateUser(identifier, password);
    if (!user) {
      setLoginError('Dados de acesso não encontrados. Verifique e tente novamente.');
      return;
    }

    onFazerLogin?.(user);
    navigate(user.role === 'producer' ? '/producer-dashboard' : '/home-client');
  };

  return (
    <div className="login-wrapper">
      {onVoltar ? (
        <button className="login-back-btn" onClick={onVoltar}>Voltar</button>
      ) : <BackButton to="/" />}

      <div className="login-header">
        <img className="login-brand-logo" src={logo} alt="HORT" />
        <p className="login-brand-tagline">Produtos frescos, direto da origem</p>
      </div>

      <div className="login-card">
        <h2 className="login-title">Bem-vindo de volta</h2>
        <p className="login-subtitle">Entre com sua conta ou escolha outra forma de acesso</p>

        <form className="login-form" noValidate onSubmit={handleSubmit}>
          <div className="login-field">
            <label className="login-label" htmlFor="login-identifier">Email, telefone ou CNPJ</label>
            <div className="login-input-wrapper">
              <span className="login-input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </span>
              <input
                type="text"
                id="login-identifier"
                className="login-input"
                placeholder="seu@email.com"
                value={identifier}
                onChange={(event) => {
                  setIdentifier(event.target.value);
                  setErrors((current) => ({ ...current, identifier: '' }));
                  setLoginError('');
                }}
                autoComplete="username"
                aria-invalid={Boolean(errors.identifier)}
                aria-describedby={errors.identifier ? 'login-identifier-error' : undefined}
              />
            </div>
            {errors.identifier && <span id="login-identifier-error" className="login-field-error">{errors.identifier}</span>}
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="login-password">Senha</label>
            <div className="login-input-wrapper">
              <span className="login-input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="login-password"
                className="login-input"
                placeholder="••••••••"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setErrors((current) => ({ ...current, password: '' }));
                  setLoginError('');
                }}
                autoComplete="current-password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'login-password-error' : undefined}
              />
              <button className="login-eye-btn" type="button" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="2">
                  {showPassword ? (
                    <>
                      <path d="M3 3l18 18" />
                      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                      <path d="M9.9 4.2A10.6 10.6 0 0 1 12 4c7 0 11 8 11 8a19.1 19.1 0 0 1-3.1 4.2" />
                      <path d="M6.6 6.6C3.7 8.5 1 12 1 12s4 8 11 8a10.8 10.8 0 0 0 3.1-.5" />
                    </>
                  ) : (
                    <>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </>
                  )}
                </svg>
              </button>
            </div>
            {errors.password && <span id="login-password-error" className="login-field-error">{errors.password}</span>}
          </div>

          <div className="login-forgot">
            <button className="login-forgot-btn" type="button">Esqueceu a senha?</button>
          </div>

          {loginError && <p className="login-error" role="alert">{loginError}</p>}
          <button className="login-submit-btn" type="submit">
            Entrar
          </button>
        </form>

        <div className="login-divider">
          <span className="login-divider-line" />
          <span className="login-divider-text">Ou continue com</span>
          <span className="login-divider-line" />
        </div>

        <div className="login-social">
          <button className="login-social-btn">
            {/* Google */}
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </button>
          <button className="login-social-btn" aria-label="Continuar com X">
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#111" d="M18.9 2H22l-6.77 7.73L23.2 22h-6.24l-4.89-6.4L6.47 22H3.36l7.24-8.28L2.95 2h6.4l4.42 5.84L18.9 2Zm-1.09 18h1.72L8.42 3.9H6.58L17.81 20Z" />
            </svg>
          </button>
          <button className="login-social-btn">
            {/* Facebook */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>
        </div>

        <p className="login-register-text">
          Não tem conta ainda?{' '}
          <button className="login-register-link" onClick={() => (onCriarConta ? onCriarConta() : navigate('/selecionar-perfil'))}>
            Cadastre-se
          </button>
        </p>
      </div>

      <p className="login-terms">
        Ao entrar, você concorda com nossos{' '}
        <a href="#" className="login-terms-link">Termos de Uso</a>{' '}
        e{' '}
        <a href="#" className="login-terms-link">Política de Privacidade</a>
      </p>
    </div>
  );
}
