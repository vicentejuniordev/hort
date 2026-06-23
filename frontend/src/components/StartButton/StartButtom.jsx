import './style.css';


export default function StartButton({title, backgroundColor, textColor, onClick, type = 'button'}) {
  return (
    <button type={type} style={{ backgroundColor: backgroundColor, color: textColor }} className="start-button" onClick={onClick}>
      {title}
    </button>
  );
};
