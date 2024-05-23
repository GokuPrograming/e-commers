import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Image from 'next/image';
const redirectToPage = (path: string) => {
    window.location.href = path;
};

// Definición del componente funcional
const RegistroComponent: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
   
    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
           redirectToPage('../Tienda');
        } else {
            
        }
    }, []);

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data = {
            nombre: formData.get('nombre'),
            apellido_paterno: formData.get('apellido_paterno'),
            apellido_materno: formData.get('apellido_materno'),
            correo: formData.get('correo'),
            password: formData.get('password'),
            telefono: formData.get('telefono'),
            fecha_nacimiento: formData.get('fecha_nacimiento'),
        };

        try {
            console.log(data);
            // const response = await fetch('https://api-cuchau-store-pg.onrender.com/usuario/registro', 
            const response = await fetch('http://localhost:3002/usuario/registro',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        );

            if (!response.ok) {
                throw new Error('Error en el registro');
            }

            const result = await response.json();
            console.log(result);
            alert(result.message)
            // Aquí puedes manejar la respuesta de la API, como guardar el token, redirigir al usuario, etc.
            //redirectToPage('../Tienda');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Retorna el JSX que representa la UI del componente
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                <div className="flex justify-center mb-8">
                    {/* <img src="https://www.emprenderconactitud.com/img/POC%20WCS%20(1).png" alt="Logo" className="w-30 h-20" /> */}
                </div>
                <h1 className="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">Registro</h1>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm text-gray-600">Nombre</label>
                        <input  type="text" id="nombre" name="nombre" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm text-gray-600">Apellido Paterno</label>
                        <input type="text" id="apellido" name="apellido_paterno" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm text-gray-600">Apellido Materno</label>
                        <input type="text" id="apellido" name="apellido_materno" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm text-gray-600">Correo electrónico</label>
                        <input type="email" id="email" name="correo" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm text-gray-600">Contraseña</label>
                        <input type="password" id="password" name="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm text-gray-600">Telefono</label>
                        <input type="tel" name="telefono" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm text-gray-600">Fecha De Nacimiento</label>
                        <input type="date" name="fecha_nacimiento" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
                    </div>
                    <button type="submit" className="w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2">Registro</button>
                </form>
                <div className="text-center">
                    <p className="text-sm">¿Ya tienes una cuenta? <a href={'/pages/auth/login'} className="text-cyan-600">Inicia sesión</a></p>
                </div>
                <p className="text-xs text-gray-600 text-center mt-8">&copy; 2023 WCS LAT</p>
            </div>
        </div>
    );
}

// Exporta el componente para que pueda ser utilizado en otras partes de la aplicación
export default RegistroComponent;
