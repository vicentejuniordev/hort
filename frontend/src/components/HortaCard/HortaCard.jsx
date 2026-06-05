import { Link } from "react-router-dom";
import { Heart, Sprout } from "lucide-react";
import "./style.css";

export default function HortaCard({
  horta,
  toggleFavorite,
}) {
  return (
    <Link
      to={`/horta/${horta.id}`}
      className="horta-card"
    >
      <div className="horta-card-content">

        <div className="horta-image-container">
          <img
            src={horta.image}
            alt={horta.name}
            className="horta-image"
          />
        </div>

        <div className="horta-info">
          <div className="horta-title-container">
            <Sprout className="horta-icon" />

            <h3 className="horta-title">
              {horta.name}
            </h3>
          </div>

          <p className="horta-description">
            Produtos orgânicos frescos
          </p>
        </div>

        <button
          className="favorite-button"
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(horta.id);
          }}
          aria-label={
            horta.isFavorite
              ? "Remover dos favoritos"
              : "Adicionar aos favoritos"
          }
        >
          <Heart
            className={`favorite-icon ${
              horta.isFavorite
                ? "favorite-active"
                : ""
            }`}
          />
        </button>

      </div>
    </Link>
  );
}