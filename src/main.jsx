import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AdminPanel from "./pages/AdminPanel";
import AdminEditProduct from "./pages/AdminEditProduct";
import LoginAdmin from "./pages/LoginAdmin";
import ResetPassword from "./pages/ResetPassword";
import { createRoot } from "react-dom";
import AdminForgotPassword from "./pages/AdminForgotPassword";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";

createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="produk" element={<ProductPage />} />
        <Route path="produk/:id" element={<ProductDetailPage />} />
      </Route>
      <Route path="login-admin" element={<LoginAdmin />} />
      <Route path="/forgot-password" element={<AdminForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route
        path="admin"
        element={
          <PrivateRoute>
            <AdminPanel />
          </PrivateRoute>
        }
      />
      <Route
        path="admin/edit-product"
        element={
          <PrivateRoute>
            <AdminEditProduct />
          </PrivateRoute>
        }
      />
      <Route
        path="admin/edit-product/:id"
        element={
          <PrivateRoute>
            <AdminEditProduct />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);
