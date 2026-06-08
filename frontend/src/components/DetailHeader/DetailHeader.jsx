import { ArrowLeft, Heart, Share2 } from "lucide-react";
import "./style.css";

export default function DetailHeader({
  isFavorite,
  onBack,
  onToggleFavorite,
  onShare,
}) {
  return (
    <header className="detail-header">
      <button
        className="header-button"
        onClick={onBack}
      >
        <ArrowLeft className="header-icon" />
      </button>

      <div className="header-actions">
        <button
          className="header-button"
          onClick={onToggleFavorite}
        >
          <Heart
            className={`header-icon favorite-icon ${
              isFavorite ? "favorite-active" : ""
            }`}
          />
        </button>

        <button
          className="header-button"
          onClick={onShare}
        >
          <Share2 className="header-icon" />
        </button>
      </div>
    </header>
  );
}