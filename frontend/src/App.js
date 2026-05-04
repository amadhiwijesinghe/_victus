import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/admin";
import ProductsAdmin from "./pages/ProductsAdmin";
import Store from "./pages/Store";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {



  return (
    <BrowserRouter>
      <Routes>

        {/* STORE PAGE */}
        <Route path="/" element={<Store />} />

        {/* ADMIN LOGIN PAGE */}
        <Route path="/admin/login" element={<AdminLogin />} />

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

         {/* 🔥 IMPORTANT: 404 */}
        <Route
          path="*"
          element={
            <h1 style={{ color: "white", textAlign: "center", marginTop: "100px" }}>
              404 - Page Not Found
            </h1>
          }
        />
      </Routes>
    </BrowserRouter>

);
}

export default App;