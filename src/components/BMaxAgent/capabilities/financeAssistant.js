import purchaseHistory from "../../data/purchaseHistory.json";

export default function financeAssistant(state, setState) {
  const total = purchaseHistory.reduce((sum, item) => sum + item.price, 0);

  const monthly = purchaseHistory.reduce((acc, item) => {
    const month = item.date.split("-")[1];
    acc[month] = (acc[month] || 0) + item.price;
    return acc;
  }, {});

  const analysis = {
    totalSpend: total,
    monthlyBreakdown: monthly,
    avgMonthly: total / Object.keys(monthly).length
  };

  setState(prev => ({
    ...prev,
    spendAnalysis: analysis
  }));

  return analysis;
}
