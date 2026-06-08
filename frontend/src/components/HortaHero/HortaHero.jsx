import { Star, MapPin, Check, Sparkles } from "lucide-react";
import "./style.css";

export default function HortaHero({ horta }) {
  return (
    <section className="horta-hero">
      <div className="horta-hero-background">
        <div className="horta-hero-pattern" />
      </div>

      <div className="horta-hero-card">
        <div className="horta-hero-main">
          <div className="horta-image-wrapper">
            <img src={horta.image} alt={horta.name} />
            <span>{horta.distance}</span>
          </div>

          <div className="horta-hero-info">
            <h1>{horta.name}</h1>

            <div className="horta-rating">
              <div>
                <Star className="star-icon" />
                <strong>{horta.rating}</strong>
              </div>

              <span>({horta.reviews} avaliações)</span>
            </div>

            <div className="horta-address">
              <MapPin className="address-icon" />
              <span>{horta.address}</span>
            </div>
          </div>
        </div>

        <div className="horta-badges">
          <span className="badge green">
            <Check className="badge-icon" />
            Orgânicos
          </span>

          <span className="badge blue">
            <Sparkles className="badge-icon" />
            Qualidade Premium
          </span>

          <span className="badge purple">
            Entrega Rápida
          </span>
        </div>
      </div>
    </section>
  );
}