"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { getUserIdFromToken } from "../authUtils";
import { useRouter } from 'next/navigation'; // Corrección en la importación
import VerMas_modal_Component from "@/app/ui/MenuStore/modal/VerMas_modal_Component";
import cards from "@/app/ui/MenuStore/cards";

// const token = Cookies.get('token');
import Image from "next/image";
type Product = {
  id_producto: number;
  producto: string;
  precio: string;
  almacen: number;
  id_proveedor: number;
  id_categoria: number;
  imagen_url: string;
};

type ProductItemProps = {
  producto: Product;
  onAddToCart: (productId: number) => void; // Función para manejar "Add to cart"
};

const ProductItem: React.FC<ProductItemProps> = ({ producto, onAddToCart }) => {
  const router = useRouter();
  const [count, setCount] = useState(1);
  const [value, setValue] = useState<number>(producto.id_producto); // Usa producto.id_producto como valor inicial

  // Asegúrate de inicializarlo con los datos del producto que recibes como prop

  const handleIncrement = () => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      return newCount;
    });
  };
  const reset = () => {
    setCount(1);
  };
  const handleDecrement = () => {
    if (count > 1) {
      setCount((prevCount) => {
        const newCount = prevCount - 1;
        return newCount;
      });
    }
  };
  // Función manejadora para el clic del botón
  const handleAddToCartClick = async () => {

    const token = Cookies.get("token");
    if (!token) {
      console.log("no hay token");
      alert("no ah iniciado sesion");
     
      router.push("/pages/auth/login");
      return;
    }
    if (token) {
      const userId = getUserIdFromToken(token);
      onAddToCart(producto.id_producto);
      const apiUrl = "https://api-cuchau-store-pg.onrender.com/addToCar";
      const requestBody = {
        id_producto: producto.id_producto,
        id_usuario: userId,
        cantidad: count,
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
        if (count > producto.almacen) {
          alert("no hay en almacen :");
          console.log("no hay en almacen :");
        }
        throw new Error("Error al enviar la solicitud");
      }

      console.log("Solicitud enviada con éxito");

      const responseData = await response.json();
      console.log("Respuesta de la API:", responseData);
      alert("Producto agregado al carrito exitosamente");
      reset();
    }
  };
 

  return (


<div>
<article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300">
  <div className="relative flex overflow-hidden rounded-xl">
    <div className="w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 relative">
      <Image
        src={producto.imagen_url || "/placeholder_image.png"}
        alt="Producto"
        width={400}
        height={400}
        className="rounded-lg shadow-md"
      />
    </div>
    <div className="w-2/3 md:w-3/4 lg:w-4/5 xl:w-5/6 p-3">
      <h2 className="text-slate-700">{producto.producto}</h2>
      <p className="mt-1 text-sm text-slate-400">
        ID: {producto.id_producto}
      </p>
      <p className="mt-1 text-sm text-slate-400">
        Precio: ${producto.precio}
      </p>
      <p className="mt-1 text-sm text-slate-400">
        Almacen: {producto.almacen} unidades
      </p>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleDecrement}
          className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
        >
          -
        </button>
        <span className="text-xl font-semibold">{count}</span>
        <button
          onClick={handleIncrement}
          className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none"
        >
          +
        </button>
      </div>
      <div className="flex items-center space-x-1.5 mt-2">
        <button
          className="group w-12 hover:w-44 h-12 hover:bg-sky-600 relative bg-sky-700 rounded text-neutral-50 duration-700 font-bold flex justify-start gap-2 items-center p-2 pr-6 before:absolute before:-z-10 before:left-8 before:hover:left-40 before:w-6 before:h-6 before:bg-sky-700 before:hover:bg-sky-600 before:rotate-45 before:duration-700"
          onClick={handleAddToCartClick}
        >
          <Image
            className="w-8 h-8 shrink-0 object-contain shadow-lg"
            src="/img/page_img/comercio-electronico.png"
            alt="agregar productos"
            width={32} // Adjust the width to fit within the button
            height={32} // Adjust the height to fit within the button
          />
          <span
            className="origin-left inline-flex duration-100 group-hover:duration-300 group-hover:delay-500 opacity-0 group-hover:opacity-100 border-l-2 px-1 transform scale-x-0 group-hover:scale-x-100 transition-all"
          >
            Agregar
          </span>
        </button>
        <VerMas_modal_Component value={value} />

      </div>
    </div>
  </div>
</article>
<div>

</div>

</div>

    
  );
};

export default ProductItem;
