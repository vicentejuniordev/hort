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
    <main className="register-user">
        <BackButton to="/selecionar-perfil" />
        <img src={logo} alt="Logo HORT" className="img-logo" />

        <div className="container">
            <h1 className="title">Crie sua Conta</h1>
            <p className="subtitle">Prepare-se para produtos frescos e saudáveis</p>
            <form className="form" noValidate onSubmit={handleSubmit}>
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
                <label htmlFor="terms" className="terms">
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
                    <span className="checkbox-label">Eu concordo com os <span>termos e condições</span></span>
                </label>
                {errors.terms && <span id="terms-error" className="terms-error">{errors.terms}</span>}
                <StartButton title="Registrar" type="submit" />
                {submissionError && <p className="form-error" role="alert">{submissionError}</p>}
                <div className="login-others">
                    <hr />
                    <p className="login-others-text"> Ou continue com</p>
                    <hr/>
        
                </div>
                <LoginOther />
            </form>
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
