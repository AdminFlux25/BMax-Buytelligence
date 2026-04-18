import purchaseHistory from "../../data/purchaseHistory.json";

export default function smartRefill(state, setState) {
  const now = new Date();

  const due = purchaseHistory.filter(item => {
    const next = new Date(item.nextBuyDate);
    return next <= now;
  });

  setState(prev => ({
    ...prev,
    alerts: [...prev.alerts, ...due.map(d => ({
      type: "refill",
      message: `Time to restock ${d.name}`
    }))],
    recommendations: due
  }));

  return due;
}
