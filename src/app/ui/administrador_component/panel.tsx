"use client"
import React, { useState, ReactElement } from 'react';
import ProductoComponent from './producto_component';
/// validar que el usuario sea administrador y que este logeado

function Panel(): ReactElement {
    const [content, setContent] = useState<ReactElement | null>(null);

    const handleProducts = () => {
        setContent(
            <>
                <ProductoComponent></ProductoComponent>
            </>
        );
    }

    const handleInicio = () => {
        setContent(
            <div>
                <h2>Inicio</h2>
                <p>Contenido de la página de inicio</p>
            </div>
        );
    }

    return (
        <div className='mb-3'>
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-6 py-4">
                    <h1 className="text-xl font-bold text-gray-800">Panel Administrador</h1>
                    <div className="flex justify-between items-center mt-2">
                        <div>
                            <span className="text-sm text-gray-600">Bienvenido, </span>
                            <span className="font-semibold">Nombre del Usuario</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Contenedor principal */}
            <div className="container mx-auto mt-6 flex mb-3">
                {/* Barra lateral */}
                <aside className="bg-gray-800 text-white w-64 min-h-screen">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold">Menú</h2>
                    </div>
                    <nav>
                        <ul className="p-2">
                            <li className="mb-2">
                                <button onClick={handleInicio} className="block px-4 py-2 hover:bg-gray-700">Inicio</button>
                            </li>
                            <li className="mb-2">
                                <button onClick={handleProducts} className="block px-4 py-2 hover:bg-gray-700">Productos</button>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="block px-4 py-2 hover:bg-gray-700">Configuración</a>
                            </li>
                        </ul>
                    </nav>
                </aside>

                {/* Área principal */}
                <main className="flex-1 ml-64 p-6 bg-white rounded-md shadow">
                    {content ? content : (
                        <>
                            <h2 className="text-2xl mb-4">Bienvenido al Panel Administrador</h2>
                            <p className="text-gray-600">Este es un ejemplo mejorado de un panel administrador creado con Tailwind CSS. En esta versión, hemos añadido un encabezado con información del usuario, estilos mejorados y funcionalidades adicionales para hacer que el panel administrador sea más completo y atractivo.</p>
                        </>
                    )}
                </main>
            </div>
        </div>
    )
}

export default Panel;
