/*/admin/almacen/ */
"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getUserIdFromToken } from "../authUtils";
import Image from "next/image";
import Agregar_producto_Component from "./modal/Agregar_producto_Component";
import Modificar_producto_component from "./modal/Modificar_producto_component";
import Modificar_imagen_modal_component from "./modal/Agregar_imagen_modal_component";


const token = Cookies.get("token");

const Productos_panel_component: React.FC = () => {
  const [datos, setDatos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      if (token) {
        const userId = getUserIdFromToken(token);
        const apiUrl =
          "https://api-cuchau-store-pg.onrender.com/admin/almacen/";
        const requestBody = {
          id_usuario: userId,
        };

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error("No se pudo obtener los datos");
        }

        const responseData = await response.json();
        console.log(responseData.data); // Verifica los datos recibidos

        setDatos(responseData.data); // Actualiza el estado datos con los datos recibidos
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
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto ">
      <h2 className="text-lg font-semibold mb-4">Lista de Productos</h2>
      <br />
      <Agregar_producto_Component></Agregar_producto_Component>
      <br />
      <br />
      <table className="min-w-full max-w-full overflow-auto">
        <thead className="sticky top-0 bg-white">
          <tr>
          <th className="px-4 py-2">ID producto</th>
            <th className="px-4 py-2">Nombre producto</th>
            <th className="px-4 py-2">Stock</th>
            <th className="px-4 py-2">Proveedor</th>
            <th className="px-4 py-2">Borrar</th>
            <th className="px-4 py-2">Editar</th>
            <th className="px-4 py-2">Editar imagen</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((dato, index) => (
            <tr key={index} className="bg-gray-100">
              {/* <td className="px-4 py-2"><img src="url_de_la_imagen" alt="Producto" className="h-12 w-12 object-cover rounded" /></td> */}
              <td className="px-4 py-2">{dato.id_producto}</td>
              <td className="px-4 py-2">{dato.producto}</td>
              <td className="px-4 py-2">{dato.almacen}</td>
              <td className="px-4 py-2">{dato.proveedor}</td>

              <td className="px-4 py-2">
                <Image
                  className=" object-contain shadow-lg"
                  src="/img/page_img/trash.png"
                  alt="Your Company"
                  width={30} // Establece un valor adecuado para el ancho de la imagen
                  height={30} // Establece un valor adecuado para la altura de la imagen
                />
              </td>
              <td className="px-4 py-2">
                <Modificar_producto_component value={dato.id_producto} />
              </td>
              <td className="px-4 py-2">
               <Modificar_imagen_modal_component value={dato.id_producto} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Productos_panel_component;
