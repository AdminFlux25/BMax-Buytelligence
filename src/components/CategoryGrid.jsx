import { categories } from "../data/categories";

export default function CategoryGrid() {
  return (
    <div className="category-grid">
      {categories.map((cat) => (
        <div key={cat.id} className="category-item">
          <img src={cat.icon} alt={cat.label} />
          <p>{cat.label}</p>
        </div>
      ))}
    </div>
  );
}
