
"use client"
import Link from 'next/link';
import Cookies from 'js-cookie';
import React, { useState } from 'react';

interface NavbarProps {
    onIconClick?: () => void;
}

const Nvar2: React.FC<NavbarProps> = ({ onIconClick }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleIconClick = () => {
        if (onIconClick) {
            onIconClick();
        }
    };

    const handleLogout = () => {
        // Eliminar el token y los datos del usuario de las cookies al cerrar sesión
        Cookies.remove('token');
        Cookies.remove('user');

        setIsLoggedIn(false);
        redirectToPage('/pages/auth/login');
    };
    const redirectToPage = (path: string) => {
        window.location.href = path;
    };
    return (

        <nav className="flex justify-between bg-gray-900 text-white w-full">
            <div className="px-4 xl:px-8 py-6 flex w-full items-center max-w-screen-xl mx-auto">
                <a className="flex items-center text-3xl font-bold font-heading hover:text-indigo-600 transition-colors duration-300" href="#">
                    <img src="https://th.bing.com/th/id/OIG4.FKjUYSWxUeGVAF0wIHlZ?w=1024&h=1024&rs=1&pid=ImgDetMain" alt="Logo" className="h-10 w-auto mr-2 rounded-full shadow-md" />
                    <span className="text-gray-800"></span>
                    <h1 className="ml-4 text-lg font-semibold text-gray-600">Cuchau Store</h1>
                </a>


                <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                    <li><a className="hover:text-gray-200" href="#">Home</a></li>
                    <li><Link className="hover:text-gray-200" href={'/pages/car'}>Carrito</Link> </li>
                    <li><a className="hover:text-gray-200" href="#">Category</a></li>
                    <li><a className="hover:text-gray-200" href="#">Collections</a></li>
                    <li> <button onClick={handleLogout}>Logout</button></li>
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

export default Nvar2;
