"use client"
import { useEffect, useState } from 'react';
const CountrySelect: React.FC = () => {
    const [countries, setCountries] = useState<{ id: number; name: string }[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<number | null>(null);
    const [options, setOptions] = useState<{ id: number; name: string }[]>([]);
    let id_pais;
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/pais'); // Ruta a tu API en Next.js
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCountries(data.data);
            console.log("se cargaron todos los paises");
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {

        fetchData();
    }, []);

    const fetchOptions = async (id: number | null) => {
        if (id !== null) {
            console.log("es el ID= ", id);
            try {
                const response = await fetch(`http://localhost:3000/estados/${id}`); // Ruta a tu otra API en Next.js
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log("es el ID= ", { id });
                setOptions(data.data);
                console.log("esta el la data opctio: ", data.data);
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        } else {
            setOptions([]); // Si no hay un país seleccionado, reiniciar las opciones
        }
    };


    const handleChangeCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const id = countries.find((country) => country.name === event.target.value)?.id || null;
        setSelectedCountry(id);
        fetchOptions(id);
        id_pais = id;
        console.log("el id del pais a guardar es: ", id_pais)
    };
    const handleSaveState = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const id = options.find((estado) => estado.name === event.target.value)?.id || null;

        id_pais = id;
        console.log("el id del estado a guardar es: ", id_pais)
    };



    return (
        <div>
            <h1>Seleccionar país</h1>
            <select onChange={handleChangeCountry}>
                <option value="">Selecciona un país</option>
                {countries.map((country) => (
                    <option key={country.id} value={country.name}>
                        {country.name}
                    </option>
                ))}
            </select>
            <h1>Selecciona un Estado</h1>
            <select onChange={handleSaveState}>
                <option value="">Selecciona un Estado</option>
                {options.map((estado) => (
                    <option key={estado.id} value={estado.name}>
                        {estado.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CountrySelect;
