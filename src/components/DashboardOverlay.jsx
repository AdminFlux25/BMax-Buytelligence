import React from "react";
import "../DashboardOverlay.css";

export default function DashboardOverlay({ onClose }) {
  return (
    <div className="overlay-bg">
      <div className="overlay-container">

        <div className="overlay-header">
          <h2>Spending Dashboard</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="grid-4">
          
          {/* 1. Pie Chart – Spend by Profile */}
          <div className="panel-card">
            <h3>Spend by Profile (3 Months)</h3>
            <div className="pie-chart">
              <div className="pie-slice slice1"></div>
              <div className="pie-slice slice2"></div>
              <div className="pie-slice slice3"></div>
            </div>
            <div className="legend">
              <span><span className="dot red"></span> Hiro</span>
              <span><span className="dot yellow"></span> Tadashi </span>
              <span><span className="dot blue"></span> Cass</span>
            </div>
          </div>

          {/* 2. Bar Graph – Spend by Category */}
          <div className="panel-card">
            <h3>Spend by Category</h3>
            <div className="bar-graph">
              <div className="bar" style={{ height: "70%" }}><label>Groceries</label></div>
              <div className="bar" style={{ height: "55%" }}><label>Dining</label></div>
              <div className="bar" style={{ height: "40%" }}><label>Transport</label></div>
              <div className="bar" style={{ height: "30%" }}><label>Subscriptions</label></div>
              <div className="bar" style={{ height: "50%" }}><label>Household</label></div>
            </div>
          </div>

          {/* 3. Line Graph – 6‑Month Trend */}
          <div className="panel-card">
            <h3>Overall Spending Trend (6 Months)</h3>
            <div className="line-graph">
              <div className="trend-point" style={{ left: "5%", bottom: "40%" }}></div>
              <div className="trend-point" style={{ left: "25%", bottom: "55%" }}></div>
              <div className="trend-point" style={{ left: "45%", bottom: "65%" }}></div>
              <div className="trend-point" style={{ left: "65%", bottom: "50%" }}></div>
              <div className="trend-point" style={{ left: "85%", bottom: "70%" }}></div>
              <div className="trend-line"></div>
            </div>
          </div>

          {/* 4. My Choice – Top 5 Merchants */}
          <div className="panel-card">
            <h3>Top 5 Merchants (3 Months)</h3>
            <div className="merchant-list">
              <div className="merchant-row"><span>NTUC FairPrice</span><span>$420</span></div>
              <div className="merchant-row"><span>Grab / GrabFood</span><span>$310</span></div>
              <div className="merchant-row"><span>Amazon SG</span><span>$260</span></div>
              <div className="merchant-row"><span>Sheng Siong</span><span>$180</span></div>
              <div className="merchant-row"><span>StarHub</span><span>$120</span></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
