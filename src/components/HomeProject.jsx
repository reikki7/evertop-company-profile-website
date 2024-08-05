import React from 'react';
import HomeProjectImage1 from '../assets/Evertop-IG-10.webp';
import HomeProjectImage2 from '../assets/Evertop-IG-11.webp';
import HomeProjectImage3 from '../assets/Evertop-IG-12.webp';
import { Link } from 'react-router-dom';
import { MdArrowForwardIos } from "react-icons/md";

const HomeProject = () => {
    return (
        <section id='produk' className="pt-12 py-9 pb-14">
            <div className="container px-4 mx-auto">
                <h2 className="mb-12 text-4xl font-bold text-center md:text-5xl">
                    Produk <span className="text-[#0d923a]">Evertop</span>
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {[
                        { img: HomeProjectImage3, title: "Single Layer 835" },
                        { img: HomeProjectImage1, title: "uPVC Twin Wall 885" },
                        { img: HomeProjectImage2, title: "Polycarbonate 1072" },
                    ].map((product, index) => (
                        <div key={index} className="relative overflow-hidden shadow-2xl group">
                            <img
                                src={product.img}
                                alt={`Product ${index + 1}`}
                                className="object-cover w-full transition duration-300 h-96 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 flex items-center justify-center transition duration-300 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
                                <h3 className="text-2xl font-bold text-center text-white">
                                    {product.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex justify-center text-center'>
                <Link to="/produk" className='flex items-center justify-center w-64 py-2 mt-10 text-2xl tracking-normal duration-150 border-2 border-green-800 hover:scale-[102%]'>
                    Tampilkan Semua Produk
                    <MdArrowForwardIos className='w-8 h-8 ml-1 text-green-800' />
                </Link>
            </div>
        </section>
    );
};

export default HomeProject;