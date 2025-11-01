// src/pages/frontpages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../utils/CartContext";

export default function Dashboard() {
  const { selectedCategory, searchTerm } = useOutletContext();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products")
      .then((res) => {
        // Jika respons Laravel pakai pagination
        setProducts(res.data.data || res.data);
      })
      .catch((err) => console.error("Gagal ambil produk:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchCategory =
      selectedCategory === "All" ||
      p.category?.name?.toLowerCase() === selectedCategory.toLowerCase();
    const matchSearch = p.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Memuat produk...</p>;
  }

  return (
    <div className="p-6 bg-[#FFF8F0] min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        🍽️ Menu RestoKuy
      </h1>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-500 text-center">
          Produk tidak ditemukan. Coba ubah kategori atau kata kunci pencarian.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-2xl p-4 shadow-md hover:shadow-xl transition bg-white flex flex-col"
            >
              <Link to={`/product/${product.id}`} className="block">
                <img
                  src={
                    product.img_url ||
                    `http://127.0.0.1:8000/storage/${product.img}`
                  }
                  alt={product.name}
                  className="w-full h-48 object-cover mb-4 rounded-xl"
                />
                <h2 className="font-semibold text-lg text-gray-800 mb-1 hover:text-[#E63946] transition">
                  {product.name}
                </h2>
              </Link>

              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {product.description}
              </p>
              <p className="font-semibold text-[#E63946] text-base mb-3">
                Rp {product.price.toLocaleString("id-ID")}
              </p>

              <button
                onClick={() => addToCart(product)}
                className="mt-auto bg-[#FFD166] text-gray-800 px-3 py-2 rounded-lg hover:bg-[#E63946] hover:text-white transition"
              >
                Tambah ke Keranjang
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
