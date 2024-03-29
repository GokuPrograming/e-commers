import React, { useState } from 'react';
// un prop para la coneccion para lo que son los datos
type LoginFormProps = {
    onLogin: (correo: string, password: string) => Promise<void>;
};
/// los tipos de datos que se deben de manejar
const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [correo, setcorreo] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
///el boton
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            await onLogin(correo, password);
            setIsLoading(false);
        } catch (error) {
            setError('Login failed. Please try again.');
            setIsLoading(false);
        }
    };

///solo manda el formularo
    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="correo">
                    correo
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="correo"
                    type="text"
                    placeholder="corroe"
                    value={correo}
                    onChange={(e) => setcorreo(e.target.value)}
                    required
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging in...' : 'Sign In'}
                </button>
            </div>
            {error && (
                <p className="mt-4 text-red-500 text-xs italic">{error}</p>
            )}
        </form>
    );
};

export default LoginForm;
