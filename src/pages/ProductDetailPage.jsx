import React from 'react';
import { useParams } from 'react-router-dom';
import { MdDownload } from "react-icons/md";
import EvertopDoubleLayerImage from '../assets/products/evertop-double-layer.webp';
import TopRidgeImage from '../assets/products/nok.webp';
import EvertopSingleLayerImage from '../assets/products/evertop-single-layer.webp';
import PvcTransparentImage from '../assets/products/pvc-transparent.webp';

const products = [
    {
        img: EvertopDoubleLayerImage,
        title: "UPVC Double Layer",
        description: "Upvc Double Layer No.1 Di Indonesia Di Buat dengan Performa prima menggunakan bahan baku terbaik dan dengan harga yang terjangkau. Evertop di perkuat dengan formula pelindung UV dan Radiasi intensitas cahaya matahari yang masuk ke dalam ruangan adalah sekitar 60 sampai 70%",
        ketebalan: "10mm",
        lebarFisik: "885mm",
        lebarEfektif: "830mm",
        catalogue: "/catalogue/Evertop-IG-10.png",
        keunggulan: [
            ["Sangat Kuah dan Kokoh", "Formula unik dan struktur rongganya yang pa a menjadikan EVERTOP 885 sangat kuat dan kokoh. Bahkan garansinya sampai 15 tahun."],
            ["Mampu Meredam Suara", "Rongga udara EVERTOP 885 membantu mengurangi suara dari luar, terutama saat hujan deras."],
            ["Tahan Terhadap Api dan Bahan Kimia", "EVERTOP 885 didesain untuk tahan terhadap api, pengaruh bahan kimia, dan polusi industri lainnya."],
            ["Tidak Berkarat", "EVERTOP 885 diformulasikan untuk tahan terha ap lingkungan korosif, yang tidak ada pada atap biasa. EVERTOP 885 tahan terhadap karat dan tidak mudah rapuh."],
        ],
    },
    {
        img: TopRidgeImage,
        title: "NOK / Top Ridge",
        description: "Top Ridge / Nok adalah komponen penutup atap yang terletak di bagian paling atas Tepatnya di Bagian Kedua Sisi Bertemu Membentuk bubungan. Pemasangan Nok Berguna sebagai penghalang dan pelindung terhadap air hujan, serangga, tikus, dan kotoran.",
        ketebalan: "2mm",
        lebarFisik: "885mm",
        lebarEfektif: "830mm",
        keunggulan: [
            "Membuat ruangan jadi lebih sejik dan tidak panas.",
            "Memiliki ketahanan yang baik.",
            "Bisa membuat bangunan jauh lebih cantik.",
            "Pemasangannya sangat mudah.",
            "Hemat biaya karena tidak ada biaya insulansi."
        ],
    },
    {
        img: EvertopSingleLayerImage,
        title: "UPVC Single Layer",
        description: "Merupakan atap Upvc Single layer yang cocok bagi anda dengan kebutuhan atap tahan lama dengan harga terjangkau. Sangat ringan, tidak tembus cahaya, awet, dan tahan terhadap unsur-unsur kimia.",
        ketebalan: "150mm",
        lebarFisik: "1070mm",
        lebarEfektif: "1005mm",
        catalogue: "/catalogue/Evertop-IG-12.png",
    },
    {
        img: PvcTransparentImage,
        title: "PVC Transparant",
        description: "Merupakan atap bermaterial polycarbonate mempunyai ciri yang sangat kokoh, transparant, jernih, tahan terhadap temperatur. Polycarbonate mempunyai struktur yang fleksibel sehingga gampang dilengkungkan.",
        ketebalan: "80mm",
        lebarFisik: "1070mm",
        lebarEfektif: "78mm",
        catalogue: "/catalogue/Evertop-IG-11.png",
        keunggulan: [
            ["Kuat dan Tahan Guncangan", "Bahan Polycarbonate pada SPANDEK TRANSPARAN membuatnya kuat dan cocok untuk semua aplikasi yang membutuhkan daya tahan tinggi terhadap benturan."],
            ["Bening Seperti Kaca", "Bahan Polycarbonate memiliki tingkat kejernihan dan transparan yang hampir sama seperti kaca."],
            ["Lebih Ringan dari Kaca", "Bahan Polycarbonate juga sangat ringan dan mudah dibawa, sehingga memudahkan pemasangan dan menghemat biaya struktural Anda."],
            ["Dapat Mentransmisikan Cahaya", "Bahan Polycarbonate memiliki kemampuan mentransmisikan cahaya sangat baik. Bahkan penggunaannya dapat mengurangi konsumsi energi penerangan listrik."]
        ],
    },
];

const ProductDetailPage = () => {
    const { productName } = useParams();

    const product = products.find(p => p.title.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '') === productName);

    if (!product) {
        return <div className="container px-4 py-8 mx-auto text-center font-helvetica">Produk tidak ditemukan.</div>;
    }

    const [firstWord, ...restOfTitle] = product.title.split(' ');

    const renderKeunggulan = () => {
        if (!product.keunggulan) return null;

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
        } else if (typeof product.keunggulan[0] === 'string') {
            // Simple list of keunggulan
            return (
                <div className="mt-8">
                    <h2 className="mb-4 text-2xl font-bold">Keunggulan</h2>
                    <ul className="space-y-2 list-disc list-inside">
                        {product.keunggulan.map((item, index) => (
                            <li key={index} className="text-gray-600">{item}</li>
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
                <img src={product.img} alt={product.title} className="object-cover w-full h-auto shadow-2xl" />
                <div>
                    <h1 className="mb-4 text-5xl font-bold tracking-wider font-bebasneue">
                        <span className="text-[#0d923a]">{firstWord}</span> {restOfTitle.join(' ')}
                    </h1>
                    <p className="mb-6 text-gray-600">{product.description}</p>
                    {renderKeunggulan()}
                    <div className="mt-8 space-y-4">
                        <div className="flex justify-between pb-2 border-b">
                            <span className="font-semibold">Ketebalan:</span>
                            <span>{product.ketebalan}</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b">
                            <span className="font-semibold">Lebar Fisik:</span>
                            <span>{product.lebarFisik}</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b">
                            <span className="font-semibold">Lebar Efektif:</span>
                            <span>{product.lebarEfektif}</span>
                        </div>
                    </div>
                    <a
                        href={product.catalogue}
                        download={`${product.title} Catalogue.png`}
                        className="flex items-center justify-center px-4 py-3 mt-8 text-2xl text-white transition duration-300 bg-green-600 font-bebasneue hover:bg-green-700"
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
