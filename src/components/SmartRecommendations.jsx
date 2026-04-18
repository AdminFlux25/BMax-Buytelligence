import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export default function SmartRecommendations() {
  const { cartItems } = useCart();
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    // Mock AI logic for demo
    const sample = [
      { id: 101, name: "Wireless Earbuds", price: 59, img: "/products/earbuds.jpg" },
      { id: 102, name: "Smartwatch Lite", price: 129, img: "/products/watch.jpg" },
      { id: 103, name: "Portable Speaker", price: 39, img: "/products/speaker.jpg" }
    ];

    setTimeout(() => setRecs(sample), 600); // Simulate AI delay
  }, [cartItems]);

  return (
    <div className="smart-recs">
      <div className="smart-recs-header">
        <span className="baymax-dot"></span>
        Recommended for you
      </div>

      <div className="smart-recs-grid">
        {recs.map((p) => (
          <div key={p.id} className="smart-recs-card">
            <img src={p.img} alt={p.name} />
            <div className="smart-recs-name">{p.name}</div>
            <div className="smart-recs-price">${p.price}</div>
          </div>
        ))}
      </div>

     <button className="smart-recs-ask"
  onClick={() => document.getElementById("copilot-wrapper").style.display = "block"}
>
  Ask Baymax for more
</button>

    </div>
  );
}
