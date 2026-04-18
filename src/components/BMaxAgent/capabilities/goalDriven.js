import userGoals from "../../data/userGoals.json";
import productDB from "../../data/products.json";

export default function goalDriven(state, setState) {
  const { goals } = userGoals;

  const flagged = productDB.filter(p =>
    goals.some(g => p.tags?.includes(g.conflictTag))
  );

  const alerts = flagged.map(f => ({
    type: "goal-warning",
    message: `${f.name} may not align with your ${goals[0].name} goal`
  }));

  setState(prev => ({
    ...prev,
    alerts: [...prev.alerts, ...alerts]
  }));

  return alerts;
}
