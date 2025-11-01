// src/data/product.js

// Import gambar (pastikan file gambar kamu tersedia di folder src/assets)
import nasiGorengImg from "../assets/nasi-goreng.jpg";
import ayamBakarImg from "../assets/ayam-bakar.jpg";
import esTehImg from "../assets/es-teh.jpg";
import kopiImg from "../assets/kopi.png";
import mieGorengImg from "../assets/mie-goreng.jpg";
import jusJerukImg from "../assets/jus-jeruk.jpg";

// Data produk
export const products = [
  {
    id: 1,
    name: "Nasi Goreng Spesial",
    desc: "Nasi goreng dengan telur dan ayam suwir khas resto kami.",
    category: "Makanan",
    price: 25000,
    image: nasiGorengImg,
    rating: 5,
  },
  {
    id: 2,
    name: "Ayam Bakar Madu",
    desc: "Ayam bakar manis gurih disajikan dengan sambal dan lalapan.",
    category: "Makanan",
    price: 30000,
    image: ayamBakarImg,
    rating: 4,
  },
  {
    id: 3,
    name: "Mie Goreng Jawa",
    desc: "Mie goreng dengan bumbu khas Jawa, rasa pedas manis.",
    category: "Makanan",
    price: 22000,
    image: mieGorengImg,
    rating: 4,
  },
  {
    id: 4,
    name: "Es Teh Manis",
    desc: "Minuman segar teh manis dingin, teman makan siang.",
    category: "Minuman",
    price: 8000,
    image: esTehImg,
    rating: 5,
  },
  {
    id: 5,
    name: "Jus Jeruk Segar",
    desc: "Jus jeruk alami tanpa gula tambahan, vitamin C tinggi.",
    category: "Minuman",
    price: 12000,
    image: jusJerukImg,
    rating: 5,
  },
  {
    id: 6,
    name: "Kopi Hitam Panas",
    desc: "Kopi robusta murni, pahit dan mantap untuk penyuka kopi sejati.",
    category: "Minuman",
    price: 10000,
    image: kopiImg,
    rating: 4,
  },
];
