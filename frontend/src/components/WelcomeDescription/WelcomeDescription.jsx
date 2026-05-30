import "./style.css";

export default function WelcomeDescription({title}) {
  return (
    <div className="welcome-description">
        <p className="description-text">{title}</p>
    </div>
  );
}