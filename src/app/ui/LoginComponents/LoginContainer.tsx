import React, { useState, useEffect } from 'react';
import LoginForm from '@/app/ui/LoginComponents/LoginForm';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { login } from '../../api/loginApi'// Importar la función login desde el archivo loginApi
import router from 'next/navigation';

const LoginContainer: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<any | null>(null);
    useEffect(() => {
        const storedToken = Cookies.get('token');
        const storedUser = Cookies.get('user');

        if (storedToken) {
            setToken(storedToken);
        }

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogin = async (correo: string, password: string) => {
        // Usar la función login
        const { success, data, error } = await login(correo, password);
        //valida la respuesta
        if (success && data) {
            // Almacenar el token y los datos del usuario en las cookies
            Cookies.set('token', data.token);
            Cookies.set('user', JSON.stringify(data.user));
            setIsLoggedIn(true);
            setError(null);
        } else {
            setError(data.message || 'Login failed. Please try again.');
        }
    };
    //cerrar sesion
    const handleLogout = () => {
        // Eliminar el token y los datos del usuario de las cookies al cerrar sesión
        Cookies.remove('token');
        Cookies.remove('user');
        setIsLoggedIn(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col items-center justify-center max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <div className="rounded-full overflow-hidden w-24 h-24 mb-4">
                    <img src="https://th.bing.com/th/id/OIG4.uGuC_WVR80SEIX63vhfB?w=1024&h=1024&rs=1&pid=ImgDetMain" alt="Logo" className="w-full h-full" />
                </div>
                {isLoggedIn ? (
                    <>
                        <h2 className=" text-xl font-semibold mb-2 ">BIENVENIDO, MUCHAS GFRACIAS POR SU PREFERENCIA</h2>
                        {/* <p className="mb-2">Token: {token}</p> */}
                        <p className=" hidden mb-4">User: {JSON.stringify(user)}</p>
                        <Link href="/pages/Tienda"><span className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-950-600'>Ir a tienda</span>
                        </Link>
                        <br />
                        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                            Logout
                        </button>
                    </>
                ) : (
                    <LoginForm onLogin={handleLogin} />
                )}
                {error && (
                    <p className="mt-2 text-red-500 text-xs italic">{error}</p>
                )}
            </div>
        </div>
    );
};

export default LoginContainer;
