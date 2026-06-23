import BasketCard from "../BasketCard/BasketCard";
import "./style.css";

export default function BasketList({
  baskets,
  onPause,
  onDelete,
  onEdit,
}) {
  return (
    <div className="basket-list">
      {baskets.map((basket) => (
        <BasketCard
          key={basket.id}
          basket={basket}
          onPause={onPause}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
