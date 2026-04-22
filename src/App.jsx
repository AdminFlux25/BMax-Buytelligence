import React, { useMemo, useState } from "react";
import { products } from "./data/products";
import ProductCard from "./components/ProductCard";
import CartDrawer from "./components/CartDrawer";
import { useCart } from "./context/CartContext";
import "./styles.css";
import AIAssistant from "./components/AIAssistant";
import SmartRecommendations from "./components/SmartRecommendations";
import BaymaxSmartPanel from "./components/BaymaxSmartPanel";
import CopilotOverlay from "./components/CopilotOverlay";
import CopilotBubble from "./components/CopilotBubble";
import Carousel from "./components/Carousel";
import CategoryGrid from "./components/CategoryGrid";
import DashboardOverlay from "./components/DashboardOverlay";
import AgentModal from "./components/AgentModal";
import BaymaxThinking from "./components/BaymaxThinking";

export default function App() {
  const { totalQty } = useCart();
  const [openCart, setOpenCart] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const [showCopilot, setShowCopilot] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [agentModalOpen, setAgentModalOpen] = useState(false);
  const [agentData, setAgentData] = useState(null);
  const [isThinking, setIsThinking] = useState(false);




  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchCategory = category === "All" || p.category === category;
      const matchQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
  }, [query, category]);


  return (
    <div className="page">
      <header className="header">
        <div className="brand">
          <div className="logo">🛒</div>
          <div>
            <div className="brandName">Buytelligence</div>
            <div className="brandTag">Because apparently everything needs AI now.</div>
          </div>
        </div>

        <div className="actions">
          <div className="searchWrap">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <button className="cartBtn" onClick={() => setOpenCart(true)}>
            Cart <span className="pill">{totalQty}</span>
          </button>
        </div>
      </header>
      <div className="main-layout">
        <BaymaxSmartPanel onActivate={() => setShowCopilot(true)} onOpenDashboard={() => setShowDashboard(true)}  onAgentResponse={(data) => {
    setIsThinking(false);
    setAgentData(data);
    setAgentModalOpen(true);
  }}
  setThinking={setIsThinking}/>
        {showDashboard && (
          <DashboardOverlay onClose={() => setShowDashboard(false)} />
        )}
        <AgentModal
  open={agentModalOpen}
  data={agentData}
  onClose={() => setAgentModalOpen(false)}
  onAddCart={(items) => {
    items.forEach(addToCart);
    setAgentModalOpen(false);
  }}
/>
{isThinking && <BaymaxThinking />}
        <main className="main">

          <Carousel />
          <CategoryGrid />
          <div className="toolbar">
            <h1>Products</h1>
            <span className="muted">
              Showing <b>{filtered.length}</b> items
            </span>
          </div>

          <section className="grid">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </section>
        </main>
        {/* <AIAssistant /> */}
        <CopilotOverlay
          open={showCopilot}
          onClose={() => {
            setShowCopilot(false);
            setShowBubble(true);
          }}
        />
        <CopilotBubble
          open={showBubble}
          onClick={() => {
            setShowBubble(false);
            setShowCopilot(true);
          }}
        />


      </div>
      <footer className="footer">
        <span>© {new Date().getFullYear()} AI‑powered demo. The hype is real, the store is not.</span>
      </footer>

      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />
    </div>
  );
}