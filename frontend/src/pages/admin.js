import React, { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("https://victus-production.up.railway.app/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  }, []);

 return (
  <div
    style={{
      minHeight: "100vh",
      background: "#000",
      color: "#fff",
      padding: "40px",
      fontFamily: "Outfit, sans-serif"
    }}
  >
    <h1
      style={{
        fontSize: "32px",
        fontWeight: "800",
        marginBottom: "30px",
        background: "linear-gradient(90deg,#00ffcc,#00aaff)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
      }}
    >
      Admin Dashboard
    </h1>

    {orders.length === 0 ? (
      <p>No orders yet</p>
    ) : (
      orders.map(order => (
        <div
          key={order.id}
          style={{
            marginBottom: "20px",
            padding: "20px",
            borderRadius: "16px",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(0,255,204,0.1)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.6)"
          }}
        >
          {/* HEADER */}
          <div style={{ marginBottom: "10px" }}>
            <h3 style={{ margin: 0, fontWeight: "700" }}>{order.name}</h3>
            <p style={{ opacity: 0.7, fontSize: "13px" }}>
              {new Date(order.created_at).toLocaleString()}
            </p>
          </div>

          {/* CUSTOMER */}
          <div style={{ marginBottom: "10px" }}>
            <h3>{order.name}</h3>
            <p>📞 {order.phone1}</p>
            <p>📍 {order.address}</p>
          </div>

          <p style={{
            fontSize: "12px",
            marginTop: "5px",
            color: order.status === "Delivered" ? "#00ffcc" : "#ffaa00"
            }}>
            {order.status}
            </p>

          <button
            style={{
                marginTop: "10px",
                padding: "8px 12px",
                border: "none",
                borderRadius: "8px",
                background: "#ff4d4d",
                color: "#fff",
                cursor: "pointer"
            }}
            onClick={async () => {
                await axios.delete(`https://victus-production.up.railway.app/orders/${order.id}`);
                setOrders(orders.filter(o => o.id !== order.id));
            }}
            >
            Delete
            </button>

            <button
                style={{
                    marginTop: "10px",
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "8px",
                    background: order.status === "Delivered" ? "#444" : "#00ffcc",
                    color: "#000",
                    cursor: "pointer"
                }}
                onClick={async () => {
                    const newStatus =
                    order.status === "Pending" ? "Delivered" : "Pending";

                    await axios.put(
                    `https://victus-production.up.railway.app/orders/${order.id}`,
                    { status: newStatus }
                    );

                    setOrders(orders.map(o =>
                    o.id === order.id ? { ...o, status: newStatus } : o
                    ));
                }}
                >
                {order.status === "Pending" ? "Mark Delivered" : "Mark Pending"}
                </button>

          {/* ITEMS */}
          <div style={{ marginBottom: "10px" }}>
            <strong>Items:</strong>
            <ul style={{ marginTop: "5px", paddingLeft: "18px" }}>
              {JSON.parse(order.items).map((item, i) => (
                <li key={i}>
                  {item.name} x{item.qty}
                </li>
              ))}
            </ul>
          </div>

          {/* TOTAL */}
          <div style={{ textAlign: "right", fontWeight: "700", color: "#00ffcc" }}>
            LKR {order.total}
          </div>
        </div>
      ))
    )}
  </div>
);
}

export default Admin;