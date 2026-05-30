import './style.css';


export default function StartButton({title, backgroundColor, textColor}) {
  return (
    <button style={{ backgroundColor: backgroundColor, color: textColor }} className="start-button">
      {title}
    </button>
  );
};

