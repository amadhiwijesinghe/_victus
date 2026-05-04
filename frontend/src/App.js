import React from "react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://victus-production.up.railway.app/products") // ← your backend URL
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
  <div>

    <div
      className="cart-bubble"
      onClick={() => setCartOpen(true)}
    >
      🛒 {cart.reduce((total, item) => total + item.qty, 0)}
    </div>


    {/* HERO */}
    <div className="hero">

      <div className="glow"></div>

      <motion.div
        style={{ position: "relative", zIndex: 1 }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="logo">VICTUS</h1>

        <p className="subtitle">WEAR YOUR VICTORY</p>

        <button
          className="btn"
          onClick={() => {
            document.getElementById("products").scrollIntoView({ behavior: "smooth" });
          }}
        >
          SHOP NOW
        </button>
      </motion.div>
    </div>

    {/* PRODUCTS */}
    <div id="products" className="section">
      <h2 className="title">FEATURED PRODUCTS</h2>

      <div className="grid">
        {products.map((p) => (
          <div className="card" key={p.id}>
            <img src={p.image} alt={p.name} />

            <h3>{p.name}</h3>
            <p>LKR {p.price}</p>

            <button
              className="add-btn"
              onClick={() => {
                const existing = cart.find(item => item.id === p.id);

                if (existing) {
                  setCart(cart.map(item =>
                    item.id === p.id
                      ? { ...item, qty: item.qty + 1 }
                      : item
                  ));
                } else {
                  setCart([...cart, { ...p, qty: 1 }]);
                }
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <button
        className="btn"
        style={{ marginTop: "40px", opacity: cart.length === 0 ? 0.5 : 1 }}
        disabled={cart.length === 0}
        onClick={() => {
          if (cart.length === 0) return;

          const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

          const text =
            `VICTUS Order:\n` +
            cart
              .map(item => `${item.name} x${item.qty} - LKR ${item.price}`)
              .join("\n") +
            `\n\nTotal: LKR ${total}`;

          const url = `https://wa.me/94712345678?text=${encodeURIComponent(text)}`;

          window.open(url, "_blank");
          setCart([]);
        }}
      >
        Order via WhatsApp
      </button>
    </div>

  {cartOpen && (
    <div
      onClick={() => setCartOpen(false)}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.6)",
        zIndex: 1500
      }}
    />
  )}

  {/* 🛒 CART PANEL */}
  <div
    style={{
      position: "fixed",
      top: 0,
      right: cartOpen ? "0" : "-420px",
      width: "360px",
      height: "100%",
      backdropFilter: "blur(20px)",
      background: "rgba(20,20,20,0.85)",
      borderLeft: "1px solid rgba(255,255,255,0.1)",
      color: "#fff",
      padding: "0px",
      transition: "0.4s cubic-bezier(0.77, 0, 0.18, 1)",
      zIndex: 2000,
      display: "flex",
      flexDirection: "column",
      boxShadow: "-10px 0 40px rgba(0,0,0,0.8)"
    }}
  >

  {/* HEADER */}
  <div className="cart-header" style={{ padding: "20px" }}>
    <h2 style={{ letterSpacing: "1px" }}>
      🛒 Your Cart
    </h2>
    <button className="close-btn" onClick={() => setCartOpen(false)}>✕</button>
  </div>

  {/* ITEMS */}
  <div
    style={{
      flex: 1,
      overflowY: "auto",
      marginTop: "10px",
      paddingRight: "5px",
      padding: "0 20px"
    }}
  >
    {cart.length === 0 ? (
      <p>Cart is empty</p>
    ) : (
      cart.map(item => (
        <div
          key={item.id}
          style={{
            transition: "0.2s",
            cursor: "pointer",
            marginBottom: "15px",
            padding: "10px",
            borderRadius: "10px",
            background: "rgba(255,255,255,0.05)"
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          <div>
            <h4>{item.name}</h4>
            <p>{item.qty} × LKR {item.price}</p>
          </div>

          <div>
            LKR {item.price * item.qty}
          </div>
        </div>
      ))
    )}
  </div>

  {/* FOOTER */}
  {cart.length > 0 && (
    <div
    style={{
      borderTop: "1px solid rgba(255,255,255,0.1)",
      paddingTop: "15px",
      marginTop: "10px",
      padding: "20px"
    }}
  >
      <div className="cart-total">
        <span>Total</span>
        <span style={{ color: "#00ffcc" }}>
          LKR {cart.reduce((sum, item) => sum + item.price * item.qty, 0)}
        </span>
      </div>

      <button
        style={{
          width: "100%",
          padding: "14px",
          background: "linear-gradient(135deg, #00ffcc, #00aaff)",
          border: "none",
          color: "#000",
          fontWeight: "bold",
          borderRadius: "10px",
          cursor: "pointer",
          transition: "0.3s"
        }}
        onMouseEnter={(e) => e.target.style.opacity = "0.8"}
        onMouseLeave={(e) => e.target.style.opacity = "1"}
      >
        🚀 Checkout
      </button>
    </div>
  )}

</div>
    </div>
);
}

export default App;