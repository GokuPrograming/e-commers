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

        <div className="use-client">
            {/* User profile header */}
            <header className="bg-white shadow-sm">
                <div className="py-3 md:px-8 flex justify-center items-center">
                    {/* <h1 className="text-xl font-bold text-gray-800">Perfil del usuario</h1> */}
                    <br />
                    <div className="flex justify-between items-center mt-2">
                        <div>
                            <span className="text-sm text-gray-600">Bienvenido, </span>
                            <span className="font-semibold">Nombre del Usuario</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Horizontal menu */}
            <nav className="md:flex items-center justify-center space-x-4 w-full">
                <ul className="hidden md:flex space-x-8 font-semibold font-heading">
                    <li className="mr-4">
                        <button onClick={handleProducts} className="px-4 py-2 hover:bg-gray-700">Productos</button>
                    </li>
                    <li className="mr-4">
                        <button onClick={handlerPDF} className="px-4 py-2 hover:bg-gray-700">PDF</button>
                    </li>
                    <li className="mr-4">
                        <button onClick={handlerCharts} className="px-4 py-2 hover:bg-gray-700">Charts</button>
                    </li>

                </ul>
                <select className="md:hidden" onChange={(e) => {
                    const selectedOption = e.target.value;
                    switch (selectedOption) {
                        case 'Productos':
                            handleProducts();
                            break;
                        case 'PDF':
                            handlerPDF();
                            break;
                        case 'Charts':
                            handlerCharts();
                            break;

                        default:
                            break;
                    }
                }}>
                    <option value="Productos">Productos</option>
                    <option value="PDF">PDF</option>
                    <option value="Estadísticas">Charts</option>
                </select>
            </nav>

            <br /><br />
            <main className="container mx-auto flex items-center justify-center">
                <div className="max-w-xl">
                    {content ? content : (
                        <><br />
                            <h2 className="text-2xl mb-4 px-6 py-4 text-center">Bienvenido Usuario Administrador</h2>
                            <p className="text-gray-600 text-center">Administra con pasión, lidera con compasión</p>
                        </>
                    )}
                </div>
            </main>
            <br /><br /><br /><br />
        </div>
    );
}

export default Panel;
