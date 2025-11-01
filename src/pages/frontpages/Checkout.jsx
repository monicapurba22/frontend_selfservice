// src/pages/Checkout.jsx
import { useState } from "react";
import { useCart } from "../../utils/CartContext";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("QRIS");

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = (e) => {
    e.preventDefault();

    alert(
      `✅ Pembelian berhasil!\n\nMetode Pembayaran: ${paymentMethod}\nTotal: Rp ${total.toLocaleString(
        "id-ID"
      )}`
    );
    clearCart();
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-[#FFF8F0] min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Checkout
      </h2>

      {/* RINGKASAN BELANJA */}
      <div className="border rounded-2xl p-4 mb-6 shadow-md bg-white">
        <h3 className="font-semibold text-lg mb-2 border-b pb-2 text-gray-700">
          Ringkasan Belanja
        </h3>

        {cart.length === 0 ? (
          <p className="text-gray-600 text-center py-4">Keranjang kosong.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="py-2 border-b last:border-0">
              <p className="font-medium text-gray-800">
                {item.name} <span className="text-gray-500">(x{item.qty})</span>
              </p>
              <p className="text-sm text-gray-600">
                Harga: Rp {item.price.toLocaleString("id-ID")} <br />
                Subtotal:{" "}
                <span className="font-semibold text-[#E63946]">
                  Rp {(item.price * item.qty).toLocaleString("id-ID")}
                </span>
              </p>
            </div>
          ))
        )}

        <p className="font-bold mt-4 text-right text-xl text-[#E63946]">
          Total: Rp {total.toLocaleString("id-ID")}
        </p>
      </div>

      {/* FORM PEMBAYARAN */}
      <form
        onSubmit={handleCheckout}
        className="border rounded-2xl p-5 bg-white shadow-md space-y-4"
      >
        <h3 className="font-semibold text-lg border-b pb-2 text-gray-700">
          Metode Pembayaran
        </h3>

        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-[#118AB2] text-gray-700"
        >
          <option value="QRIS">QRIS (Bayar Sekarang)</option>
          <option value="PayLater">PayLater (Bayar Nanti)</option>
        </select>

        {/* TAMPILAN BERDASARKAN PILIHAN */}
        {paymentMethod === "QRIS" && (
          <div className="border p-4 rounded-xl bg-gray-50 text-center mt-4">
            <p className="font-medium mb-2 text-gray-800">
              Scan kode QR di bawah untuk menyelesaikan pembayaran:
            </p>
            <img
              src="/assets/qr-code.png"
              alt="QRIS Code"
              className="mx-auto w-48 h-48 object-contain border rounded-lg mb-3"
            />
            <p className="text-sm text-gray-600">
              Pastikan nominal sesuai dengan total pembelian.
            </p>
          </div>
        )}

        {paymentMethod === "PayLater" && (
          <div className="border p-4 rounded-xl bg-yellow-50 text-center mt-4">
            <p className="font-medium text-gray-800 mb-2">
              Kode Tagihan PayLater Kamu:
            </p>
            <p className="font-bold text-2xl text-[#E63946] tracking-wide">
              PL-{Math.floor(Math.random() * 1000000)}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Bayar tagihanmu sebelum <b>7 hari</b> setelah transaksi ini.
            </p>
          </div>
        )}

        {/* TOMBOL KONFIRMASI */}
        <button
          type="submit"
          className="bg-[#06D6A0] hover:bg-[#118AB2] text-white w-full py-3 rounded-xl font-semibold mt-4 transition"
        >
          Konfirmasi Pembelian
        </button>
      </form>
    </div>
  );
}
