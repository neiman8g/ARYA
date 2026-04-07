"use client";

import { useEffect } from "react";
import { useCart } from "./CartProvider";
import { AryaMark } from "@/components/AryaLogo";

export function CartDrawer() {
  const { cart, cartOpen, cartCount, setCartOpen, updateQty, removeFromCart, checkoutLoading, checkoutError, goToCheckout } = useCart();

  // Lock body scroll when cart is open
  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [cartOpen]);

  return (
    <div
      className={`cart-overlay ${cartOpen ? "open" : ""}`}
      onClick={() => setCartOpen(false)}
      aria-hidden={!cartOpen}
    >
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()} role="dialog" aria-labelledby="shopping-bag-heading" aria-describedby="shopping-bag-content">
        <div className="cart-drawer-header" id="shopping-bag-heading">
          Bag {cartCount > 0 && `(${cartCount})`}
          <button type="button" className="cart-drawer-close" onClick={() => setCartOpen(false)} aria-label="Close shopping bag">
            &times;
          </button>
        </div>
        <div className="cart-drawer-body" id="shopping-bag-content">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <p>Your bag is empty.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-img" style={{ background: "var(--sand-3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <AryaMark size={28} color="#8B6A3E" />
                </div>
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-meta">Size {item.size}{item.color ? ` · ${item.color}` : ""}</div>
                  <div className="cart-item-qty">
                    <button type="button" className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                    <span className="qty-num">{item.qty}</span>
                    <button type="button" className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                    <button type="button" className="cart-item-remove" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <p className="cart-preorder-note">Pre-orders ship Fall 2026. Free shipping on all orders.</p>
            {checkoutError && <p className="cart-checkout-error">{checkoutError}</p>}
            <button type="button" className="cart-checkout" onClick={goToCheckout} disabled={checkoutLoading}>
              {checkoutLoading ? "Redirecting to payment…" : "Checkout Pre-Order"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
