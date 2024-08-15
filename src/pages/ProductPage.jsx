import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const domain = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${domain}/product`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [domain]);

  if (loading) {
    return (
      <div className="flex justify-center mt-16">
        <ClimbingBoxLoader color="#0d923a" />
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto font-helvetica">
      <h1 className="mb-12 text-4xl font-bold tracking-wider text-center font-bebasneue">
        Produk <span className="text-[#0d923a]">Kami</span>
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => {
          const imagePath = `/products/${product.image_link}`;
          return (
            <Link
              key={index}
              to={`/produk/${product.id}`}
              className="relative overflow-hidden shadow-2xl group"
            >
              <img
                src={imagePath}
                alt={product.nama}
                className="object-cover w-full transition duration-300 h-96 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center transition duration-300 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
                <div className="px-4 text-center text-white">
                  <p>{product.deskripsi}</p>
                </div>
              </div>
              <div className="absolute bottom-0 w-full py-2 bg-white bg-opacity-60">
                <h3 className="text-lg font-bold text-center">
                  {product.nama}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProductPage;
