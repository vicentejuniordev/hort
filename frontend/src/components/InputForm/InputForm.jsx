import './style.css';


export default function InputForm({ type, placeholder, className, label, icon }) {
  return (
    <div className="input-container">
        <label>{label}</label>
      <div className="input-box">
        <img src={icon} alt="Icon" />
        <input type={type} placeholder={placeholder} className={className} />
      </div>
    </div>
  );
}