import React from "react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
    const { addItem } = useCart();

    return (
        <div className="card">
            <div className="imgWrap">
                <img src={product.image} alt={product.name} loading="lazy" />
            </div>

            <div className="cardBody">
                <div className="titleRow">
                    <h3 title={product.name}>{product.name}</h3>
                    <span className="badge">{product.category}</span>
                </div>

                <p className="desc">{product.description}</p>

                <div className="metaRow">
                    <div className="price">${product.price.toFixed(2)}</div>
                    <div className="rating">⭐ {product.rating}</div>
                </div>

                <button className="btn" onClick={() => addItem(product.id, 1)}>
                    Add to Cart
                </button>
            </div>
            <div className="baymax-help-tooltip">
                <span>Need help?</span>
            </div>
            
        </div>
        
    );
}