import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/product/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(setProducts)
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const renderKeunggulan = (keunggulan) => {
    try {
      const parsedKeunggulan = JSON.parse(keunggulan);

      if (Array.isArray(parsedKeunggulan)) {
        if (parsedKeunggulan.length === 1 && parsedKeunggulan[0] === "") {
          return "-";
        } else if (typeof parsedKeunggulan[0] === "string") {
          return (
            <ul className="list-disc list-outside ml-5 space-y-1">
              {parsedKeunggulan.map((item, index) => (
                <li key={index} className="text-sm">
                  {item}
                </li>
              ))}
            </ul>
          );
        } else if (Array.isArray(parsedKeunggulan[0])) {
          return (
            <ul className="list-disc list-outside ml-5 space-y-3">
              {parsedKeunggulan.map(([header, description], index) => (
                <li key={index} className="text-sm">
                  <span className="font-semibold">{header}</span>
                  <p className="mt-1 text-xs text-gray-600">{description}</p>
                </li>
              ))}
            </ul>
          );
        }
      }
    } catch (error) {
      console.error("Error parsing keunggulan:", error);
    }

    return "-";
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah anda yakin ingin menghapus produk ini?")) {
      fetch(`${import.meta.env.VITE_API_URL}/product/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          setProducts(products.filter((product) => product.id !== id));
        })
        .catch((error) => console.error("Error deleting product:", error));
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col h-screen bg-gray-100 font-helvetica">
        <div className="flex-1 overflow-auto p-4">
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-2xl font-semibold mb-4 sm:mb-0">Produk</h2>
            <Link
              to="/admin/edit-product"
              className="bg-[#0d923a] hover:bg-[#0a6428] duration-100 text-white px-4 py-2 rounded w-full sm:w-auto text-center"
            >
              Tambah Produk
            </Link>
          </header>

          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Gambar",
                    "Nama",
                    "Deskripsi",
                    "Keunggulan",
                    "Ketebalan (mm)",
                    "Lebar Fisik (mm)",
                    "Lebar Efektif (mm)",
                    "Katalog",
                    "Aksi",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={`/products/${product.image_link}`}
                        alt={product.nama}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.nama}
                    </td>
                    <td className="px-6 py-4">{product.deskripsi}</td>
                    <td className="px-6 py-4">
                      {renderKeunggulan(product.keunggulan)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {product.ketebalan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {product.lebar_fisik}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {product.lebar_efektif}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {product.katalog ? (
                        <a
                          href={`/catalogue/${product.katalog}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#216e3b] hover:underline"
                        >
                          Tampilkan
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center space-x-2">
                        <Link
                          to={`/admin/edit-product/${product.id}`}
                          className="bg-blue-500 duration-100 hover:bg-blue-600 text-white px-3 py-2 rounded"
                        >
                          <FaPencilAlt />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="bg-red-500 duration-100 hover:bg-red-600 text-white px-3 py-2 rounded"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPanel;
