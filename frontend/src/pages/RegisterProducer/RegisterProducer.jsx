import logo from '../../assets/icons/logo.png';
import './style.css';
import InputForm from '../../components/InputForm/InputForm';
import userIcon from '../../assets/icons/user-icon.png';
import buildingIcon from '../../assets/icons/building-icon.png';
import StartButton from '../../components/StartButton/StartButtom';
import LoginOther from '../../components/LoginOther/LoginOther';
import emailIcon from '../../assets/icons/email-icon.png';
import telephoneIcon from '../../assets/icons/telefone.png';
import senhaIcon from '../../assets/icons/senha.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/authStorage';
import BackButton from '../../components/BackButton/BackButton';

export default function RegisterProducer() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries());

    if (!values.name || !values.cnpj || !values.email || !values.phone || !values.password || !values.confirmPassword) {
      setMessage('Preencha todos os campos para continuar.');
      return;
    }

    if (values.password !== values.confirmPassword) {
      setMessage('As senhas não coincidem.');
      return;
    }

    if (!data.get('terms')) {
      setMessage('Aceite os termos e condições para continuar.');
      return;
    }

    try {
      await registerUser({ ...values, role: 'producer' });
      navigate('/login');
    } catch (error) {
      setMessage(error.message || 'Não foi possível concluir o cadastro.');
    }
  };

  return (
    <main className="register-producer">
        <BackButton to="/selecionar-perfil" />
        <img src={logo} alt="Logo" className="img-logo" />

        <div className="container">
            <h1 className="title">Crie sua Conta</h1>
            <p className="subtitle">Prepare-se para produtos frescos e saudáveis</p>
            <form className="form" onSubmit={handleSubmit}>
                <InputForm
                    type="text"
                    placeholder="Nome Completo"
                    className="input"
                    label="Nome Completo"
                    icon={userIcon}
                    name="name"
                />
                <InputForm
                    type="text"
                    placeholder="CNPJ do seu negócio"
                    className="input"
                    label="CNPJ do seu negócio"
                    icon={buildingIcon}
                    name="cnpj"
                />
                <InputForm
                    type="email"
                    placeholder="Email"
                    className="input"
                    label="Email"
                    icon={emailIcon}
                    name="email"
                />
                <InputForm
                    type="text"
                    placeholder="Telefone"
                    className="input"
                    label="Telefone"
                    icon={telephoneIcon}
                    name="phone"
                />
                <InputForm
                    type="password"
                    placeholder="Senha"
                    className="input"
                    label="Senha"
                    icon={senhaIcon}
                    name="password"
                />
                <InputForm
                    type="password"
                    placeholder="Confirmar Senha"
                    className="input"
                    label="Confirmar Senha"
                    icon={senhaIcon}
                    name="confirmPassword"
                />
                <input type="checkbox" id="terms" name="terms" className="checkbox" />
                <label htmlFor="terms" className="checkbox-label">Eu concordo com os <span>termos e condições</span></label>
                {message && <p className="producer-form-error" role="alert">{message}</p>}
                <StartButton title={'Registrar'} type="submit" />
                <div className="login-others">
                    <hr />
                    <p className="login-others-text"> Ou continue com</p>
                    <hr/>
        
                </div>
                <LoginOther />
            </form>
        </div>  
    </main>
    
  );
}
