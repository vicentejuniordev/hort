import './style.css';
import facebookIcon from '../../assets/icons/facebook.png';
import googleIcon from '../../assets/icons/google.png';
import twitterIcon from '../../assets/icons/twitter.png';

export default function LoginOther() {
  return (
    <div className="login-others-container">
        <div className="login-others-box">
            <img src={facebookIcon} alt="Facebook" />
        </div>
        <div className="login-others-box">
            <img src={googleIcon} alt="Google" />
        </div>
        <div className="login-others-box">
            <img src={twitterIcon} alt="Twitter" />
        </div>
    </div>
  );
}