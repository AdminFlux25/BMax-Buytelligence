import React, { useMemo } from "react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function CartDrawer({ open, onClose }) {
    const { cartItems, removeItem, setQty, clear } = useCart();

    const lines = useMemo(() => {
        return cartItems
            .map((ci) => {
                const p = products.find((x) => x.id === ci.id);
                if (!p) return null;
                return { ...p, qty: ci.qty, lineTotal: p.price * ci.qty };
            })
            .filter(Boolean);
    }, [cartItems]);

    const subtotal = lines.reduce((sum, x) => sum + x.lineTotal, 0);
    const shipping = lines.length ? 4.99 : 0;
    const tax = lines.length ? subtotal * 0.08 : 0; // demo tax
    const total = subtotal + shipping + tax;

    return (
        <div className={`drawerOverlay ${open ? "show" : ""}`} onClick={onClose}>
            <div className="drawer" onClick={(e) => e.stopPropagation()}>
                <div className="drawerHeader">
                    <h2>Your Cart</h2>
                    <button className="iconBtn" onClick={onClose} aria-label="Close cart">
                        ✕
                    </button>
                </div>

                {!lines.length ? (
                    <div className="empty">
                        <p>Your cart is empty.</p>
                        <button className="btnSecondary" onClick={onClose}>
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="cartList">
                            {lines.map((item) => (
                                <div className="cartItem" key={item.id}>
                                    <img src={item.image} alt={item.name} />
                                    <div className="cartInfo">
                                        <div className="cartTitle">{item.name}</div>
                                        <div className="cartMeta">
                                            <span>${item.price.toFixed(2)}</span>
                                            <span className="dot">•</span>
                                            <span className="muted">{item.category}</span>
                                        </div>

                                        <div className="qtyRow">
                                            <label className="muted">Qty</label>
                                            <input
                                                type="number"
                                                min="1"
                                                max="99"
                                                value={item.qty}
                                                onChange={(e) => setQty(item.id, e.target.value)}
                                            />
                                            <button className="linkDanger" onClick={() => removeItem(item.id)}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>

                                    <div className="lineTotal">${item.lineTotal.toFixed(2)}</div>
                                </div>
                            ))}
                        </div>

                        <div className="summary">
                            <div className="row">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="row">
                                <span>Shipping</span>
                                <span>${shipping.toFixed(2)}</span>
                            </div>
                            <div className="row">
                                <span>Tax (demo)</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="row total">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>

                            <div className="summaryBtns">
                                <button className="btnSecondary" onClick={clear}>
                                    Clear Cart
                                </button>
                                <button
                                    className="btn"
                                    onClick={() => alert("Demo checkout ✅ (no payment / no DB)")}
                                >
                                    Checkout
                                </button>
                            </div>
                            <p className="tiny muted">
                                Demo only. No database, no payment gateway.
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}