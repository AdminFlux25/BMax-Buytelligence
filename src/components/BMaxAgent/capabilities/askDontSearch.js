import productDB from "../../data/products.json";

export default function askDontSearch(state, setState, { query }) {
  const q = query.toLowerCase();

  const match = productDB.filter(
    p =>
      p.name.toLowerCase().includes(q) ||
      p.tags?.some(t => t.toLowerCase().includes(q))
  );

  setState(prev => ({
    ...prev,
    recommendations: match
  }));

  return match;
}
