import React, { useState, useEffect } from 'react';
import LoginForm from '@/app/ui/LoginComponents/LoginForm';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { routeModule } from 'next/dist/build/templates/app-page';
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
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo, password }),
            });
            const data = await response.json();
            if (response.ok) {
                // Almacenar el token y los datos del usuario en las cookies
                Cookies.set('token', data.token);
                Cookies.set('user', JSON.stringify(data.user));
                setIsLoggedIn(true);
                setError(null);
               // router.push('/pages/auth/login');
            } else {
                setError(data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    const handleLogout = () => {
        // Eliminar el token y los datos del usuario de las cookies al cerrar sesión
        Cookies.remove('token');
        Cookies.remove('user');

        setIsLoggedIn(false);
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="min-w-fit flex-col border bg-white px-6 py-14 shadow-md rounded-[4px]">
                {isLoggedIn ? (
                    <>
                        <h2>Welcome! You are logged in.</h2>
                        <p>Token: {token}</p>
                        <p>User: {JSON.stringify(user)}</p>
                        <Link href={'/pages/Tienda'}>Ir a la tienda</Link>
                        <br />
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <LoginForm onLogin={handleLogin} />
                )}
                {error && (
                    <p className="mt-4 text-red-500 text-xs italic">{error}</p>
                )}
            </div>
        </div>
    );
};

export default LoginContainer;
