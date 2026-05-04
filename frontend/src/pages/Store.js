import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "../App.css";

function Store() {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);

    const [name, setName] = useState("");
    const [phone1, setPhone1] = useState("");
    const [phone2, setPhone2] = useState("");
    const [address, setAddress] = useState("");

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios
        .get("https://victus-production.up.railway.app/products")
        .then((res) => setProducts(res.data))
        .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
        setCart(JSON.parse(savedCart));
        }
        setLoaded(true);
    }, []);

    useEffect(() => {
    if (loaded) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    }, [cart, loaded]);
  return (
    <div style={{ fontFamily: "Outfit, sans-serif", background: "#000", color: "#fff" }}>
        {/* 🛒 FLOATING CART */}
              <div
                id="cart-icon"
                style={{
                  position: "fixed",
                  top: "20px",
                  right: "20px",
                  background: "linear-gradient(135deg,#00ffcc,#00aaff)",
                  padding: "10px 16px",
                  borderRadius: "30px",
                  color: "#000",
                  fontWeight: "700",
                  boxShadow: "0 0 25px rgba(0,255,204,0.6)",
                  cursor: "pointer",
                  zIndex: 3000
                }}
                onClick={() => {
                  setCartOpen(true);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                🛒 {cart.reduce((total, item) => total + item.qty, 0)}
              </div>


              {/* 🔥 HERO */}
              <div
                style={{
                  height: "100vh",
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1523398002811-999ca8dec234')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  position: "relative"
                }}
              >

                {/* DARK + GLOW OVERLAY */}
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.9))"
                  }}
                />

                <motion.div
                  style={{ position: "relative", zIndex: 1 }}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <h1
                    style={{
                      fontSize: "clamp(60px, 10vw, 120px)",
                      fontWeight: "900",
                      letterSpacing: "10px",
                      background: "linear-gradient(90deg,#00ffcc,#00aaff)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      textShadow: "0 0 40px rgba(0,255,204,0.4)"
                    }}
                  >
                    VICTUS
                  </h1>

                  <p style={{
                    letterSpacing: "3px",
                    opacity: 0.8,
                    fontSize: "14px"
                  }}>
                    WEAR YOUR VICTORY
                  </p>

                  <button
                    style={{
                      marginTop: "30px",
                      padding: "14px 40px",
                      background: "linear-gradient(135deg,#00ffcc,#00aaff)",
                      border: "none",
                      borderRadius: "30px",
                      fontWeight: "700",
                      letterSpacing: "2px",
                      cursor: "pointer",
                      boxShadow: "0 0 25px rgba(0,255,204,0.5)",
                      transition: "0.3s"
                    }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.08)";
                        e.target.style.boxShadow = "0 0 30px rgba(0,255,204,0.7)";
                      }}

                      onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1)";
                        e.target.style.boxShadow = "0 0 25px rgba(0,255,204,0.5)";
                      }}

                      onClick={() => {
                        document.getElementById("products").scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    SHOP NOW
                  </button>
                </motion.div>
              </div>


              {/* 🛍 PRODUCTS */}
              <div id="products" style={{ padding: "60px 20px" }}>
                <h2 style={{ textAlign: "center", marginBottom: "40px", letterSpacing: "2px" }}>
                  FEATURED PRODUCTS
                </h2>

                <div style={{ display: "flex", gap: "25px", flexWrap: "wrap", justifyContent: "center" }}>
                  {products.map((p) => (
                    <div
                      key={p.id}
                      style={{
                        width: "250px",
                        background: "rgba(255,255,255,0.06)",
                        backdropFilter: "blur(15px)",
                        borderRadius: "20px",
                        padding: "15px",
                        border: "1px solid rgba(0,255,204,0.1)",
                        transition: "0.3s",
                        cursor: "pointer",
                        boxShadow: "0 8px 30px rgba(0,0,0,0.5)"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-10px)";
                        e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,255,204,0.3)";

                        const img = e.currentTarget.querySelector("img");
                        if (img) img.style.transform = "scale(1.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";

                        const img = e.currentTarget.querySelector("img");
                        if (img) img.style.transform = "scale(1)";
                      }}
                    >
                      <img 
                        src={p.image} 
                        alt="" 
                        style={{ 
                          width: "100%", 
                          borderRadius: "12px",
                          transition: "0.3s"
                        }} 
                      />

                      <h3 style={{ fontWeight: "700", letterSpacing: "1px", fontSize: "16px" }}>
                        {p.name}
                      </h3>

                      <p style={{ opacity: 0.6, fontSize: "14px" }}>
                        LKR {p.price}
                      </p>

                      <button
                        style={{
                          width: "100%",
                          padding: "12px",
                          background: "linear-gradient(135deg,#00ffcc,#00aaff)",
                          border: "none",
                          borderRadius: "12px",
                          color: "#000",
                          fontWeight: "700",
                          letterSpacing: "1px",
                          cursor: "pointer",
                          boxShadow: "0 0 15px rgba(0,255,204,0.3)"
                        }}
                        onClick={(e) => {
                          const card = e.currentTarget.parentElement;
                          const img = card.querySelector("img");
                          const cartIcon = document.getElementById("cart-icon");

                          if (img && cartIcon) {
                            const imgRect = img.getBoundingClientRect();
                            const cartRect = cartIcon.getBoundingClientRect();

                            const clone = img.cloneNode(true);

                            clone.style.position = "fixed";
                            clone.style.left = imgRect.left + "px";
                            clone.style.top = imgRect.top + "px";
                            clone.style.width = imgRect.width + "px";
                            clone.style.height = imgRect.height + "px";
                            clone.style.borderRadius = "12px";
                            clone.style.transition = "all 0.8s cubic-bezier(0.65, -0.2, 0.25, 1.4)";
                            clone.style.zIndex = "5000";

                            document.body.appendChild(clone);

                            setTimeout(() => {
                              clone.style.left = cartRect.left + "px";
                              clone.style.top = cartRect.top + "px";
                              clone.style.width = "20px";
                              clone.style.height = "20px";
                              clone.style.opacity = "0.5";
                            }, 10);

                            setTimeout(() => {
                              clone.remove();
                            }, 800);
                          }

                          // ✅ KEEP YOUR ORIGINAL LOGIC
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
                        ADD TO CART
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* ⚫ OVERLAY */}
              {cartOpen && (
                <div
                  onClick={() => setCartOpen(false)}
                  style={{
                    position: "fixed",
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,0.6)",
                    top: 0,
                    left: 0,
                    zIndex: 1500
                  }}
                />
              )}

              {/* 🛒 CART PANEL */}
              <motion.div
                initial={{ x: 400 }}
                animate={{ x: cartOpen ? 0 : 400 }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}

                style={{
                  position: "fixed",
                  top: 0,
                  right: 0,
                  width: "360px",
                  height: "100%",
                  background: "linear-gradient(180deg, rgba(10,10,10,0.95), rgba(0,0,0,0.98))",
                  borderLeft: "1px solid rgba(0,255,204,0.15)",
                  color: "#fff",
                  zIndex: 2000,
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "-10px 0 40px rgba(0,0,0,0.9), -2px 0 10px rgba(0,255,204,0.2)",
                }}
              >

                {/* HEADER */}
                <div style={{ padding: "20px", display: "flex", justifyContent: "space-between" }}>
                  <h2
                    style={{
                      fontWeight: "800",
                      letterSpacing: "1.5px",
                      background: "linear-gradient(90deg,#00ffcc,#00aaff)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}
                  >
                    Your Cart
                  </h2>
                  <button
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                      width: "30px",
                      height: "30px",
                      cursor: "pointer"
                    }}
                    onClick={() => setCartOpen(false)}
                  >
                    ✕
                  </button>
                </div>

                {/* ITEMS */}
                <div style={{ flex: 1, overflowY: "auto", padding: "0 20px" }}>
                  {cart.length === 0 ? (
                    <p>Cart is empty</p>
                  ) : (
                    cart.map(item => (
                      <div
                        key={item.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "15px",
                          padding: "14px",
                          borderRadius: "12px",
                          background: "rgba(255,255,255,0.06)",
                          backdropFilter: "blur(10px)",
                          transition: "0.25s",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.4)"

                          
                        }}

                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.02)";
                          e.currentTarget.style.boxShadow = "0 0 20px rgba(0,255,204,0.3)";
                        }}

                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.4)";
                        }}
                      >
                                  

                        {/* LEFT */}
                        <div>
                          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                            <img
                              src={item.image}
                              alt=""
                              style={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "8px",
                                objectFit: "cover"
                              }}
                            />

                            <div>
                              <h4 style={{ margin: 0, fontWeight: "700" }}>{item.name}</h4>
                              <p style={{ fontSize: "12px", opacity: 0.6 }}>
                                LKR {item.price}
                              </p>
                            </div>
                          </div>

                          {/* ➕➖ */}
                          <div style={{ display: "flex", gap: "10px", marginTop: "8px", alignItems: "center" }}>
            
                            <button
                              style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "8px",
                                border: "none",
                                background: "rgba(255,255,255,0.1)",
                                color: "#fff",
                                fontWeight: "700",
                                cursor: "pointer"
                              }}
                              onClick={() => {
                                setCart(cart.map(i =>
                                  i.id === item.id
                                    ? { ...i, qty: Math.max(1, i.qty - 1) }
                                    : i
                                ));
                              }}
                                onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.9)"}
                                onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
                            >
                              –
                            </button>

                            <span style={{ fontWeight: "600" }}>{item.qty}</span>

                            <button
                              style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "8px",
                                border: "none",
                                background: "linear-gradient(135deg,#00ffcc,#00aaff)",
                                color: "#000",
                                fontWeight: "700",
                                cursor: "pointer"
                              }}
                              onClick={() => {
                                setCart(cart.map(i =>
                                  i.id === item.id
                                    ? { ...i, qty: i.qty + 1 }
                                    : i
                                ));
                              }}
                                onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.9)"}
                                onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
                            >
                              +
                            </button>

                          </div>
                        </div>

                        {/* RIGHT */}
                        <div style={{ textAlign: "right" }}>
                          <strong style={{ fontSize: "14px" }}>
                            LKR {item.price * item.qty}
                          </strong>

                          <div>
                            <button
                              style={{
                                color: "#ff4d4d",
                                background: "none",
                                border: "none",
                                cursor: "pointer"
                              }}
                              onClick={() => {
                                setCart(cart.filter(i => i.id !== item.id));
                              }}
                            >
                              <span style={{ color: "#ff4d4d", fontSize: "12px" }}>
                                remove
                              </span>
                            </button>
                          </div>
                        </div>

                      </div>
                    ))
                  )}
                </div>

                {/* FOOTER */}
                {cart.length > 0 && (
                  <div style={{ padding: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontWeight: "600" }}>Total</span>
                      <span style={{ color: "#00ffcc", fontWeight: "700" }}>
                        LKR {cart.reduce((sum, item) => sum + item.price * item.qty, 0)}
                      </span>
                    </div>

                    <hr style={{
                      border: "none",
                      height: "1px",
                      background: "rgba(255,255,255,0.1)",
                      margin: "15px 0"
                    }} />

                    <h4 style={{
                      marginTop: "20px",
                      marginBottom: "10px",
                      fontWeight: "700",
                      letterSpacing: "1px",
                      opacity: 0.8
                    }}>
                      CUSTOMER DETAILS
                    </h4>

                    <div style={{ marginTop: "15px" }}>
                      <input
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                          display: "block",
                          width: "100%",
                          marginBottom: "10px",
                          padding: "12px",
                          borderRadius: "12px",
                          background: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          color: "#fff",
                          outline: "none",
                          fontSize: "14px",
                          transition: "0.2s",
                          boxSizing: "border-box"
                        }}
                      />

                      <input
                        placeholder="Primary Phone"
                        value={phone1}
                        onChange={(e) => setPhone1(e.target.value)}
                        style={{
                          display: "block",
                          width: "100%",
                          marginBottom: "10px",
                          padding: "12px",
                          borderRadius: "12px",
                          background: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          color: "#fff",
                          outline: "none",
                          fontSize: "14px",
                          transition: "0.2s",
                          boxSizing: "border-box"
                        }}
                      />

                      <input
                        placeholder="Secondary Phone (optional)"
                        value={phone2}
                        onChange={(e) => setPhone2(e.target.value)}
                      style={{
                        display: "block",
                        width: "100%",
                        marginBottom: "10px",
                        padding: "12px",
                        borderRadius: "12px",
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "#fff",
                        outline: "none",
                        fontSize: "14px",
                        transition: "0.2s",
                        boxSizing: "border-box"
                      }}
                      />

                      <textarea
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        style={{
                          display: "block",
                          width: "100%",
                          marginBottom: "10px",
                          padding: "12px",
                          borderRadius: "12px",
                          background: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          color: "#fff",
                          outline: "none",
                          fontSize: "14px",
                          transition: "0.2s",
                          boxSizing: "border-box"
                        }}
                      />
                    </div>

                    <button
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        padding: "14px",
                        background: "linear-gradient(135deg,#00ffcc,#00aaff)",
                        border: "none",
                        borderRadius: "10px",
                        fontWeight: "700",
                        cursor: "pointer",
                        boxShadow: "0 0 25px rgba(0,255,204,0.4)",
                        letterSpacing: "1px",
                        fontSize: "14px"
                      }}

                      onMouseEnter={(e) => e.target.style.transform = "scale(1.03)"}
                      onMouseLeave={(e) => e.target.style.transform = "scale(1)"}

                      onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.95)"}
                      onMouseUp={(e) => e.currentTarget.style.transform = "scale(1.03)"}

                      onClick={async () => {
                        if (cart.length === 0) return;

                        if (!name || !phone1 || !address) {
                        alert("Please fill all required details");
                        return;
                      }

                        const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

                        // 🔥 SAVE ORDER
                        try {
                          await axios.post("https://victus-production.up.railway.app/orders", {
                            items: cart,
                            total: total,
                            name: name,
                            phone1: phone1,
                            phone2: phone2,
                            address: address
                          });
                        } catch (err) {
                          console.log("Order save failed", err);
                        }

                        // WHATSAPP MESSAGE
                        const text =
                          `VICTUS Order:\n\n` +
                          cart
                            .map(item => `${item.name} x${item.qty} - LKR ${item.price * item.qty}`)
                            .join("\n") +
                          `\n\nTotal: LKR ${total}`;

                        const url = `https://wa.me/947XXXXXXXX?text=${encodeURIComponent(text)}`;

                        window.open(url, "_blank");

                        setCart([]);
                      }}
                    >
                      🚀 Checkout
                    </button>
                  </div>
                )}

                </motion.div>

      
    </div>
  );
}

export default Store;