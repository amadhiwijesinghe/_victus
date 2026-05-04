import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    axios.get("https://victus-production.up.railway.app/products")
      .then(res => setProducts(res.data));
  }, []);

  const addProduct = async () => {
    await axios.post("https://victus-production.up.railway.app/products", {
      name,
      price,
      image
    });

    setName("");
    setPrice("");
    setImage("");

    const res = await axios.get("https://victus-production.up.railway.app/products");
    setProducts(res.data);
  };

  const inputStyle = {
  width: "100%",
  marginBottom: "10px",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "rgba(255,255,255,0.08)",
  color: "#fff"
};

    const btnStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg,#00ffcc,#00aaff)",
    fontWeight: "700",
    cursor: "pointer"
    };

  return (
    <div style={{ padding: "40px", color: "#fff", background: "#000" }}>
      <h1>Manage Products</h1>

      {/* CREATE */}
    <div style={{
        maxWidth: "700px",
        marginBottom: "30px",
        padding: "20px",
        borderRadius: "16px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(0,255,204,0.1)",
        backdropFilter: "blur(10px)"
        }}>

        <h2 style={{ marginBottom: "15px" }}>Add Product</h2>

        <input
            placeholder="Product Name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={inputStyle}
        />

        <input
            placeholder="Price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            style={inputStyle}
        />

        <input
            placeholder="Image URL"
            value={image}
            onChange={e => setImage(e.target.value)}
            style={inputStyle}
        />

        <button style={btnStyle} onClick={addProduct}>
            ➕ Add Product
        </button>

    </div>

      {/* LIST */}
      {products.map(p => (
        <div key={p.id}>
          <img src={p.image} width="50" alt="" />
          <p>{p.name} - {p.price}</p>

          <button onClick={async () => {
            await axios.delete(`https://victus-production.up.railway.app/products/${p.id}`);
            setProducts(products.filter(x => x.id !== p.id));
          }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductsAdmin;