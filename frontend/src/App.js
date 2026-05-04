import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/admin";
import ProductsAdmin from "./pages/ProductsAdmin";
import Store from "./pages/Store";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {



  return (
    <BrowserRouter>
      <Routes>

        {/* STORE PAGE */}
        <Route path="/" element={<Store />} />

        {/* ADMIN PAGE */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>} />

        {/* ADMIN PRODUCT PAGE */}
        <Route path="/admin/products" element={
          <ProtectedRoute>
            <ProductsAdmin />
          </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>

);
}

export default App;