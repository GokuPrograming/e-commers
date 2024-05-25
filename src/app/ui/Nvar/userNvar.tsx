"use client"
import Link from 'next/link';
import React from 'react';

interface NavbarProps {
    onIconClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onIconClick }) => {
    const handleIconClick = () => {
        if (onIconClick) {
            onIconClick();
        }
    };

    return (

        <nav className="flex justify-between bg-gray-900 text-white w-screen">
            <div className="px-5 xl:px-12 py-6 flex w-full items-center">
                <a className="text-3xl font-bold font-heading" href="#">
                    Logo Here.
                    <h1>barra de navegacion usuario</h1>
                </a>
                <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                    <li><a className="hover:text-gray-200" href="#">Home</a></li>
                    <li><Link className="hover:text-gray-200" href={'/pages/car'}>Carrito</Link> </li>
                    <li><a className="hover:text-gray-200" href="#">Category</a></li>
                    <li><a className="hover:text-gray-200" href="#">Collections</a></li>
                    <li><a className="hover:text-gray-200" href="#">Contact Us</a></li>
                </ul>
                <div className="hidden xl:flex items-center space-x-5 items-center">
                    {/* Header Icons */}
                    <button className="hover:text-gray-200" onClick={handleIconClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                    {/* Other Icons */}
                    <button className="flex items-center hover:text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
            </div>
            {/* Responsive Navbar */}
            <button className="xl:hidden flex mr-6 items-center" onClick={handleIconClick}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            </button>
            <button className="navbar-burger self-center mr-12 xl:hidden" onClick={handleIconClick}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </nav>
    );
};

export default Navbar;
