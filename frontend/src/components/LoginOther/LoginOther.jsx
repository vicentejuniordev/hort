import './style.css';
import facebookIcon from '../../assets/icons/facebook.png';
import googleIcon from '../../assets/icons/google.png';

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
            <svg className="x-social-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M18.9 2H22l-6.77 7.73L23.2 22h-6.24l-4.89-6.4L6.47 22H3.36l7.24-8.28L2.95 2h6.4l4.42 5.84L18.9 2Zm-1.09 18h1.72L8.42 3.9H6.58L17.81 20Z" />
            </svg>
        </div>
    </div>
  );
}
