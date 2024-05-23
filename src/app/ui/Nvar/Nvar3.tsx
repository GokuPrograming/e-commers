import Link from 'next/link';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import Image from 'next/image';

interface NavbarProps {
    onIconClick?: () => void;
}

const Nvar2: React.FC<NavbarProps> = ({ onIconClick }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const redirectToPage = (path: string) => {
        window.location.href = path;
    };

    const handlerStore = () => {
        redirectToPage('/pages/Tienda');
    };
    const handlerLogin = () => {
        redirectToPage('/pages/auth/login');
    };

    return (
        <nav className="bg-gray-900 text-white w-full">
            <div className="px-4 py-3 md:px-8 flex justify-between items-center">
                <div className="flex items-center">
                    <a className="flex items-center text-xl font-bold font-heading hover:text-indigo-600 transition-colors duration-300" href="#">
                        <Image src="/img/page_img/logo.jpeg" alt="Logo" className="h-8 w-auto mr-2 rounded-full shadow-md" height={400} width={400} />
                        <h1 className="text-md font-semibold text-gray-600">Cuchau Store</h1>
                    </a>
                </div>
                <div className="hidden md:flex items-center space-x-4">
                    <ul className="flex space-x-8 font-semibold font-heading">
                        <li><Link href={'/pages/Tienda'}>Tienda</Link></li>
                        <li><a className="hover:text-gray-200" href={'/pages/auth/registro'}>Registro</a></li>
                        <li><a className="hover:text-gray-200" href={'/pages/auth/login'}>Login</a></li>
                    </ul>
                </div>
                <div className="md:hidden flex items-center">
                    <button className="text-white focus:outline-none" onClick={toggleMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
                <ul className="px-4 py-2 space-y-2">
                    <li>
                        <a className="block hover:text-gray-200" href="/pages/Tienda">
                            Tienda
                        </a>
                    </li>
                    <li>
                        <a className="block hover:text-gray-200" href="/pages/auth/registro">
                            Registro
                        </a>
                    </li>
                    <li>
                        <a className="block hover:text-gray-200" href="/pages/auth/login">
                            Iniciar sesion
                        </a>
                    </li>
      
                </ul>
               
                {/* <button className="flex items-center px-4 py-2 space-x-2" >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6a4 4 0 100 8 4 4 0 000-8z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a8 8 0 11-16 0 8 8 0 0116 0z" />
                    </svg>
                    <span>Perfil</span>
                </button> */}

            </div>
        </nav>



    );
};

export default Nvar2;
