import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import noImage from "../assets/no-image.jpg";

const AdminEditProduct = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    keunggulan: [{ value: "" }],
    ketebalan: "",
    lebar_fisik: "",
    lebar_efektif: "",
    image: null,
    katalog: null,
  });

  const navigate = useNavigate();

  const [keunggulanType, setKeunggulanType] = useState("simple");
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  const catalogInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const memoizedFormData = useMemo(() => formData, [formData]);

  useEffect(() => {
    if (id) {
      fetch(`${import.meta.env.VITE_API_URL}/product/${id}`)
        .then((response) => response.json())
        .then((data) => {
          let parsedKeunggulan;
          try {
            parsedKeunggulan = JSON.parse(data.keunggulan);
          } catch (e) {
            console.error("Invalid keunggulan JSON format:", data.keunggulan);
            parsedKeunggulan = [];
          }

          if (Array.isArray(parsedKeunggulan)) {
            const isSimple = typeof parsedKeunggulan[0] === "string";
            setKeunggulanType(isSimple ? "simple" : "header");

            const formattedKeunggulan = isSimple
              ? parsedKeunggulan.map((item) => ({ value: item }))
              : parsedKeunggulan.map(([header, description]) => ({
                  header,
                  description,
                }));

            setFormData({
              ...data,
              keunggulan: formattedKeunggulan,
              image: `/products/${data.image_link}` || null,
              katalog: `/catalogue/${data.katalog}` || null,
            });
            setImagePreview(`/products/${data.image_link}`);
            setExistingImage(`/products/${data.image_link}`);
          } else {
            console.error("Invalid keunggulan format:", parsedKeunggulan);
          }
        })
        .catch((error) => console.error("Error fetching product data:", error));
    }
  }, [id]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleKeunggulanChange = useCallback((index, field, value) => {
    setFormData((prevData) => {
      const updatedKeunggulan = [...prevData.keunggulan];
      updatedKeunggulan[index][field] = value;
      return { ...prevData, keunggulan: updatedKeunggulan };
    });
  }, []);

  const addKeunggulan = useCallback(() => {
    setFormData((prevData) => ({
      ...prevData,
      keunggulan: [
        ...prevData.keunggulan,
        keunggulanType === "simple"
          ? { value: "" }
          : { header: "", description: "" },
      ],
    }));
  }, [keunggulanType]);

  const removeKeunggulan = useCallback((index) => {
    setFormData((prevData) => ({
      ...prevData,
      keunggulan: prevData.keunggulan.filter((_, i) => i !== index),
    }));
  }, []);

  const toggleKeunggulanType = useCallback(() => {
    setKeunggulanType((prevType) => {
      const newType = prevType === "simple" ? "header" : "simple";
      setFormData((prevData) => ({
        ...prevData,
        keunggulan: prevData.keunggulan.map(() =>
          newType === "simple" ? { value: "" } : { header: "", description: "" }
        ),
      }));
      return newType;
    });
  }, []);

  const handleCatalogChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({ ...prevData, katalog: file }));
    }
  }, []);

  const handleRemoveImage = useCallback(() => {
    setFormData((prevData) => ({ ...prevData, image: null }));
    setImagePreview(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  }, []);

  const handleRemoveCatalog = useCallback(() => {
    setFormData((prevData) => ({ ...prevData, katalog: null }));
    if (catalogInputRef.current) {
      catalogInputRef.current.value = "";
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === "keunggulan") {
        const modifiedKeunggulan = formData[key].map((item) => {
          if (keunggulanType === "simple") {
            return item.value;
          } else {
            return [item.header, item.description];
          }
        });
        formDataToSend.append(key, JSON.stringify(modifiedKeunggulan));
      } else if (key === "image") {
        if (formData[key]) {
          const imageName = formData[key].name
            .toLowerCase()
            .replace(/\s+/g, "_")
            .replace(/\.[^/.]+$/, ".webp");
          formDataToSend.append("image_link", imageName);
          formDataToSend.append("image", formData[key]);
        }
      } else if (key === "katalog") {
        if (formData[key]) {
          formDataToSend.append("katalog", formData[key]);
        }
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/product${id ? `/${id}` : ""}`,
        {
          method: id ? "PUT" : "POST",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        alert(`Product ${id ? "updated" : "added"} successfully!`);
        // Reset form
        setFormData({
          nama: "",
          deskripsi: "",
          keunggulan: [{ value: "" }],
          ketebalan: "",
          lebar_fisik: "",
          lebar_efektif: "",
          image: null,
          katalog: null,
        });
        setKeunggulanType("simple");
        setImagePreview(null);
      } else {
        alert(`Failed to ${id ? "update" : "add"} product. Please try again.`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleImageChange = useCallback(
    (event) => {
      const file = event.target.files[0];
      if (file) {
        setFormData((prevData) => ({ ...prevData, image: file }));
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setFormData((prevData) => ({ ...prevData, image: null }));
        setImagePreview(existingImage);
      }
    },
    [existingImage]
  );
  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md font-helvetica">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold mb-6 text-[#0d923a]">
            {id ? "Edit Produk" : "Tambahkan Produk Baru"}
          </h2>
          <button
            onClick={() => navigate("/admin")}
            className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Kembali
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="nama"
              className="block text-sm font-medium text-gray-700"
            >
              Nama Produk
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={memoizedFormData.nama}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0d923a] focus:ring focus:ring-[#0d923a] focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label
              htmlFor="deskripsi"
              className="block text-sm font-medium text-gray-700"
            >
              Deskripsi Produk
            </label>
            <textarea
              id="deskripsi"
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              rows="7"
              style={{ width: "100%" }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0d923a] focus:ring focus:ring-[#0d923a] focus:ring-opacity-50"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Keunggulan Produk
            </label>
            <div className="flex justify-between items-center mb-2">
              <button
                type="button"
                onClick={toggleKeunggulanType}
                className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                {keunggulanType === "simple"
                  ? "Keunggulan"
                  : "Keunggulan & Deskripsi Keunggulan"}
              </button>
            </div>

            {formData.keunggulan.map((item, index) => (
              <div key={index} className="flex items-center mb-2">
                {keunggulanType === "simple" ? (
                  <input
                    type="text"
                    placeholder={`Keunggulan ${index + 1}`}
                    value={item.value}
                    onChange={(e) =>
                      handleKeunggulanChange(index, "value", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0d923a] focus:ring focus:ring-[#0d923a] focus:ring-opacity-50"
                  />
                ) : (
                  <div className="w-full flex gap-5 my-2">
                    <input
                      type="text"
                      placeholder={`Keunggulan ${index + 1}`}
                      value={item.header}
                      onChange={(e) =>
                        handleKeunggulanChange(index, "header", e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    <textarea
                      placeholder="Deskripsi Keunggulan"
                      value={item.description}
                      onChange={(e) =>
                        handleKeunggulanChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      rows="3"
                      className="mt-1 block w-full rounded-md border-gray-300"
                    ></textarea>
                  </div>
                )}
                <div className="flex flex-col ml-2">
                  {formData.keunggulan.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeKeunggulan(index)}
                      className="mb-2 p-2 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
                    >
                      <MinusIcon className="h-5 w-5 text-red-600" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={addKeunggulan}
                    className="p-2 bg-blue-100 rounded-md hover:bg-blue-200 duration-100 transition-colors"
                  >
                    <PlusIcon className="h-5 w-5 text-blue-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="ketebalan"
                className="block text-sm font-medium text-gray-700"
              >
                Ketebalan (mm)
              </label>
              <input
                type="number"
                id="ketebalan"
                name="ketebalan"
                value={formData.ketebalan}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0d923a] focus:ring focus:ring-[#0d923a] focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="lebar_fisik"
                className="block text-sm font-medium text-gray-700"
              >
                Lebar Fisik (mm)
              </label>
              <input
                type="number"
                id="lebar_fisik"
                name="lebar_fisik"
                value={formData.lebar_fisik}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0d923a] focus:ring focus:ring-[#0d923a] focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="lebar_efektif"
                className="block text-sm font-medium text-gray-700"
              >
                Lebar Efektif (mm)
              </label>
              <input
                type="number"
                id="lebar_efektif"
                name="lebar_efektif"
                value={formData.lebar_efektif}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0d923a] focus:ring focus:ring-[#0d923a] focus:ring-opacity-50"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Gambar Produk
            </label>

            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              ref={imageInputRef}
              className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-[#0d923a] file:text-white
              hover:file:bg-[#0b7e32]"
            />
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Image Preview"
                className="mt-2 h-64 w-auto object-cover"
              />
            ) : (
              <img
                src={noImage}
                alt="Image Preview"
                className="mt-2 h-64 w-auto object-cover"
              />
            )}
            {formData.image && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="mt-2 text-sm text-red-600 hover:underline"
              >
                Hapus Gambar
              </button>
            )}
          </div>

          <div>
            <label
              htmlFor="katalog"
              className="block text-sm font-medium text-gray-700"
            >
              Katalog Produk (PDF/Gambar)
            </label>
            <input
              type="file"
              id="katalog"
              name="katalog"
              onChange={handleCatalogChange}
              accept="application/pdf,image/*"
              ref={catalogInputRef}
              className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-[#0d923a] file:text-white
              hover:file:bg-[#0b7e32]"
            />
            {formData.katalog && (
              <button
                type="button"
                onClick={handleRemoveCatalog}
                className="mt-2 text-sm text-red-600 hover:underline"
              >
                Hapus Katalog
              </button>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-[#0d923a] text-white rounded-md hover:bg-[#0b7e32] transition-colors"
          >
            {id ? "Update Produk" : "Tambahkan Produk"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminEditProduct;
