import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/icons/logo.png';
import './style.css';
import InputForm from '../../components/InputForm/InputForm';
import userIcon from '../../assets/icons/user-icon.png';
import StartButton from '../../components/StartButton/StartButtom';
import LoginOther from '../../components/LoginOther/LoginOther';
import emailIcon from '../../assets/icons/email-icon.png';
import telephoneIcon from '../../assets/icons/telefone.png';
import senhaIcon from '../../assets/icons/senha.png';
import { registerUser } from '../../services/authStorage';
import BackButton from '../../components/BackButton/BackButton';
import { PackageCheck, ShieldCheck, Sprout, Users } from 'lucide-react';
import '../RegisterProducer/style.css';

export default function RegisterUser() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [isValidated, setIsValidated] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  useEffect(() => {
    if (!isValidated) return undefined;

    const redirectTimer = window.setTimeout(() => navigate('/home-client'), 2000);
    return () => window.clearTimeout(redirectTimer);
  }, [isValidated, navigate]);

  const validate = (formValues) => {
    const validationErrors = {};

    if (!formValues.name.trim()) {
      validationErrors.name = 'Informe seu nome completo.';
    }

    if (!formValues.email.trim()) {
      validationErrors.email = 'Informe seu e-mail.';
    } else if (!/^\S+@\S+\.\S+$/.test(formValues.email)) {
      validationErrors.email = 'Informe um e-mail válido.';
    }

    const phoneNumbers = formValues.phone.replace(/\D/g, '');
    if (!phoneNumbers) {
      validationErrors.phone = 'Informe seu telefone.';
    } else if (phoneNumbers.length < 10 || phoneNumbers.length > 11) {
      validationErrors.phone = 'Informe um telefone válido com DDD.';
    }

    if (!formValues.password) {
      validationErrors.password = 'Informe uma senha.';
    } else if (formValues.password.length < 8) {
      validationErrors.password = 'A senha precisa ter pelo menos 8 caracteres.';
    }

    if (!formValues.confirmPassword) {
      validationErrors.confirmPassword = 'Confirme sua senha.';
    } else if (formValues.confirmPassword !== formValues.password) {
      validationErrors.confirmPassword = 'As senhas não coincidem.';
    }

    if (!formValues.terms) {
      validationErrors.terms = 'Você precisa aceitar os termos e condições.';
    }

    return validationErrors;
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const nextValues = { ...values, [name]: type === 'checkbox' ? checked : value };

    setValues(nextValues);
    setIsValidated(false);
    setSubmissionError('');
    setErrors((currentErrors) => {
      if (!currentErrors[name]) return currentErrors;

      const nextErrors = validate(nextValues);
      return { ...currentErrors, [name]: nextErrors[name] };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate(values);

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setIsValidated(false);
      return;
    }

    try {
      await registerUser(values);
      setIsValidated(true);
      setSubmissionError('');
    } catch (error) {
      setIsValidated(false);
      setSubmissionError(error.message || 'Não foi possível concluir o cadastro.');
    }
  };

  return (
    <main className="register-producer register-user">
        <div className="register-producer__back"><BackButton to="/selecionar-perfil" /></div>
        <div className="register-producer__shell">
          <aside className="register-producer__presentation">
            <span className="register-producer__presentation-mark"><Sprout size={24} /></span>
            <div>
              <p className="register-producer__eyebrow">PARA QUEM ASSINA</p>
              <h1>Frescor da horta direto para sua casa.</h1>
              <p className="register-producer__description">Crie sua conta para descobrir hortas locais e receber cestas de frutas e verduras do seu jeito.</p>
            </div>
            <ul className="register-producer__benefits">
              <li><span><PackageCheck size={18} /></span> Cestas personalizadas</li>
              <li><span><Users size={18} /></span> Produtores locais de confiança</li>
              <li><span><Sprout size={18} /></span> Produtos frescos toda semana</li>
            </ul>
            <div className="register-producer__numbers" aria-label="Benefícios para clientes">
              <div><strong>+30</strong><span>hortas parceiras</span></div>
              <div><strong>100%</strong><span>produtos selecionados</span></div>
            </div>
          </aside>

          <section className="register-producer__card">
            <header>
              <img src={logo} alt="Hort" className="register-producer__card-logo" />
              <h2>Crie sua conta</h2>
              <p>Prepare-se para produtos frescos e saudáveis.</p>
            </header>
            <form className="register-producer__form" noValidate onSubmit={handleSubmit}>
                <InputForm
                    type="text"
                    placeholder="Nome Completo"
                    className="input"
                    label="Nome Completo"
                    icon={userIcon}
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name}
                    autoComplete="name"
                />
                <InputForm
                    type="email"
                    placeholder="Email"
                    className="input"
                    label="Email"
                    icon={emailIcon}
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    error={errors.email}
                    autoComplete="email"
                />
                <InputForm
                    type="text"
                    placeholder="Telefone"
                    className="input"
                    label="Telefone"
                    icon={telephoneIcon}
                    id="phone"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    autoComplete="tel"
                    inputMode="tel"
                />
                <InputForm
                    type="password"
                    placeholder="Senha"
                    className="input"
                    label="Senha"
                    icon={senhaIcon}
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    error={errors.password}
                    autoComplete="new-password"
                />
                <InputForm
                    type="password"
                    placeholder="Confirmar Senha"
                    className="input"
                    label="Confirmar Senha"
                    icon={senhaIcon}
                    id="confirm-password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    autoComplete="new-password"
                />
                <label htmlFor="terms" className="register-producer__terms">
                    <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        className="checkbox"
                        checked={values.terms}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.terms)}
                        aria-describedby={errors.terms ? 'terms-error' : undefined}
                    />
                    <span>Eu concordo com os <strong>termos e condições</strong></span>
                </label>
                {errors.terms && <p id="terms-error" className="producer-form-error">{errors.terms}</p>}
                {submissionError && <p className="producer-form-error" role="alert">{submissionError}</p>}
                <div className="register-producer__submit"><StartButton title="Criar minha conta" type="submit" /></div>
                <div className="register-producer__social-divider">
                    <span /> <p>Ou continue com</p> <span />
                </div>
                <LoginOther />
                <p className="register-producer__security"><ShieldCheck size={15} /> Seus dados são protegidos e usados apenas para sua conta.</p>
            </form>
          </section>
        </div>
        {isValidated && (
          <div className="success-modal-backdrop" role="presentation">
            <section className="success-modal" role="dialog" aria-modal="true" aria-labelledby="success-title">
              <div className="success-icon" aria-hidden="true">✓</div>
              <h2 id="success-title">Cadastro realizado com sucesso!</h2>
              <p>Você será direcionado para a página inicial.</p>
            </section>
          </div>
        )}
    </main>
    
  );
}
