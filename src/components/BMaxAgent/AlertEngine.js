import stockLevels from "../../data/stockLevels.json";
import purchaseHistory from "../../data/purchaseHistory.json";
import userGoals from "../../data/userGoals.json";

export default class AlertEngine {
  constructor(state, setState) {
    this.state = state;
    this.setState = setState;
  }

  dispatch(alert) {
    this.setState(prev => ({
      ...prev,
      alerts: [...prev.alerts, alert]
    }));
  }

  // 1) Low Stock Alerts
  checkLowStock() {
    const low = stockLevels.filter(item => item.stock < 3);

    low.forEach(item => {
      this.dispatch({
        type: "low-stock",
        message: `${item.name} is running low`,
        severity: "warning"
      });
    });
  }

  // 2) Refill Alerts
  checkRefillDue() {
    const now = new Date();

    const due = purchaseHistory.filter(item => {
      const next = new Date(item.nextBuyDate);
      return next <= now;
    });

    due.forEach(item => {
      this.dispatch({
        type: "refill",
        message: `Time to restock ${item.name}`,
        severity: "info"
      });
    });
  }

  // 3) Budget Alerts
  checkBudget() {
    const monthlyLimit = userGoals.budgetLimit;
    const spent = purchaseHistory.reduce((sum, item) => sum + item.price, 0);

    if (spent > monthlyLimit) {
      this.dispatch({
        type: "budget",
        message: `You've exceeded your monthly budget`,
        severity: "danger"
      });
    }
  }

  // Run all predictive checks
  runAll() {
    this.checkLowStock();
    this.checkRefillDue();
    this.checkBudget();
  }
}
