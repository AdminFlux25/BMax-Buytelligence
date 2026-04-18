import React, { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    // Load raw value from localStorage
    const [rawCart, setRawCart] = useLocalStorage("demo_cart", []);

    // Guarantee array
    const cartItems = Array.isArray(rawCart) ? rawCart : [];

    const api = useMemo(() => {
        function addItem(id, qty = 1) {
            setRawCart((prev) => {
                const safePrev = Array.isArray(prev) ? prev : [];
                const found = safePrev.find((x) => x.id === id);

                if (found) {
                    return safePrev.map((x) =>
                        x.id === id ? { ...x, qty: x.qty + qty } : x
                    );
                }
                return [...safePrev, { id, qty }];
            });
        }

        function removeItem(id) {
            setRawCart((prev) =>
                Array.isArray(prev) ? prev.filter((x) => x.id !== id) : []
            );
        }

        function setQty(id, qty) {
            const safeQty = Math.max(1, Math.min(99, Number(qty) || 1));
            setRawCart((prev) =>
                Array.isArray(prev)
                    ? prev.map((x) =>
                          x.id === id ? { ...x, qty: safeQty } : x
                      )
                    : []
            );
        }

        function clear() {
            setRawCart([]);
        }

        const totalQty = cartItems.reduce((sum, x) => sum + x.qty, 0);

        return { cartItems, addItem, removeItem, setQty, clear, totalQty };
    }, [cartItems, setRawCart]);

    return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}
