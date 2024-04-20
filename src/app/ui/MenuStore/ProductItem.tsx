"use client"
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { getUserIdFromToken } from '../authUtils';
const token = Cookies.get('token');

type Product = {
    id_producto: number;
    producto: string;
    precio: string;
    almacen: number;
    id_proveedor: number;
    id_categoria: number;
};

type ProductItemProps = {
    producto: Product;
    onAddToCart: (productId: number) => void; // Función para manejar "Add to cart"
};

const ProductItem: React.FC<ProductItemProps> = ({ producto, onAddToCart }) => {
    const [count, setCount] = useState(1);

     // Asegúrate de inicializarlo con los datos del producto que recibes como prop

    const handleIncrement = () => {
        setCount((prevCount) => {
            const newCount = prevCount + 1;
            return newCount;
        });
    };
    const reset = () => {
        setCount(1);
    }
    const handleDecrement = () => {
        if (count > 1) {
            setCount((prevCount) => {
                const newCount = prevCount - 1;
                return newCount;
            });
        }
    };
    // Función manejadora para el clic del botón
    const handleAddToCartClick = async () => {
        const userId = getUserIdFromToken(token);
        onAddToCart(producto.id_producto);
        const apiUrl = 'http://localhost:3000/addToCar';
        const requestBody = {
            id_producto: producto.id_producto,
            id_usuario: userId,
            cantidad: count
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            if (count > producto.almacen) {
                alert('no hay en almacen :');
                console.log(('no hay en almacen :'));
            }
            throw new Error('Error al enviar la solicitud');
        }

        console.log('Solicitud enviada con éxito');

        const responseData = await response.json();
        console.log('Respuesta de la API:', responseData);
        alert('Producto agregado al carrito exitosamente');
        reset();
    };

    return (
        <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300">
            <div className="relative flex items-end overflow-hidden rounded-xl">
                <div className="mt-1 p-2">
                    <h2 className="text-slate-700">{producto.producto}</h2>
                    <p className="mt-1 text-sm text-slate-400">ID: {producto.id_producto}</p>
                    <p className="mt-1 text-sm text-slate-400">Precio: ${producto.precio}</p>
                    <p className="mt-1 text-sm text-slate-400">Almacen: {producto.almacen} unidades</p>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handleDecrement}
                            className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
                        >
                            -
                        </button>
                        <span className="text-xl font-semibold">{count}</span>
                        <button
                            onClick={handleIncrement}
                            className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none"
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                    <button className="text-sm" onClick={handleAddToCartClick}>Add to cart</button>
                </div>
            </div>
        </article>
    );
};

export default ProductItem;
