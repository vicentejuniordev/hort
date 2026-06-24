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
import { PackageCheck, ShieldCheck, Sprout, Users } from 'lucide-react';

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
        <div className="register-producer__back"><BackButton to="/selecionar-perfil" /></div>
        <div className="register-producer__shell">
          <aside className="register-producer__presentation">
            <span className="register-producer__presentation-mark"><Sprout size={24} /></span>
            <div>
              <p className="register-producer__eyebrow">PARA QUEM PRODUZ</p>
              <h1>Leve sua horta para mais pessoas.</h1>
              <p className="register-producer__description">Crie sua conta de produtor e organize planos, produtos e entregas em um único lugar.</p>
            </div>
            <ul className="register-producer__benefits">
              <li><span><Users size={18} /></span> Alcance novos clientes</li>
              <li><span><PackageCheck size={18} /></span> Gerencie planos e produtos</li>
              <li><span><Sprout size={18} /></span> Valorize sua produção local</li>
            </ul>
            <div className="register-producer__numbers" aria-label="Benefícios para produtores">
              <div><strong>+1.200</strong><span>clientes na plataforma</span></div>
              <div><strong>100%</strong><span>gestão no seu ritmo</span></div>
            </div>
          </aside>

          <section className="register-producer__card">
            <header>
              <img src={logo} alt="Hort" className="register-producer__card-logo" />
              <h2>Crie sua conta</h2>
              <p>Cadastre os dados da sua horta para começar.</p>
            </header>
            <form className="register-producer__form" onSubmit={handleSubmit}>
                <InputForm
                    type="text"
                    placeholder="Nome Completo"
                    className="input"
                    label="Nome Completo"
                    icon={userIcon}
                    name="name"
                    id="producer-name"
                />
                <InputForm
                    type="text"
                    placeholder="CNPJ do seu negócio"
                    className="input"
                    label="CNPJ do seu negócio"
                    icon={buildingIcon}
                    name="cnpj"
                    id="producer-cnpj"
                />
                <InputForm
                    type="email"
                    placeholder="Email"
                    className="input"
                    label="Email"
                    icon={emailIcon}
                    name="email"
                    id="producer-email"
                />
                <InputForm
                    type="text"
                    placeholder="Telefone"
                    className="input"
                    label="Telefone"
                    icon={telephoneIcon}
                    name="phone"
                    id="producer-phone"
                />
                <InputForm
                    type="password"
                    placeholder="Senha"
                    className="input"
                    label="Senha"
                    icon={senhaIcon}
                    name="password"
                    id="producer-password"
                />
                <InputForm
                    type="password"
                    placeholder="Confirmar Senha"
                    className="input"
                    label="Confirmar Senha"
                    icon={senhaIcon}
                    name="confirmPassword"
                    id="producer-confirm-password"
                />
                <label htmlFor="terms" className="register-producer__terms"><input type="checkbox" id="terms" name="terms" /> <span>Eu concordo com os <strong>termos e condições</strong></span></label>
                {message && <p className="producer-form-error" role="alert">{message}</p>}
                <div className="register-producer__submit"><StartButton title="Criar conta de produtor" type="submit" /></div>
                <div className="register-producer__social-divider">
                    <span /> <p>Ou continue com</p> <span />
                </div>
                <LoginOther />
                <p className="register-producer__security"><ShieldCheck size={15} /> Seus dados são protegidos e usados apenas para sua conta.</p>
            </form>
          </section>
        </div>
    </main>
    
  );
}
