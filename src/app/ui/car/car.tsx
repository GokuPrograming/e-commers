"use client"
import { useRouter } from 'next/navigation'; // Corrección en la importación
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { getUserIdFromToken } from '../authUtils'; // Importar la función de utilidad
import Cupon from './cupon';
import { fetchCartItems } from '@/app/api/carrito';

interface CartItem {
  id_producto: number;
  id_usuario: number;
  producto: string;
  cantidad: string;
  sub_total: string;
  total: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<number | null>(null); // Estado para almacenar el id_usuario
  const [total, setTotal] = useState<number | null>();
  const router = useRouter();
  const token = Cookies.get('token');
  const userIdFromToken = getUserIdFromToken(token);

  useEffect(() => {
    if (!token) {
      router.push('/pages/auth/login');
      return; // Salir del useEffect si no hay token
    }
    const fetchTotalCar = async () => {
      try {
        // Obtener el id_usuario del token
        setUserId(userIdFromToken);
        const apiUrl = 'https://api-cuchau-store-pg.onrender.com/user/car/total';
        // Realizar la solicitud POST a la API
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            id_usuario: userIdFromToken // Utilizar el id_usuario obtenido del token
          })
        });
        // Verificar si la solicitud se envió correctamente
        if (!response.ok) {
          throw new Error('No se pudo obtener los datos');
        }
        const responseData = await response.json();
        // console.log('Respuesta de la API:', responseData.data); // Imprimir la respuesta en la consola
        const totalFromResponse = responseData.data[0]?.total;

        if (totalFromResponse) {
          const parsedTotal = parseFloat(totalFromResponse); // Convertir el string a número
          setTotal(parsedTotal);
          console.log("la respuesta ", parsedTotal);
        }
        setLoading(false);

      } catch (error) {
        console.error('Error al obtener los productos del carrito:', error);
        setLoading(false);
      }
    };


    const fetchData = async () => {
      try {
        await fetchCartItems(setCartItems, setUserId, setLoading);
        fetchTotalCar();
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      }
    };

    fetchData();

  }, [token]);
  const handleToPedido = async () => {
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
    router.push('/pages/pedido');
  }

  const removeFromCart = async (id_producto: number): Promise<void> => {
    const userIdFromToken = getUserIdFromToken(token || '');
    setUserId(userIdFromToken);
    const apiUrl = 'https://api-cuchau-store-pg.onrender.com/user/car/Delete_element';
    try {
      // Realizar la solicitud DELETE a la API
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id_usuario: userIdFromToken, // Utilizar el id_usuario obtenido del token
          id_producto: id_producto
        })
      });

      if (response.ok) {
        // Si la respuesta es exitosa, filtrar los elementos del carrito

        setCartItems(cartTotal.filter((item) => item.id_producto !== id_producto));

      } else {
        // Manejo de errores en caso de respuesta no exitosa
        console.error(`Error al eliminar el producto ${id_producto}. Código de estado: ${response.status}`);
      }
    } catch (error) {
      console.error('Error al intentar eliminar el producto:', error);
    }
  };


  if (loading) {
    return <div className="container mx-auto p-4">Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Carrito de Compra</h1>
      <p className="text-gray-600 mb-4">ID de usuario: {userId}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <ul>
            {cartItems.map((item) => (
              <li key={item.id_producto} className="border-b border-gray-200 py-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <img src={""} alt={""} className="w-16 h-16 object-cover rounded-md" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{""}</h3>
                      <p className="text-gray-600">ID: {item.producto}</p>
                      <p className="text-gray-600">Cantidad: {item.cantidad}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-800 font-semibold">${item.sub_total}</span>
                    <button
                      onClick={() => removeFromCart(item.id_producto)}
                      className="text-red-500 hover:text-red-600 focus:outline-none"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Cupon></Cupon>
        </div>

        <div className="col-span-1">
          <div className="bg-gray-100 p-6 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Resumen</h2>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Total:</span>
              ${total}
            </div>
            <button onClick={handleToPedido}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none">
              Proceder al Pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;
