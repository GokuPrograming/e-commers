
// export const Productos = async () => {
//     try {
//         const response = await fetch('https://api-cuchau-store-pg.onrender.com/product');
//         if (!response.ok) {
//             throw new Error('No se pudo obtener los datos');
//         }
//         const data = await response.json();
//         return data.data;
//     } catch (error) {
//         console.error('Error al obtener los datos:', error instanceof Error ? error.message : String(error));
//         throw error;
//     }
// };
// export const loadData = async (
//     setProductos: React.Dispatch<React.SetStateAction<any[]>>,
//     setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
//     setError: React.Dispatch<React.SetStateAction<string | null>>
// ) => {
//     try {
//         const data = await Productos(); // Suponiendo que fetchData es tu función para obtener datos de la API
//         setProductos(data);
//         setIsLoading(false);
//         console.log(data.data);
//     } catch (error) {
//         setError(error instanceof Error ? error.message : String(error));
//         setIsLoading(false);
//     }
// };

export const loadData = async (
    setProductos: React.Dispatch<React.SetStateAction<any[]>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
    try {
        const data = await Productos(); // Obtiene los datos de la API
        setProductos(data || []); // Asegúrate de que 'data' siempre sea un array
        setIsLoading(false);
        console.log(data);
    } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
        setIsLoading(false);
    }
};

export const Productos = async () => {
    try {
        const response = await fetch('https://api-cuchau-store-pg.onrender.com/product');
        if (!response.ok) {
            throw new Error('No se pudo obtener los datos');
        }
        const data = await response.json();
        return data; // Suponiendo que 'data.productos' contiene el array de productos
    } catch (error) {
        console.error('Error al obtener los datos:', error instanceof Error ? error.message : String(error));
        throw error;
    }
};
