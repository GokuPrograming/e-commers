"use client"
import React, { useState, ReactElement } from 'react';
import Productos_panel_component from './Productos_panel_component';
import User_panel_component from './User_panel_component';
import Venta_producto_component from './venta_producto_component';
import Venta_totales from './venta_totales';
import Charts from './charts';
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
                <Productos_panel_component></Productos_panel_component>
            </>
        );
    };

    const handleUsers = () => {
        setContent(
            <>
<User_panel_component></User_panel_component>
            </>
        );
    };

    const handleSales = () => {
        setContent(
            <>
             <Venta_producto_component></Venta_producto_component>
             <Venta_totales></Venta_totales>
                <Charts></Charts>
            </>
        );
    };

    const handleStatistics = () => {
        setContent(
            <>
                <h2>Estadísticas Generales</h2>
                <p>Total de Clientes Registrados: 100</p>
                <p>Total de Órdenes: 500</p>
                <p>Total de Productos Comprados: 1000</p>
            </>
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
                        <button onClick={handleUsers} className="px-4 py-2 hover:bg-gray-700">Usuarios</button>
                    </li>
                    <li className="mr-4">
                        <button onClick={handleSales} className="px-4 py-2 hover:bg-gray-700">Ventas</button>
                    </li>
                    <li>
                        <button onClick={handleStatistics} className="px-4 py-2 hover:bg-gray-700">Estadísticas</button>
                    </li>
                </ul>
                <select className="md:hidden" onChange={(e) => {
                    const selectedOption = e.target.value;
                    switch (selectedOption) {
                        case 'Productos':
                            handleProducts();
                            break;
                        case 'Usuarios':
                            handleUsers();
                            break;
                        case 'Ventas':
                            handleSales();
                            break;
                        case 'Estadísticas':
                            handleStatistics();
                            break;
                        default:
                            break;
                    }
                }}>
                    <option value="Productos">Productos</option>
                    <option value="Usuarios">Usuarios</option>
                    <option value="Ventas">Ventas</option>
                    <option value="Estadísticas">Estadísticas</option>
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
