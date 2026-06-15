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
      <button className="detail-header-button" onClick={onBack}>
        <ArrowLeft className="detail-header-icon" />
      </button>

      <div className="detail-header-actions">
        <button className="detail-header-button" onClick={onToggleFavorite}>
          <Heart
            className={`detail-header-icon ${
              isFavorite ? "favorite-active" : ""
            }`}
          />
        </button>

        <button className="detail-header-button" onClick={onShare}>
          <Share2 className="detail-header-icon" />
        </button>
      </div>
    </header>
  );
}