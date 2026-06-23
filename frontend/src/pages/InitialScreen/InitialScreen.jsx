import {useNavigate} from "react-router-dom";
import logoHort from "../../assets/icons/logo.png";
import CustomButton from "../../components/StartButton/StartButtom";
import WelcomeDescription from "../../components/WelcomeDescription/WelcomeDescription";
import LoginOther from "../../components/LoginOther/LoginOther";
import "./styles.css";

export default function InitialScreen() {
  const navigate = useNavigate();

  return (
    <div className="initial-screen">
      <img className="logo" src={logoHort} alt="Logo Hort" />
      <div className="text-container">
        <h1 className="welcome-tittle">Seja bem-vindo(a) ao Hort</h1>
        <p className="welcome-subtitle">Assinatura de cestas de frutas <br />e verduras frescas todo mês.</p>
      </div>
      <div className="about-items">
        <div className="about-section-one">
            <WelcomeDescription title="Assinatura de cestas." />
            <WelcomeDescription title="Frutas e verduras Frescas" />
        </div>
        <div className="about-section-two">
            <WelcomeDescription title="Cestas personalizadas." />
        </div>
        
      </div>
      <div className="cta-button">
        <CustomButton  title="Criar Conta" backgroundColor="#30aa4c" textColor="#fff" onClick={() => navigate('/selecionar-perfil')} />
      </div>
        <button onClick={() => navigate('/login')} className="login">Já tem uma conta? <span className="login-link"> Faça Login</span></button>

      <div className="login-others">
        <hr />
        <p className="login-others-text"> Ou continue com</p>
        <hr/>
        
      </div>
      <LoginOther />

    </div>
  );
}