import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Halaman Tidak Ditemukan</h2>
      <p className="mt-2 text-gray-600">
        Maaf, halaman yang Anda cari tidak ditemukan.
      </p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 text-white bg-[#0d923a] rounded hover:bg-[#144725] duration-150"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFound;
