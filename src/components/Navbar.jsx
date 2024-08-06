import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import CompanyIcon from '../assets/CompanyIcon.jpg';

import { IoMdHome, IoMdCube, IoMdNavigate, IoMdContact } from "react-icons/io";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [targetId, setTargetId] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const mobileMenuRef = useRef(null);
    const toggleButtonRef = useRef(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const openNavbar = () => {
        setIsOpen(true);
    };

    const closeNavbar = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        if (targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTargetId(null);
            }
        }
    }, [location, targetId]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen &&
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target) &&
                !toggleButtonRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            setIsTransitioning(true);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            setTimeout(() => {
                setIsTransitioning(false);
            }, 300);
        }
    }, [isOpen]);

    const handleScroll = (event, targetId) => {
        event.preventDefault();
        setTargetId(targetId);
        navigate('/');
        setIsOpen(false);
    };

    const handleHomeClick = (event) => {
        event.preventDefault();
        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/');
        }
        setIsOpen(false);
    };

    return (
        <>
            <nav className="fixed z-50 w-full bg-white shadow-md md:sticky md:top-0">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:justify-center">
                        <div className="items-center block md:hidden">
                            <img src={CompanyIcon} className='w-28' alt="Company Icon" />
                        </div>
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={isOpen ? closeNavbar : openNavbar}
                                type="button"
                                className="text-gray-800 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                                aria-controls="mobile-menu"
                                aria-expanded={isOpen}
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
                    ref={mobileMenuRef}
                    className={`${isOpen ? 'max-h-screen' : 'max-h-0'} overflow-hidden transition-all duration-300 md:hidden`}
                    id="mobile-menu"
                    style={{ position: 'absolute', width: '100%', backgroundColor: 'white' }}
                >
                    <ul className="px-4 pt-2 pb-6 space-y-5 sm:px-3 font-helvetica">
                        <li className='flex items-center gap-3'>
                            <IoMdHome size={22} /><a href="/" onClick={handleHomeClick} className="block text-xl font-bold text-gray-800 hover:text-red-600">Beranda</a>
                        </li>
                        <li className='flex items-center gap-3'>
                            <IoMdCube size={22} /><Link to="/produk" onClick={() => setIsOpen(false)} className="block text-xl font-bold text-gray-800 hover:text-[#0d923a]">Produk</Link>
                        </li>
                        <li className='flex items-center gap-3'>
                            <IoMdNavigate size={22} /><a href="/" onClick={(e) => handleScroll(e, 'lokasi')} className="block text-xl font-bold text-gray-800 hover:text-red-600">Lokasi</a>
                        </li>
                        <li className='flex items-center gap-3'>
                            <IoMdContact size={22} /><a href="/" onClick={(e) => handleScroll(e, 'kontak')} className="block text-xl font-bold text-gray-800 hover:text-red-600">Kontak</a>
                        </li>
                    </ul>
                </div>
            </nav>
            {(isOpen || isTransitioning) && (
                <div
                    className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out z-40 ${isOpen ? 'opacity-50' : 'opacity-0'
                        }`}
                    onClick={closeNavbar}
                ></div>
            )}
        </>
    );
};

export default Navbar;