import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useProducts } from "../../utils/ProductContext";

export default function AdminDashboard() {
  const { products, isLoading, isError, deleteProduct } = useProducts();

const handleDelete = (id) => {
  if (window.confirm("Apakah kamu yakin ingin menghapus produk ini?")) {
    deleteProduct.mutate(id);
  }
};


  if (isLoading)
    return <p className="text-center text-gray-600">⏳ Sedang memuat data produk...</p>;

  if (isError)
    return <p className="text-center text-red-600">❌ Gagal memuat produk dari server.</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-700">Manajemen Produk</h2>
        <Link
          to="/admin/add-product"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
        >
          + Tambah Produk
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-200 text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border">Gambar</th>
              <th className="p-3 border">Nama Produk</th>
              <th className="p-3 border">Kategori</th>
              <th className="p-3 border">Harga</th>
              <th className="p-3 border">Stok</th>
              <th className="p-3 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products?.length ? (
              products.map((p, i) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{i + 1}</td>
                  <td className="p-3 border">
                    <img
                      src={p.img_url}
                      alt={p.name}
                      className="w-14 h-14 object-cover rounded-md border"
                    />
                  </td>
                  <td className="p-3 border font-medium text-gray-700">{p.name}</td>
                  <td className="p-3 border text-gray-500">
                    {p.category?.category || p.category?.name || "-"}
                  </td>
                  <td className="p-3 border text-gray-600">Rp {p.price}</td>
                  <td className="p-3 border text-gray-600">{p.stock}</td>
                  <td className="p-3 border">
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/edit-product/${p.id}`}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-500 italic border"
                >
                  Tidak ada produk ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
