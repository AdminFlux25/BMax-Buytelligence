import stockLevels from "../../data/stockLevels.json";

export default function predictiveService(state, setState) {
  const lowStock = stockLevels.filter(item => item.stock < 5);

  const alerts = lowStock.map(item => ({
    type: "stock-warning",
    message: `${item.name} is running low. Consider alternatives.`
  }));

  setState(prev => ({
    ...prev,
    alerts: [...prev.alerts, ...alerts]
  }));

  return alerts;
}
