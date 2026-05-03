import React from "react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://victus-production.up.railway.app/products") // ← your backend URL
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div style={{ background: "#111", color: "white", fontFamily: "Arial, sans-serif" }}>

      {/* 🔥 HERO SECTION */}
      <div
        style={{
          height: "100vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523398002811-999ca8dec234')",
          backgroundSize: "cover",
          backgroundPosition: "50% 20%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
        }}
      >

        {/* 🔥 DARK OVERLAY */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8))",
          }}
        />

        {/* 🔥 CONTENT */}
        <motion.div
          style={{ position: "relative", zIndex: 1 }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1
            style={{
              fontSize: "clamp(40px, 8vw, 90px)",
              letterSpacing: "8px",
              fontWeight: "800",
              margin: 0,
            }}
          >
            VICTUS
          </h1>

          <p
            style={{
              marginTop: "10px",
              fontSize: "18px",
              opacity: 0.8,
              letterSpacing: "2px",
            }}
          >
            WEAR YOUR VICTORY
          </p>

          {/* 🔥 CTA BUTTON */}
          <button
            style={{
              marginTop: "30px",
              padding: "12px 30px",
              background: "white",
              color: "black",
              border: "none",
              fontWeight: "600",
              letterSpacing: "2px",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#ddd")}
            onMouseOut={(e) => (e.target.style.background = "white")}
            onClick={() => {
              document.getElementById("products").scrollIntoView({ behavior: "smooth" });
            }}
          >
            SHOP NOW
          </button>
        </motion.div>
      </div>

      {/* 🔥 SIMPLE PRODUCT SECTION (STARTER) */}
      <div style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2 style={{ marginBottom: "30px", letterSpacing: "3px" }}>
          FEATURED PRODUCTS
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          {/* Product Card */}
          <div id="products" style={{ padding: "60px 20px", textAlign: "center" }}>
            <h2 style={{ marginBottom: "30px", letterSpacing: "3px" }}>
              FEATURED PRODUCTS
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "30px",
                maxWidth: "1200px",
                margin: "0 auto",
              }}
            >
              {products.map((p) => (
                <div key={p.id}>
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                  <h3>{p.name}</h3>
                  <p>LKR {p.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;