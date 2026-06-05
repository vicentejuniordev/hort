import { Sprout, Apple, Leaf } from "lucide-react";
import CategoryButton from "../../components/CategoryButton/CategoryButton";
import "./style.css";

export default function CategoryList({
  activeCategory,
  setActiveCategory,
}) {
  const categories = [
    {
      label: "Hortas",
      value: "hortas",
      icon: Sprout,
    },
    {
      label: "Hortifruits",
      value: "hortifruits",
      icon: Apple,
    },
    {
      label: "Orgânicos",
      value: "organicos",
      icon: Leaf,
    },
  ];

  return (
    <div className="category-list">
      {categories.map((category) => (
        <CategoryButton
          key={category.value}
          label={category.label}
          value={category.value}
          icon={category.icon}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      ))}
    </div>
  );
}