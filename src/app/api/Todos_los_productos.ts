
export const Productos = async () => {
    try {
        const response = await fetch('http://localhost:3000/product');
        if (!response.ok) {
            throw new Error('No se pudo obtener los datos');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error al obtener los datos:', error instanceof Error ? error.message : String(error));
        throw error;
    }
};
export const loadData = async (
    setProductos: React.Dispatch<React.SetStateAction<any[]>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
    try {
        const data = await Productos(); // Suponiendo que fetchData es tu función para obtener datos de la API
        setProductos(data);
        setIsLoading(false);
        console.log(data.data);
    } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
        setIsLoading(false);
    }
};

