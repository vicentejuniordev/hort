import './style.css';

import SearchIcon from '../../assets/icons/procurar.png';
export default function SearchComponent({ value, onChange, placeholder = 'Buscar hortas, horticultura e mais...', style }) {
  return (
        <div className="search-container" role="search" style={style}>
            <img src={SearchIcon} alt="" className="search-icon" />
            <input
                type="text"
                placeholder={placeholder}
                className="search-input"
                value={onChange ? value ?? '' : undefined}
                onChange={onChange}
                aria-label={placeholder}
            />
        </div>
    );
}
