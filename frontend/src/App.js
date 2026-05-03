import React from "react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

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
        onClick={() => {
          if (cart.length === 0) {
            alert("Cart is empty!");
            return;
          }

          const message = cart
            .map(item => `${item.name} x${item.qty} - LKR ${item.price * item.qty}`)
            .join("\n");

          alert(`🛒 Your Cart:\n\n${message}`);
        }}
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

  </div>
);
}

export default App;