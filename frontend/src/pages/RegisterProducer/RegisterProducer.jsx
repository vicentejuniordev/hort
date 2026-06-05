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

export default function RegisterProducer() {
  return (
    <>
        <img src={logo} alt="Logo" className="img-logo" />

        <div className="container">
            <h1 className="title">Crie sua Conta</h1>
            <p className="subtitle">Prepare-se para produtos frescos e saudáveis</p>
            <form className="form">
                <InputForm
                    type="text"
                    placeholder="Nome Completo"
                    className="input"
                    label="Nome Completo"
                    icon={userIcon}
                />
                <InputForm
                    type="text"
                    placeholder="CNPJ do seu negócio"
                    className="input"
                    label="CNPJ do seu negócio"
                    icon={buildingIcon}
                />
                <InputForm
                    type="email"
                    placeholder="Email"
                    className="input"
                    label="Email"
                    icon={emailIcon}
                />
                <InputForm
                    type="text"
                    placeholder="Telefone"
                    className="input"
                    label="Telefone"
                    icon={telephoneIcon}
                />
                <InputForm
                    type="password"
                    placeholder="Senha"
                    className="input"
                    label="Senha"
                    icon={senhaIcon}
                />
                <InputForm
                    type="password"
                    placeholder="Confirmar Senha"
                    className="input"
                    label="Confirmar Senha"
                    icon={senhaIcon}
                />
                <input type="checkbox" id="terms" name="terms" className="checkbox" />
                <label htmlFor="terms" className="checkbox-label">Eu concordo com os <span>termos e condições</span></label>
                <StartButton title={'Registrar'} />
                <div className="login-others">
                    <hr />
                    <p className="login-others-text"> Ou continue com</p>
                    <hr/>
        
                </div>
                <LoginOther />
            </form>
        </div>  
    </>
    
  );
}