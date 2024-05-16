"use client"
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

interface NavbarProps {
    onIconClick?: () => void;
}

const Nvar3: React.FC<NavbarProps> = ({ onIconClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Añade el estado isMenuOpen
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleIconClick = () => {
        if (onIconClick) {
            onIconClick();
        }
        setIsMenuOpen(!isMenuOpen); // Cambiar el estado del menú al hacer clic en el icono
    };
    const handleCloseMenu = () => {
        setIsMenuOpen(false); // Cierra el menú al hacer clic en el botón de "Cerrar"
    };
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {  // Define el ancho de pantalla para "full screen"
                setIsMenuOpen(false);  // Cierra el menú si la pantalla es "full screen"
                setIsFullScreen(true);
            } else {
                setIsFullScreen(false);
            }
        };

        // Escuchar cambios en el tamaño de la ventana
        window.addEventListener('resize', handleResize);

        // Limpia el evento al desmontar el componente
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (

        <nav className="flex justify-between bg-gray-900 text-white w-full">
            <div className="px-4 xl:px-8 py-6 flex w-full items-center max-w-screen-xl mx-auto">
                <a className="flex items-center text-3xl font-bold font-heading hover:text-indigo-600 transition-colors duration-300" href="#">
                    <Image src="/img/page_img/logo.jpeg" alt="Logo" className="h-10 w-auto mr-2 rounded-full shadow-md"  width={400} height={400}></Image>
                    <span className="text-gray-800"></span>
                    <h1 className="ml-4 text-lg font-semibold text-gray-600">Cuchau Store</h1>
                </a>
                <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                    <li><a className="hover:text-gray-200" href="#">Home</a></li>
                    <li><Link className="hover:text-gray-200" href={'/pages/car'}>Carrito</Link> </li>
                    <li><a className="hover:text-gray-200" href={'/pages/auth/login'}>Iniciar Sesion</a></li>
                    <li><a className="hover:text-gray-200" href="#">Collections</a></li>
                    <li><a className="hover:text-gray-200" href="#">Contact Us</a></li>
                </ul>
                {/* Menú desplegable para tamaños de pantalla pequeños */}
                {!isFullScreen && isMenuOpen && (

                    <div className="fixed inset-0 bg-gray-800 opacity-90 z-50">
                        <div className="flex justify-end pr-4 pt-4">
                            <button className="text-white" onClick={handleCloseMenu}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <ul className="flex flex-col space-y-4 text-center pt-8">
                            <li><a className="hover:text-gray-200" href="#">Home</a></li>
                            <li><Link className="hover:text-gray-200" href={'/pages/car'}>Carrito</Link></li>
                            <li><a className="hover:text-gray-200" href={'/pages/auth/login'}>Iniciar Sesion</a></li>
                            <li><a className="hover:text-gray-200" href="#">Collections</a></li>
                            <li><a className="hover:text-gray-200" href="#">Contact Us</a></li>
                        </ul>
                    </div>

                )}

            </div>
            {/* Responsive Navbar */}
            <div className='hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12' >
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
            </div>
        </nav>
    );
};

export default Nvar3;
