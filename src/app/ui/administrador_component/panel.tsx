"use client"
import React, { useState, ReactElement } from 'react';
import ProductoComponent from './informacion_personal';
import PDF from './pdf_componente';
import Charts from './charts';
import DireccionForm from './DireccionForm';
import ListaPdf from './listaPdf';
/// validar que el usuario sea administrador y que este logeado
function Panel(): ReactElement {
    const [content, setContent] = useState<ReactElement | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile device on client-side
    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Change breakpoint as needed
        };
        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleProducts = () => {
        setContent(
            <>
                <ProductoComponent />
            </>
        );
    };

    const handleInicio = () => {
        setContent(
            <div>
                 <h2 className="text-2xl mb-4">Bienvenido a tu perfil</h2>
                                        <p className="text-gray-600">Este es un ejemplo mejorado de un panel administrador creado con Tailwind CSS. En esta versión, hemos añadido un encabezado con información del usuario, estilos mejorados y funcionalidades adicionales para hacer que el panel administrador sea más completo y atractivo.</p>
                {/* <DireccionForm /> */}
            </div>
        );
    };

    const handlerPDF = () => {
        setContent(
            <>
                <div>
                    <ListaPdf />
                  
                </div>
            </>
        );
    };

    const handlerCharts = () => {
        setContent(
            <div>
                <Charts />
            </div>
        );
    };

    return (
        <div className="use client"> {/* Wrap with "use client" */}
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-6 py-4">
                    <h1 className="text-xl font-bold text-gray-800">Perfil del usuario</h1>
                    <div className="flex justify-between items-center mt-2">
                        <div>
                            <span className="text-sm text-gray-600">Bienvenido, </span>
                            <span className="font-semibold">Nombre del Usuario</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mt-6 flex">
                {/* Responsive layout based on mobile state */}
                {isMobile ? (
                    <>
                        <aside className="bg-gray-800 text-white w-64 min-h-screen"> {/* Full width on mobile */}
                            <div className="p-6">
                                <h2 className="text-2xl font-bold">Menú</h2>
                            </div>
                            <nav>
                                <ul className="p-2">
                                 
                                    <li className="mb-2">
                                        <button onClick={handleProducts} className="block px-4 py-2 hover:bg-gray-700">Productos</button>
                                    </li>
                                    <li className="mb-2">
                                        <button onClick={handlerPDF} className="block px-4 py-2 hover:bg-gray-700">PDF</button>
                                    </li>
                                    <li className="mb-2">
                                        <button onClick={handlerCharts} className="block px-4 py-2 hover:bg-gray-700">Graficos</button>
                                    </li>
                                </ul>
                            </nav>
                        </aside>
                        <main className="flex-1 p-2 bg-white rounded-md shadow"> {/* Full width on mobile */}
                            {content ? content : (
                                <>
                                    <h2 className="w-6 text-2xl mb-4">Bienvenido a tu perfil</h2>
                                    <p className="text-gray-600">...</p>
                                </>
                            )}
                        </main>
                    </>
                ) : (
                    <>

                        <aside className="bg-gray-800 text-white w-64 min-h-screen">
                            <div className="p-1">
                                <h2 className="text-2xl font-bold">Menú</h2>
                            </div>
                            <nav>
                                <ul className="p-2">

                                    <li className="mb-2">
                                        <button onClick={handleProducts} className="block px-4 py-2 hover:bg-gray-700">Productos</button>
                                    </li>
                                    <li className="mb-2">
                                        <button onClick={handlerPDF} className="block px-4 py-2 hover:bg-gray-700">PDF</button>
                                    </li>
                                    <li className="mb-2">
                                        <button onClick={handlerCharts} className="block px-4 py-2 hover:bg-gray-700">Graficos</button>
                                    </li>
                                </ul>
                            </nav>
                        </aside>

                        <main className="flex-1 p-6 bg-white rounded-md shadow">
                            <div className="mx-auto max-w-xl">
                                {content ? content : (
                                    <>
                                        <h2 className="text-2xl mb-4">Bienvenido a tu perfil</h2>
                                        <p className="text-gray-600">Este es un ejemplo mejorado de un panel administrador creado con Tailwind CSS. En esta versión, hemos añadido un encabezado con información del usuario, estilos mejorados y funcionalidades adicionales para hacer que el panel administrador sea más completo y atractivo.</p>
                                    </>
                                )}
                            </div>
                        </main>
                    </>
                )}
            </div>
        </div>
    );
}

export default Panel;
