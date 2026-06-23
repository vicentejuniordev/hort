import './style.css';


export default function InputForm({
  type,
  placeholder,
  className,
  label,
  icon,
  id,
  name,
  value,
  onChange,
  error,
  autoComplete,
  inputMode,
}) {
  return (
    <div className="input-container">
        <label htmlFor={id}>{label}</label>
      <div className="input-box">
        <img src={icon} alt="Icon" />
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          className={className}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </div>
      {error && <span id={`${id}-error`} className="input-error">{error}</span>}
    </div>
  );
}
