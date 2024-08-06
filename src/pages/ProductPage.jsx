import React from 'react';
import { Link } from 'react-router-dom';
import EvertopDoubleLayerImage from '../assets/products/evertop-double-layer.webp';
import TopRidgeImage from '../assets/products/nok.webp';
import EvertopSingleLayerImage from '../assets/products/evertop-single-layer.webp';
import PvcTransparentImage from '../assets/products/pvc-transparent.webp';

const products = [
    {
        img: EvertopDoubleLayerImage,
        title: "UPVC Double Layer",
        description: "Upvc Double Layer No.1 Di Indonesia Di Buat dengan Performa prima menggunakan bahan baku terbaik dan dengan harga yang terjangkau. Evertop di perkuat dengan formula pelindung UV dan Radiasi intensitas cahaya matahari yang masuk ke dalam ruangan adalah sekitar 60 sampai 70%"
    },
    {
        img: TopRidgeImage,
        title: "NOK / Top Ridge",
        description: "Top Ridge / Nok adalah komponen penutup atap yang terletak di bagian paling atas Tepatnya di Bagian Kedua Sisi Bertemu Membentuk bubungan. Pemasangan Nok Berguna sebagai penghalang dan pelindung terhadap air hujan, serangga, tikus, dan kotoran."
    },
    {
        img: EvertopSingleLayerImage,
        title: "UPVC Single Layer",
        description: "Merupakan atap Upvc Single layer yang cocok bagi anda dengan kebutuhan atap tahan lama dengan harga terjangkau. Sangat ringan, tidak tembus cahaya, awet, dan tahan terhadap unsur-unsur kimia."
    },
    {
        img: PvcTransparentImage,
        title: "PVC Transparent",
        description: "Merupakan atap bermaterial polycarbonate mempunyai ciri yang sangat kokoh, transparan, jernih, tahan terhadap temperatur. Polycarbonate mempunyai struktur yang fleksibel sehingga gampang dilengkungkan."
    },
];

const ProductPage = () => {
    return (
        <div className="container px-4 py-12 mx-auto font-helvetica">
            <h1 className="mb-12 text-4xl font-bold tracking-wider text-center font-bebasneue">Produk <span className='text-[#0d923a]'>Kami</span></h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product, index) => (
                    <Link
                        key={index}
                        to={`/produk/${product.title.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '')}`}
                        className="relative overflow-hidden shadow-2xl group"
                    >
                        <img
                            src={product.img}
                            alt={product.title}
                            className="object-cover w-full transition duration-300 h-96 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 flex items-center justify-center transition duration-300 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
                            <div className="px-4 text-center text-white">
                                <p>{product.description}</p>
                            </div>
                        </div>
                        <div className="absolute bottom-0 w-full py-2 bg-white bg-opacity-60">
                            <h3 className="text-lg font-bold text-center">{product.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
            <div className='flex justify-center mt-12 text-center'>
            </div>
        </div>
    );
};

export default ProductPage;