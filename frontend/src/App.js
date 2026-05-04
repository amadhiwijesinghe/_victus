import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/admin";
import ProductsAdmin from "./pages/ProductsAdmin";
import Store from "./pages/Store";

function App() {



  return (
    <BrowserRouter>
      <Routes>

        {/* STORE PAGE */}
        <Route path="/" element={<Store />} />

        {/* ADMIN PAGE */}
        <Route path="/admin" element={<Admin />} />

        {/* ADMIN PRODUCT PAGE */}
        <Route path="/admin/products" element={<ProductsAdmin />} />
      </Routes>
    </BrowserRouter>

);
}

export default App;