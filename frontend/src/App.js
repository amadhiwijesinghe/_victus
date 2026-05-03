import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://your-app.up.railway.app/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);

  const scrollToProducts = () => {
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{
      background: "#0a0a0a",
      minHeight: "100vh",
      color: "#fff",
      fontFamily: "sans-serif"
    }}>

      {/* 🔥 HERO */}
      <div style={{
        height: "100vh",
        backgroundImage: "url('https://images.unsplash.com/photo-1523398002811-999ca8dec234')",
        backgroundSize: "cover",
        backgroundPosition: "50% 30%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
      }}>
        <div style={{
          backdropFilter: "blur(10px)",
          background: "rgba(0,0,0,0.5)",
          padding: "40px",
          borderRadius: "15px"
        }}>
          <h1 style={{
            fontSize: "70px",
            letterSpacing: "4px",
            marginBottom: "10px"
          }}>
            VICTUS
          </h1>

          <p style={{
            fontSize: "18px",
            opacity: 0.8,
            marginBottom: "25px"
          }}>
            WEAR YOUR VICTORY.
          </p>

          <button
            onClick={scrollToProducts}
            style={{
              padding: "12px 30px",
              background: "#fff",
              color: "#000",
              border: "none",
              borderRadius: "30px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s"
            }}
            onMouseOver={e => e.target.style.transform = "scale(1.1)"}
            onMouseOut={e => e.target.style.transform = "scale(1)"}
          >
            SHOP NOW
          </button>
        </div>
      </div>

      {/* 🛍 PRODUCTS */}
      <div id="products" style={{
        padding: "50px 20px",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>

        <h2 style={{
          textAlign: "center",
          fontSize: "30px",
          marginBottom: "40px",
          letterSpacing: "2px"
        }}>
          DROP COLLECTION
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "25px"
        }}>
          {products.map(p => (
            <div key={p.id} style={{
              background: "#111",
              borderRadius: "15px",
              overflow: "hidden",
              transition: "0.3s",
              cursor: "pointer"
            }}
            onMouseOver={e => e.currentTarget.style.transform = "translateY(-10px)"}
            onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
            >

              <img
                src={p.image || "https://via.placeholder.com/300"}
                alt=""
                style={{
                  width: "100%",
                  height: "280px",
                  objectFit: "cover"
                }}
              />

              <div style={{ padding: "15px" }}>
                <h3 style={{ marginBottom: "5px" }}>{p.name}</h3>

                <p style={{
                  color: "#aaa",
                  fontSize: "14px"
                }}>
                  {p.description}
                </p>

                <p style={{
                  marginTop: "10px",
                  fontWeight: "bold"
                }}>
                  LKR {p.price}
                </p>

                <button
                  style={{
                    marginTop: "10px",
                    width: "100%",
                    padding: "10px",
                    background: "#fff",
                    color: "#000",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    const msg = `I want to buy ${p.name} for LKR ${p.price}`;
                    window.open(`https://wa.me/947XXXXXXXX?text=${encodeURIComponent(msg)}`);
                  }}
                >
                  BUY NOW
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* ⚡ FOOTER */}
      <div style={{
        textAlign: "center",
        padding: "20px",
        opacity: 0.5,
        fontSize: "12px"
      }}>
        © VICTUS — Wear Your Strength
      </div>

    </div>
  );
}

export default App;