// DireccionForm.tsx
import { useState } from 'react';

const DireccionForm: React.FC = () => {
    const [descripcionDireccion, setDescripcionDireccion] = useState<string>('');
    const [pais, setPais] = useState<string>('mexico');
    const [ciudades, setCiudades] = useState<string[]>(['Ciudad de México', 'Guadalajara', 'Monterrey']);

    const handleChangePais = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const paisSeleccionado: string = event.target.value;
        setPais(paisSeleccionado);

        // Actualizar ciudades según el país seleccionado
        switch (paisSeleccionado) {
            case 'mexico':
                setCiudades(['Ciudad de México', 'Guadalajara', 'Monterrey']);
                break;
            case 'espana':
                setCiudades(['Madrid', 'Barcelona', 'Valencia']);
                break;
            case 'argentina':
                setCiudades(['Buenos Aires', 'Córdoba', 'Rosario']);
                break;
            default:
                setCiudades([]);
                break;
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        // Aquí puedes agregar la lógica para guardar la dirección en tu base de datos
        console.log('Dirección guardada:', {
            descripcion: descripcionDireccion,
            pais: pais,
            ciudad: (event.target as HTMLFormElement).ciudad.value
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Ingresa tu dirección</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Descripción de la dirección:</label>
                    <input 
                        type="text" 
                        className="mt-1 p-2 w-full border rounded-md" 
                        value={descripcionDireccion} 
                        onChange={(e) => setDescripcionDireccion(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">País:</label>
                    <select 
                        className="mt-1 p-2 w-full border rounded-md" 
                        value={pais} 
                        onChange={handleChangePais}
                    >
                        <option value="mexico">México</option>
                        <option value="espana">España</option>
                        <option value="argentina">Argentina</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">Ciudad:</label>
                    <select 
                        name="ciudad" 
                        className="mt-1 p-2 w-full border rounded-md"
                    >
                        {ciudades.map((ciudad: string, index: number) => (
                            <option key={index} value={ciudad}>
                                {ciudad}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Guardar dirección
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DireccionForm;
