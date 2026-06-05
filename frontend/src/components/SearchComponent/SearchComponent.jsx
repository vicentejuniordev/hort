import './style.css';

import SearchIcon from '../../assets/icons/procurar.png';
export default function SearchComponent() {
    return (
        <div className="search-container">
            <img src={SearchIcon} alt="Search" className="search-icon" />
            <input
                type="text"
                placeholder="Buscar hortas, horticultura e mais..."
                className="search-input"
            />
        </div>
    );
}