import stockLevels from "../../data/stockLevels.json";
import purchaseHistory from "../../data/purchaseHistory.json";

export default function stockAwareness(state, setState) {
  const frequent = purchaseHistory.filter(i => i.frequency >= 3);

  const alerts = frequent
    .filter(item => {
      const stock = stockLevels.find(s => s.id === item.id);
      return stock && stock.stock < 3;
    })
    .map(item => ({
      type: "low-stock",
      message: `${item.name} is almost out of stock`
    }));

  setState(prev => ({
    ...prev,
    alerts: [...prev.alerts, ...alerts]
  }));

  return alerts;
}
