import purchaseHistory from "../../data/purchaseHistory.json";

export default function intelligentOrdering(state, setState) {
  const recent = purchaseHistory.slice(-50);

  const predicted = recent
    .filter(item => item.frequency >= 2)
    .map(item => ({
      name: item.name,
      reason: "Frequently purchased",
      nextBuy: item.nextBuyDate,
      category: item.category
    }));

  setState(prev => ({
    ...prev,
    recommendations: predicted
  }));

  return predicted;
}
