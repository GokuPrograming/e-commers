"use client"
import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import MenuStoreHeader from './MenuStoreHeader';
import Counter from './contador';
import Cookies from 'js-cookie';

import { useRouter } from 'next/navigation'; // Corrección en la importación
import { getUserIdFromToken } from '../authUtils';
import { getrolIdFromToken } from '../getrolID';
// Importar la función de utilidad
// import { useRouter } from 'next/navigation'; // Esta importación ya no es necesaria
const token = Cookies.get('token');
const id_rol = getrolIdFromToken(token);


const MenuStore: React.FC = () => {
    const [productos, setProductos] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const redirectToPage = (path: string) => {
        window.location.href = path;
    };

    // aqui s evalida si entra o no a la pagina
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/product');
            if (!response.ok) {
                throw new Error('No se pudo obtener los datos');
            }
            const data = await response.json();
            setProductos(data.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error al obtener los datos:', error instanceof Error ? error.message : String(error));
            setError(error instanceof Error ? error.message : String(error));
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            // Si hay un token válido, redirigir al usuario a la tienda
            //redirectToPage('pages/Tienda');
        } else {
            // Si no hay un token válido, redirigir al usuario a la página principal
            router.push('/pages/auth/login');
        }
        fetchData();
    }, []);

    const handleAddToCart = async () => {
        const token = Cookies.get('token');
        if (!token) {
            router.push('/pages/auth/login');
            return;
        }
        const userId = getUserIdFromToken(token); // Utilizar la función de utilidad
        if (!userId) {
            console.error('Error al obtener el id_usuario del token');
            return;
        }

        // Llamar a fetchData nuevamente para actualizar los datos
        await fetchData();
    }

    return (
        <div className="bg-white">
            <MenuStoreHeader />
            <section className="py-10 bg-gray-100">
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {productos.map((producto) => (
                        <ProductItem
                            key={producto.id_producto}
                            producto={producto}
                            onAddToCart={handleAddToCart}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default MenuStore;
