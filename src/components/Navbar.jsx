import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import CompanyIcon from '../assets/CompanyIcon.jpg';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [targetId, setTargetId] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTargetId(null);
            }
        }
    }, [location, targetId]);

    const handleScroll = (event, targetId) => {
        event.preventDefault();
        setTargetId(targetId);
        navigate('/');
    };

    const handleHomeClick = (event) => {
        event.preventDefault();
        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/');
        }
    };

    return (
        <nav className="z-50 w-full bg-white shadow-md md:sticky md:top-0">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:justify-center">
                    <div className="items-center block md:hidden">
                        <img src={CompanyIcon} className='w-28' alt="Company Icon" />
                    </div>
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="text-gray-800 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                    <div className="hidden tracking-widest md:block font-bebasneue">
                        <ul className="flex space-x-8">
                            <li>
                                <a href="/" onClick={handleHomeClick} className="text-4xl text-gray-800 duration-100 hover:text-[#c32425]">BERANDA</a>
                            </li>
                            <li>
                                <Link to="/produk" className="text-4xl text-gray-800 duration-100 hover:text-[#c32425]">PRODUK</Link>
                            </li>
                            <li>
                                <a href="/" onClick={(e) => handleScroll(e, 'lokasi')} className="text-4xl text-gray-800 duration-100 hover:text-[#c32425]">LOKASI</a>
                            </li>
                            <li>
                                <a href="/" onClick={(e) => handleScroll(e, 'kontak')} className="text-4xl text-gray-800 duration-100 hover:text-[#c32425]">KONTAK</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div
                className={`${isOpen ? 'max-h-screen' : 'max-h-0'} overflow-hidden transition-all duration-300 md:hidden`}
                id="mobile-menu"
                style={{ position: 'absolute', width: '100%', backgroundColor: 'white' }}
            >
                <ul className="px-4 pt-2 pb-6 space-y-5 sm:px-3 font-helvetica">
                    <li>
                        <a href="/" onClick={handleHomeClick} className="block text-xl font-bold text-gray-800 hover:text-red-600">Beranda</a>
                    </li>
                    <li>
                        <Link to="/produk" className="block text-xl font-bold text-gray-800 hover:text-[#0d923a]">Produk</Link>
                    </li>
                    <li>
                        <a href="/" onClick={(e) => handleScroll(e, 'lokasi')} className="block text-xl font-bold text-gray-800 hover:text-red-600">Lokasi</a>
                    </li>
                    <li>
                        <a href="/" onClick={(e) => handleScroll(e, 'kontak')} className="block text-xl font-bold text-gray-800 hover:text-red-600">Kontak</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
