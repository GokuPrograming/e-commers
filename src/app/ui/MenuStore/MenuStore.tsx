"use client"
import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import MenuStoreHeader from './MenuStoreHeader';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'; // Corrección en la importación
const jwt = require('jsonwebtoken');


const MenuStore: React.FC = () => {
    const [productos, setProductos] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
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

        fetchData();
    }, []);

    const handleAddToCart = async (productId: number) => {
        const token = Cookies.get('token');
        if (!token) {
            // Redirigir al usuario a la página de inicio de sesión si no hay token
            router.push('/pages/auth/login');
            return;
        }

        // Imprimir el token antes de intentar verificarlo
        console.log('Token recibido:', token);

        let decodedToken; // Mover la declaración aquí para evitar redeclaración

        try {
            if (typeof token !== 'string') {
                throw new Error('Token no válido');
            }

            decodedToken = jwt.verify(token, 'secreto'); // Asegúrate de usar el mismo "secreto"
            console.log('Token decodificado:', decodedToken);
             

        } catch (verificationError) {
            console.error('Error al verificar el token:', verificationError.message);
            return;
        }

        if (!decodedToken || !decodedToken.id_usuario) {
            throw new Error('Token inválido');
        }

        const userId = decodedToken.id_usuario;

        // Configurar la URL de la API y el cuerpo de la solicitud
        const apiUrl = 'http://localhost:3000/addToCar';
        const requestBody = {
            id_producto: productId,
            id_usuario: userId
        };

        // Realizar la solicitud POST a la API
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestBody)
        });

        // Verificar si la solicitud se envió correctamente
        if (!response.ok) {
            throw new Error('Error al enviar la solicitud');
        }

        console.log('Solicitud enviada con éxito');  // Mensaje de confirmación

        // Leer y mostrar la respuesta de la API
        const responseData = await response.json();
        console.log('Respuesta de la API:', responseData);

        // Mostrar mensaje de éxito al usuario
        alert('Producto agregado al carrito exitosamente');
    };

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="bg-white">
            <MenuStoreHeader />
            <section className="py-10 bg-gray-100">
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {productos.map((producto) => (
                        <ProductItem key={producto.id_producto} producto={producto} onAddToCart={handleAddToCart} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default MenuStore;
