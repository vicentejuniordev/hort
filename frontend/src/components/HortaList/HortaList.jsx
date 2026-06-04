import HortaCard from "../../components/HortaCard/HortaCard";
import "./style.css";

export default function HortaList({
  hortas,
  toggleFavorite,
}) {
  return (
    <div className="horta-list">
      {hortas.map((horta) => (
        <HortaCard
          key={horta.id}
          horta={horta}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}