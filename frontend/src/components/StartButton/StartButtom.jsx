import './style.css';


export default function StartButton({title, backgroundColor, textColor, onClick}) {
  return (
    <button style={{ backgroundColor: backgroundColor, color: textColor }} className="start-button" onClick={onClick}>
      {title}
    </button>
  );
};

