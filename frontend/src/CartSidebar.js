export default function CartSidebar({ cart, open, setOpen }) {
  return (
    <div className={`sidebar ${open ? "open" : ""}`}>
      <h2>Cart</h2>

      {cart.length === 0 ? (
        <p>No items</p>
      ) : (
        cart.map((item, i) => (
          <div key={i}>
            {item.name} - LKR {item.price}
          </div>
        ))
      )}

      <button onClick={() => setOpen(false)}>Close</button>
    </div>
  );
}