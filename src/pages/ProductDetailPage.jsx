import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdDownload } from "react-icons/md";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const domain = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${domain}/product`)
      .then((response) => response.json())
      .then((data) => {
        const foundProduct = data.find((p) => p.id === parseInt(id));

        // Parse the keunggulan string into an array
        if (foundProduct && foundProduct.keunggulan) {
          try {
            foundProduct.keunggulan = JSON.parse(foundProduct.keunggulan);
          } catch (error) {
            console.error("Error parsing keunggulan:", error);
            foundProduct.keunggulan = [];
          }
        }

        setProduct(foundProduct);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [domain, id]);

  if (loading) {
    return (
      <div className="flex justify-center mt-16">
        <ClimbingBoxLoader color="#0d923a" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container px-4 py-8 mx-auto text-center font-helvetica">
        Produk tidak ditemukan.
      </div>
    );
  }

  const [firstWord, ...restOfTitle] = product.nama.split(" ");

  const handleDownloadClick = (e) => {
    if (!product.katalog) {
      e.preventDefault();
    }
  };

  const renderKeunggulan = () => {
    if (
      !Array.isArray(product.keunggulan) ||
      product.keunggulan.length === 0 ||
      !product.keunggulan[0]
    ) {
      return null;
    }

    if (Array.isArray(product.keunggulan[0])) {
      // Keunggulan with headers and descriptions
      return (
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold">Keunggulan</h2>
          <div className="space-y-4">
            {product.keunggulan.map(([header, description], index) => (
              <div key={index} className="pb-4 border-b">
                <h3 className="mb-2 text-lg font-semibold">{header}</h3>
                <p className="text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (typeof product.keunggulan[0] === "string") {
      // Simple list of keunggulan
      return (
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold">Keunggulan</h2>
          <ul className="space-y-2 list-disc list-inside">
            {product.keunggulan.map((item, index) => (
              <li key={index} className="text-gray-600">
                {item}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container px-4 py-8 mx-auto font-helvetica">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <img
          src={`/products/${product.image_link}`}
          alt={product.nama}
          className="object-cover w-full h-auto shadow-2xl"
        />
        <div>
          <h1 className="mb-4 text-5xl font-bold tracking-wider font-bebasneue">
            <span className="text-[#0d923a]">{firstWord}</span>{" "}
            {restOfTitle.join(" ")}
          </h1>
          <p className="mb-6 text-gray-600">{product.deskripsi}</p>
          {renderKeunggulan()}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between pb-2 border-b">
              <span className="font-semibold">Ketebalan:</span>
              <span>{product.ketebalan}</span>
            </div>
            <div className="flex justify-between pb-2 border-b">
              <span className="font-semibold">Lebar Fisik:</span>
              <span>{product.lebar_fisik}</span>
            </div>
            <div className="flex justify-between pb-2 border-b">
              <span className="font-semibold">Lebar Efektif:</span>
              <span>{product.lebar_efektif}</span>
            </div>
          </div>
          <a
            href={product.katalog || "#"}
            download={
              product.katalog ? `${product.nama} Catalogue.png` : undefined
            }
            className={`flex items-center justify-center px-4 py-3 mt-8 text-2xl text-white transition duration-300 font-bebasneue ${
              product.katalog
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={handleDownloadClick}
          >
            <MdDownload className="mr-2" />
            Unduh Katalog
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
