"use client"
import React, { useState, ReactElement } from 'react';
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
                <div className="overflow-x-auto ">
                    <h2 className="text-lg font-semibold mb-4">Lista de Productos</h2>
                    <table className="min-w-full max-w-full overflow-auto">
                        <thead className="sticky top-0 bg-white">
                            <tr>
                                <th className="px-4 py-2">Categoría</th>
                                <th className="px-4 py-2">Stock</th>
                                <th className="px-4 py-2">Proveedor</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-gray-100">
                                {/* <td className="px-4 py-2"><img src="url_de_la_imagen" alt="Producto" className="h-12 w-12 object-cover rounded" /></td> */}
                                <td className="px-4 py-2">Categoría A</td>
                                <td className="px-4 py-2">10</td>
                                <td className="px-4 py-2">Proveedor X</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>
        );
    };

    const handleUsers = () => {
        setContent(
            <>

                <div className="rounded-xl border border-gray-200 bg-white py-6 px-4 shadow-md max-h-80 overflow-y-auto">
                    <h2 className="text-lg font-semibold mb-4 text-center">Lista de Usuarios</h2>
                    <div className="rounded-xl border border-gray-200 bg-white py-6 px-4 shadow-md max-h-100 overflow-y-auto">
                        <table className="min-w-full max-w-full overflow-auto">
                            <thead className="sticky top-0 bg-white">
                                <tr>
                                    <th className="px-4 py-2">Nombre</th>
                                    <th className="px-4 py-2">Rol</th>
                                    <th className="px-4 py-2">Asignar Rol</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-gray-100" >
                                    <td className="px-4 py-2 text-center">Usuario 1</td>
                                    <td className="px-4 py-2 text-center">Admin</td>
                                    <td className="px-4 py-2 text-center">
                                        <select className="px-4 py-2 text-center">
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr className="bg-gray-100" >
                                    <td className="px-4 py-2 text-center">Usuario 1</td>
                                    <td className="px-4 py-2 text-center">Admin</td>
                                    <td className="px-4 py-2 text-center">
                                        <select className="px-4 py-2 text-center">
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr className="bg-gray-100" >
                                    <td className="px-4 py-2 text-center">Usuario 1</td>
                                    <td className="px-4 py-2 text-center">Admin</td>
                                    <td className="px-4 py-2 text-center">
                                        <select className="px-4 py-2 text-center">
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr className="bg-gray-100" >
                                    <td className="px-4 py-2 text-center">Usuario 1</td>
                                    <td className="px-4 py-2 text-center">Admin</td>
                                    <td className="px-4 py-2 text-center">
                                        <select className="px-4 py-2 text-center">
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                        </select>
                                    </td>
                                </tr>

                                <tr className="bg-gray-100" >
                                    <td className="px-4 py-2 text-center">Usuario 1</td>
                                    <td className="px-4 py-2 text-center">Admin</td>
                                    <td className="px-4 py-2 text-center">
                                        <select className="px-4 py-2 text-center">
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr className="bg-gray-100" >
                                    <td className="px-4 py-2 text-center">Usuario 1</td>
                                    <td className="px-4 py-2 text-center">Admin</td>
                                    <td className="px-4 py-2 text-center">
                                        <select className="px-4 py-2 text-center">
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr className="bg-gray-100" >
                                    <td className="px-4 py-2 text-center">Usuario 1</td>
                                    <td className="px-4 py-2 text-center">Admin</td>
                                    <td className="px-4 py-2 text-center">
                                        <select className="px-4 py-2 text-center">
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>

            </>
        );
    };

    const handleSales = () => {
        setContent(
            <>
                <div className="text-xl font-bold mb-4 text-center">Ventas Totales</div>
                <div className="overflow-x-auto">
                    <div className="text-lg font-semibold mb-4 text-center">Total de ventas semanales</div>
                    <div className="rounded-xl border border-gray-200 bg-white py-6 shadow-md max-h-80 overflow-y-auto">
                        <table className="min-w-full max-w-full overflow-auto">
                            <thead className="sticky top-0 bg-white">
                                <tr>
                                    <th className="px-4 py-2 text-center">Semana</th>
                                    <th className="px-4 py-2 text-center">No. semana</th>
                                    <th className="px-4 py-2 text-center">Mes</th>
                                    <th className="px-4 py-2 text-center">Año</th>
                                    <th className="px-4 py-2 text-center">Total ventas de la semana</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2 text-center">1</td>
                                    <td className="px-4 py-2 text-center">55</td>
                                    <td className="px-4 py-2 text-center">1</td>
                                    <td className="px-4 py-2 text-center">55</td>
                                    <td className="px-4 py-2 text-center">1</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 text-center">1</td>
                                    <td className="px-4 py-2 text-center">55</td>
                                    <td className="px-4 py-2 text-center">1</td>
                                    <td className="px-4 py-2 text-center">55</td>
                                    <td className="px-4 py-2 text-center">1</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 text-center">1</td>
                                    <td className="px-4 py-2 text-center">55</td>
                                    <td className="px-4 py-2 text-center">1</td>
                                    <td className="px-4 py-2 text-center">55</td>
                                    <td className="px-4 py-2 text-center">1</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 text-center">1</td>
                                    <td className="px-4 py-2 text-center">55</td>
                                    <td className="px-4 py-2 text-center">1</td>
                                    <td className="px-4 py-2 text-center">55</td>
                                    <td className="px-4 py-2 text-center">1</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 text-center">1</td>
                                    <td className="px-4 py-2 text-center">55</td>
                                    <td className="px-4 py-2 text-center">1</td>
                                    <td className="px-4 py-2 text-center">55</td>
                                    <td className="px-4 py-2 text-center">1</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 text-center">1</td>
                                    <td className="px-4 py-2 text-center">55</td>
                                    <td className="px-4 py-2 text-center">1</td>
                                    <td className="px-4 py-2 text-center">55</td>
                                    <td className="px-4 py-2 text-center">1</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 text-center">1</td>
                                    <td className="px-4 py-2 text-center">55</td>
                                    <td className="px-4 py-2 text-center">1</td>
                                    <td className="px-4 py-2 text-center">55</td>
                                    <td className="px-4 py-2 text-center">1</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 text-center">1</td>
                                    <td className="px-4 py-2 text-center">55</td>
                                    <td className="px-4 py-2 text-center">1</td>
                                    <td className="px-4 py-2 text-center">55</td>
                                    <td className="px-4 py-2 text-center">1</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 text-center">1</td>
                                    <td className="px-4 py-2 text-center">55</td>
                                    <td className="px-4 py-2 text-center">1</td>
                                    <td className="px-4 py-2 text-center">55</td>
                                    <td className="px-4 py-2 text-center">1</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 text-center">1</td>
                                    <td className="px-4 py-2 text-center">55</td>
                                    <td className="px-4 py-2 text-center">1</td>
                                    <td className="px-4 py-2 text-center">55</td>
                                    <td className="px-4 py-2 text-center">1</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
                <br /><br /><br />

                <h3 className="text-lg font-semibold mb-4 text-center">Total de Venta por Producto</h3>
                <div className="rounded-xl border border-gray-200 bg-white py-6 shadow-md max-h-80 overflow-y-auto">
                    <table className="min-w-full max-w-full overflow-auto">
                        <thead className="sticky top-0 bg-white">
                            <tr>
                                <th className="px-4 py-2 text-center">Producto</th>
                                <th className="px-4 py-2 text-center">Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-4 py-2 text-center">1</td>
                                <td className="px-4 py-2 text-center">55</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-center">1</td>
                                <td className="px-4 py-2 text-center">55</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-center">1</td>
                                <td className="px-4 py-2 text-center">55</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-center">1</td>
                                <td className="px-4 py-2 text-center">55</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-center">1</td>
                                <td className="px-4 py-2 text-center">55</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-center">1</td>
                                <td className="px-4 py-2 text-center">55</td>
                            </tr>   <tr>
                                <td className="px-4 py-2 text-center">1</td>
                                <td className="px-4 py-2 text-center">55</td>
                            </tr>   <tr>
                                <td className="px-4 py-2 text-center">1</td>
                                <td className="px-4 py-2 text-center">55</td>
                            </tr>   <tr>
                                <td className="px-4 py-2 text-center">1</td>
                                <td className="px-4 py-2 text-center">55</td>
                            </tr>   <tr>
                                <td className="px-4 py-2 text-center">1</td>
                                <td className="px-4 py-2 text-center">55</td>
                            </tr>   <tr>
                                <td className="px-4 py-2 text-center">1</td>
                                <td className="px-4 py-2 text-center">55</td>
                            </tr>   <tr>
                                <td className="px-4 py-2 text-center">1</td>
                                <td className="px-4 py-2 text-center">55</td>
                            </tr>   <tr>
                                <td className="px-4 py-2 text-center">1</td>
                                <td className="px-4 py-2 text-center">55</td>
                            </tr>   <tr>
                                <td className="px-4 py-2 text-center">1</td>
                                <td className="px-4 py-2 text-center">55</td>
                            </tr>   <tr>
                                <td className="px-4 py-2 text-center">1</td>
                                <td className="px-4 py-2 text-center">55</td>
                            </tr>   <tr>
                                <td className="px-4 py-2 text-center">1</td>
                                <td className="px-4 py-2 text-center">55</td>
                            </tr>   <tr>
                                <td className="px-4 py-2 text-center">1</td>
                                <td className="px-4 py-2 text-center">55</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br /><br /><br />
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
