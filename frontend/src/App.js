import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://your-app.up.railway.app/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);

 return (
  <div style={{
    background: "#111",
    minHeight: "100vh",
    color: "#fff"
  }}>

    {/* 🔥 HERO SECTION */}
    <div style={{
      height: "100vh",
      backgroundImage: "url('https://images.unsplash.com/photo-1523398002811-999ca8dec234')",
      backgroundSize: "cover",
      backgroundPosition: "50% 20%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center"
    }}>
      <div style={{ background: "rgba(0,0,0,0.6)", padding: "30px", borderRadius: "10px" }}>
        <h1 style={{ fontSize: "50px", marginBottom: "10px" }}>VICTUS</h1>
        <p style={{ fontSize: "18px", marginBottom: "20px" }}>
          Wear Your Strength
        </p>
        <button style={{
          padding: "10px 20px",
          background: "#fff",
          color: "#000",
          border: "none",
          cursor: "pointer"
        }}>
          Shop Now
        </button>
      </div>
    </div>

    {/* 🔽 PRODUCT SECTION */}
    <div style={{
      padding: "20px",
      maxWidth: "1200px",
      margin: "0 auto"
    }}>

      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Products</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px"
      }}>
        {products.map(p => (
          <div key={p.id} style={{
            background: "#1a1a1a",
            padding: "15px",
            borderRadius: "10px",
            textAlign: "center"
          }}>
            <img
              src={p.image}
              alt=""
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px"
              }}
            />
            <h3>{p.name}</h3>
            <p>LKR {p.price}</p>
          </div>
        ))}
      </div>

    </div>
  </div>
);
}

export default App;