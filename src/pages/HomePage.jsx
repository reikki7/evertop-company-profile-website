import React from 'react';
import HeroBackground from '../assets/HeroBackground.png';
import HeroLogo from '../assets/HeroLogo.svg';
import WhySection from '../components/WhySection';
import TentangKami from '../components/TentangKami';
import Contact from '../components/Contact';
import HomeProject from '../components/HomeProject';
import IndonesiaMap from '../assets/IndonesiaMap.png';

const HomePage = () => {

    const handleScroll = (event, targetId) => {
        event.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const cities = [
        'Medan', 'Lampung', 'Palembang', 'Bangka', 'Jabodetabek',
        'Bandung', 'Sukabumi', 'Tasik', 'Pekalongan', 'Surabaya',
        'Denpasar', 'Samarinda', 'Balikpapan', 'Banjarmasin', 'Makassar'
    ];


    return (
        <div className='tracking-widest font-bebasneue'>
            <div className="flex justify-center overflow-hidden h-[600px]">
                <div className="relative w-full">
                    <img
                        src={HeroBackground}
                        alt="Hero Background"
                        className="absolute w-auto h-full transform -translate-x-1/2 -translate-y-1/2 md:w-full md:h-auto -z-40 top-1/2 left-1/2"
                    />
                    <div className="absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                        <img
                            src={HeroLogo}
                            alt="Icon"
                            className="h-auto mb-8 w-96"
                        />
                    </div>
                </div>
            </div>
            <WhySection />
            <div className='flex justify-center'>
                <TentangKami />
            </div>

            <div id="products">
                <HomeProject />
            </div>

            <div className='flex flex-col items-center justify-center px-1 my-8 font-bold'>
                <h2 className='mb-4 text-2xl lg:text-5xl'>Persebaran Produk <span className='text-[#0d923a]'>Evertop</span></h2>
                <img src={IndonesiaMap} alt="Indonesia Map" className='max-w-[90%]' />
                <div className="flex flex-wrap justify-center w-2/3 my-10">
                    {cities.map((city, index) => (
                        <span
                            key={index}
                            className={`m-2 text-2xl lg:text-4xl ${index % 2 === 0 ? 'text-black' : 'text-[#0d923a]'}`}
                        >
                            {city}
                        </span>
                    ))}
                </div>
            </div>


            <div id='lokasi' className='flex flex-col items-center pt-6 pb-10 '>
                <div className='m-4 space-y-2 font-bold text-center w-auto lg:w-[1200px]'>
                    <h2 className='text-2xl tracking-widest md:text-4xl'>TEMUKAN <span className='text-[#0d923a]'>LOKASI KAMI</span></h2>
                    <h2 className='tracking-wider text-2xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-[80px] leading-none'>PUSAT REVOLUSI MATERIAL KONSTRUKSI TERDEKAT ANDA</h2>
                </div>
            </div>
            <div className="flex justify-center w-full">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3965.2933401219757!2d107.1600608749915!3d-6.356061893633905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwMjEnMjEuOCJTIDEwN8KwMDknNDUuNSJF!5e0!3m2!1sen!2sid!4v1722765336226!5m2!1sen!2sid"
                    className="w-full"
                    height="500"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <div id='kontak'>
                <Contact />
            </div>
        </div>
    );
};

export default HomePage;