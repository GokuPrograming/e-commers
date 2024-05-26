import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

interface Proveedor {
  proveedor: string;
  id_proveedor: number;
}
interface Producto {
  producto: string;
  precio: number;
  almacen: number;
  descripcion: string;
  categoria: string;
  proveedor: string;
  id_proveedor: number;
  id_producto: number;
  id_categoria: number;
}
interface Categoria {
  categoria: string;
  id_categoria: number;
}

const AgregarProductoComponent: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [producto, setProducto] = useState<Producto>({
    producto: "",
    precio: 0,
    almacen: 0,
    descripcion: "",
    categoria: "",
    proveedor: "",
    id_proveedor: 0,
    id_producto: 0,
    id_categoria: 0,
  });
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [categoria, setCategoria] = useState<Categoria[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Aquí deberías cargar los proveedores y categorías desde la API
    fetch(`https://api-cuchau-store-pg.onrender.com/proveedor`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((dataP: { data: Proveedor[] }) => {
        if (dataP.data && dataP.data.length > 0) {
          setProveedores(dataP.data);
        } else {
          throw new Error("No data found");
        }
      })
      .catch((error: Error) => {
        setError(error);
      });

    fetch(`https://api-cuchau-store-pg.onrender.com/categoria`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((dataC: { data: Categoria[] }) => {
        if (dataC.data && dataC.data.length > 0) {
          setCategoria(dataC.data);
        } else {
          throw new Error("No data found");
        }
      })
      .catch((error: Error) => {
        setError(error);
      });
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProducto((prevProducto) => ({
      ...prevProducto,
      [name]: value,
    }));
  };

  const handleSelectChange = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "proveedor") {
      const selectedProveedor = proveedores.find((prov) => prov.id_proveedor.toString() === value);
      setProducto((prevProducto) => ({
        ...prevProducto,
        proveedor: selectedProveedor ? selectedProveedor.proveedor : "",
        id_proveedor: selectedProveedor ? selectedProveedor.id_proveedor : 0,
      }));
    } else if (name === "categoria") {
      const selectedCategoria = categoria.find((cate) => cate.id_categoria.toString() === value);
      setProducto((prevProducto) => ({
        ...prevProducto,
        categoria: selectedCategoria ? selectedCategoria.categoria : "",
        id_categoria: selectedCategoria ? selectedCategoria.id_categoria : 0,
      }));
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Aquí puedes realizar acciones con el archivo seleccionado
      console.log("Nombre del archivo:", file.name);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const formData = new FormData(e.currentTarget);
  
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  
    fetch("https://api-cuchau-store-pg.onrender.com/AgregarProducto", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        alert(data.message)
        onClose();
      })
      .catch((error) => console.error("Error al enviar el formulario:", error));
  };
  

  return (
    <>
      <Button onClick={onOpen} className="bg-green-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
        Agregar producto
        <Image
          className="pl-2 object-contain shadow-lg"
          src="/img/page_img/plus.png"
          alt="agregar productos"
          width={30} // Establece un valor adecuado para el ancho de la imagen
          height={30} // Establece un valor adecuado para la altura de la imagen
        />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent className="bg-white max-h-100 max-w-150">
          <ModalHeader className="bg-gray-800 text-white p-4">Agregar un producto</ModalHeader>
          <ModalBody className="border border-gray-200 bg-white shadow-md max-h-[33rem] overflow-y-auto">
            <form onSubmit={handleSubmit}>
              <div className="p-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Nombre del producto</label>
                <input
                  type="text"
                  name="producto"
                  value={producto.producto}
                  onChange={handleChange}
                  placeholder="Nombre del producto"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div className="mb-5">
                <div className="max-w-2xl mx-auto">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                    Proveedor
                  </label>
                  <select
                    name="proveedor"
                    id="proveedor"
                    value={producto.id_proveedor}
                    onChange={handleSelectChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Selecciona un proveedor</option>
                    {proveedores.map((prov) => (
                      <option
                        key={prov.id_proveedor}
                        value={prov.id_proveedor}
                      >
                        {prov.proveedor}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-5">
                <div className="max-w-2xl mx-auto">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                    Categoria
                  </label>
                  <select
                    name="categoria"
                    id="categoria"
                    value={producto.id_categoria}
                    onChange={handleSelectChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Selecciona una categoría</option>
                    {categoria.map((cate) => (
                      <option
                        key={cate.id_categoria}
                        value={cate.id_categoria}
                      >
                        {cate.categoria}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Cantidad en almacén</label>
                <input
                  type="number"
                  name="almacen"
                  value={producto.almacen}
                  onChange={handleChange}
                  placeholder="Cantidad en almacén"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="p-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Precio</label>
                <input
                  type="number"
                  name="precio"
                  value={producto.precio}
                  onChange={handleChange}
                  placeholder="Precio"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="p-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Descripción</label>
                <textarea
                  name="descripcion"
                  value={producto.descripcion}
                  onChange={handleChange}
                  placeholder="Descripción"
                  className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                ></textarea>
              </div>
              <div className="p-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Subir imagen</label>
                <input
                  type="file"
                  name="imagen"
                  id="imagen"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <div className="p-4">
                <button type="submit" className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">Submit</button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AgregarProductoComponent;
