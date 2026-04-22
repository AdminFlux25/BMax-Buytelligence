export default function AgentModal({ open, data, onClose, onAddCart }) {
  if (!open) return null;

  const hasCartItems = data?.cartItems?.length > 0;

  return (
    <div className="agent-overlay" onClick={onClose}>
      <div className="agent-modal" onClick={(e) => e.stopPropagation()}>
        
        <div className="agent-title">Buytelligence Says</div>

        <div className="agent-content">
          {data?.text && <p>{data.text}</p>}

          {hasCartItems && (
            <div className="cart-preview">
              {data.cartItems.map((item, i) => (
                <div key={i} className="cart-item">
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {hasCartItems && (
          <button
            className="add-cart-btn"
            onClick={() => onAddCart(data.cartItems)}
          >
            Add Items to Cart
          </button>
        )}

        <div className="agent-close" onClick={onClose}>
          Close
        </div>
      </div>
    </div>
  );
}
