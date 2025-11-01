// src/utils/CartContext.jsx
import { createContext, useContext, useState, useMemo } from "react";

// Buat context global
const CartContext = createContext();

// Provider untuk membungkus App.jsx
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Tambah produk ke keranjang
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // Jika sudah ada, tambahkan qty
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      // Jika belum ada, tambahkan item baru
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // Kurangi jumlah item
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0) // otomatis hapus jika qty jadi 0
    );
  };

  // Hapus produk sepenuhnya
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Hapus semua isi keranjang
  const clearCart = () => setCart([]);

  // Hitung total harga & total item pakai useMemo (lebih efisien)
  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decreaseQty,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook custom untuk akses context
export const useCart = () => useContext(CartContext);
