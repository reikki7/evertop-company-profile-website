import React from 'react';
import tentangKamiIcon1 from '../assets/TentangKami1.svg';
import tentangKamiIcon2 from '../assets/TentangKami2.svg';
import tentangKamiIcon3 from '../assets/TentangKami3.svg';
import tentangKamiIcon4 from '../assets/TentangKami4.svg';
import tentangKamiIcon5 from '../assets/TentangKami5.svg';

const WhySection = () => {
    const items = [
        {
            icon: tentangKamiIcon1,
            title: "High Quality Materials",
            description: "Produk kami dibuat dengan menggunakan bahan baku yang berkualitas."
        },
        {
            icon: tentangKamiIcon2,
            title: "Professional Team",
            description: "Kami mempunyai team yang profesional, berpengalaman, dan tersetifikasi."
        },
        {
            icon: tentangKamiIcon3,
            title: "Prestigious Projects",
            description: "Produk kami sudah terpasang di berbagai proyek-proyek ternama."
        },
        {
            icon: tentangKamiIcon4,
            title: "Industry Production Experience",
            description: "Kami sudah berpengalaman dalam memproduksi atap untuk beragam proyek dan aplikasi."
        },
        {
            icon: tentangKamiIcon5,
            title: "Quality Service & Standarization",
            description: "Setiap produk atap kami sudah memenuhi standar dengan quality service yang terjaga."
        }
    ];

    return (
        <div id='tentangkami' className='px-4 py-8 bg-white md:py-16'>
            <div className='mx-auto max-w-7xl'>
                <div className='grid grid-cols-1 gap-8 mt-0 md:-mt-32 md:grid-cols-3 lg:grid-cols-5 md:gap-12'>
                    {items.map((item, index) => (
                        <div key={index} className='flex flex-col items-center tracking-normal text-center font-helvetica'>
                            <div className='flex items-center justify-center w-24 h-24 mb-4 bg-white border-none rounded-full md:border md:w-32 md:h-32'>
                                <img src={item.icon} alt={item.title} className='w-16 md:w-20 filter-red' />
                            </div>
                            <h2 className='mb-2 text-lg font-bold md:text-xl'>{item.title}</h2>
                            <p className='text-sm md:text-base'>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhySection;