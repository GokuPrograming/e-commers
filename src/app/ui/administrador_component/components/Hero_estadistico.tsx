import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getUserIdFromToken } from "../../authUtils";

interface Data {
  total: number;
  total_cuentas_ultimo_mes: number;
  total_ventas: number;
}

const Hero_estadistico = () => {
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const userId = getUserIdFromToken(token);
          const apiUrl = 'https://api-cuchau-store-pg.onrender.com/admin/TotalesBanner';
          const requestBody = {
            id_usuario: userId,
          };
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
          });
          if (!response.ok) {
            throw new Error('No se pudo obtener los datos');
          }

          const responseData = await response.json();
          console.log(responseData.data);  // Verifica los datos recibidos

          setData(responseData.data);  // Actualiza el estado datos con los datos recibidos
          setIsLoading(false);
        }
      } catch (error) {
        console.error(
          "Error al obtener los datos:",
          error instanceof Error ? error.message : String(error)
        );
        setError(error instanceof Error ? error.message : String(error));
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <>
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
              {data.total}
            </span>
            <h3 className="text-base font-normal text-gray-500">
              Total Usuarios
            </h3>
          </div>
          <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
              {data.total_cuentas_ultimo_mes}
            </span>
            <h3 className="text-base font-normal text-gray-500">
              Total Cuentas Último Mes
            </h3>
          </div>
          <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
              {data.total_ventas}
            </span>
            <h3 className="text-base font-normal text-gray-500">
              Total Ventas
            </h3>
          </div>
          <div className="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero_estadistico;
