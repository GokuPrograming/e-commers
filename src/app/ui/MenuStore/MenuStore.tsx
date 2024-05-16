"use client"
import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import MenuStoreHeader from './MenuStoreHeader';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'; // Corrección en la importación
//tokens
import { getUserIdFromToken } from '../authUtils';
import { getrolIdFromToken } from '../getrolID';
//api
import { loadData } from '@/app/api/Todos_los_productos'; // Asegúrate de que la ruta de importación sea correcta

const token = Cookies.get('token');
const MenuStore: React.FC = () => {
    const [productos, setProductos] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            // router.push('/pages/auth/login');
            if (isLoading) {
                loadData(setProductos, setIsLoading, setError);
            }
        } else {
            if (isLoading) {
                loadData(setProductos, setIsLoading, setError);
            }
        }
    }, [isLoading, router]);

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
        loadData(setProductos, setIsLoading, setError);
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
