// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/frontpages/Dashboard";
import Cart from "./pages/frontpages/Cart";
import Checkout from "./pages/frontpages/Checkout";
import CategoryForm from "./pages/adminpages/CategoryForm";
import AdminDashboard from "./pages/adminpages/AdminDashboard";
import ProductForm from "./pages/adminpages/ProductForm";
import ProductEdit from "./pages/adminpages/ProductEdit";
import { CartProvider } from "./utils/CartContext";
import ProductDetail from "./pages/frontpages/ProductDetail";

export default function App() {
  return (
    <CartProvider>
      <Routes>
        {/* 🏠 FRONTEND */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="product/:id" element={<ProductDetail />} />
        </Route>

        {/* ⚙️ ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="add-product" element={<ProductForm />} />
          <Route path="edit-product/:id" element={<ProductEdit />} />
          <Route path="categories" element={<CategoryForm />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}
