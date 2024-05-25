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

interface Producto {
  producto: string;
  precio: string;
  almacen: number;
  descripcion: string;
  categoria: string;
  proveedor: string;
  id_proveedor: number;
  id_producto: number;
  id_categoria: number;
}

interface Proveedor {
  proveedor: string;
  id_proveedor: number;
}
interface Categoria {
  categoria: string;
  id_categoria: number;
}

const ModificarProductoComponent: React.FC<{ value: number }> = ({ value }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [categoria, setCategoria] = useState<Categoria[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3002/producto/${value}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: { data: Producto[] }) => {
        if (data.data && data.data.length > 0) {
          setProducto(data.data[0]);
          setLoading(false);
        } else {
          throw new Error("No data found");
        }
      })
      .catch((error: Error) => {
        setError(error);
        setLoading(false);
      });

    fetch(`http://localhost:3002/proveedor`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((dataP: { data: Proveedor[] }) => {
        if (dataP.data && dataP.data.length > 0) {
          setProveedores(dataP.data);
          setLoading(false);
        } else {
          throw new Error("No data found");
        }
      })
      .catch((error: Error) => {
        setError(error);
        setLoading(false);
      });
    fetch(`http://localhost:3002/categoria`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((dataC: { data: Categoria[] }) => {
        if (dataC.data && dataC.data.length > 0) {
          
          setCategoria(dataC.data);

          setLoading(false);
        } else {
          throw new Error("No data found");
        }
      })
      .catch((error: Error) => {
        setError(error);
        setLoading(false);
      });
  }, [value]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProducto((prevProducto) =>
      prevProducto ? { ...prevProducto, [name]: value } : null
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!producto) {
      console.error("Producto is null");
      return;
    }

    fetch(`http://localhost:3002/registrarProductos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("lo de prodeucto" + producto?.id_proveedor);
          console.log("esto: " + JSON.stringify(producto));
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
      alert("Success:", data);
        onClose();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Button
        onClick={onOpen}
        className="hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        <Image
          className="object-contain shadow-lg"
          src="/img/page_img/edit.png"
          alt="Edit"
          width={30}
          height={30}
        />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent className="bg-white">
          <ModalHeader className="bg-gray-800 text-white p-4">
            Modificar Producto
          </ModalHeader>
          <ModalBody className="p-2 max-h-[33rem] overflow-y-auto">
            <div className="flex items-center justify-center p-12">
              <div className="mx-auto w-full max-w-[550px]">
                <form onSubmit={handleSubmit}>
                  <div className="mb-5">
                    <label className="mb-3 block text-base font-medium text-[#07074D]"></label>
                    <input
                      type="hidden"
                      name="producto"
                      id="producto"
                      placeholder="ID"
                      value={producto?.id_producto || ""}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="mb-3 block text-base font-medium text-[#07074D]">
                      Nombre del producto
                    </label>
                    <input
                      type="text"
                      name="producto"
                      id="producto"
                      placeholder="Nombre del producto"
                      value={producto?.producto || ""}
                      onChange={handleChange}
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
                        value={producto?.id_proveedor}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value={producto?.id_proveedor}>
                          {producto?.proveedor}
                        </option>
                        {proveedores.map((prov) => (
                          <option
                            key={prov.id_proveedor}
                            value={prov.proveedor}
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
                        Proveedor
                      </label>
                      <select
                        name="categoria"
                        id="categoria"
                        value={producto?.id_categoria}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value={producto?.id_categoria}>
                          {producto?.categoria}
                        </option>
                        {categoria.map((cate) => (
                          <option
                            key={cate.id_categoria}
                            value={cate.categoria}
                          >
                            {cate.categoria}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mb-5">
                    <label className="mb-3 block text-base font-medium text-[#07074D]">
                      Cantidad
                    </label>
                    <input
                      type="text"
                      name="almacen"
                      id="almacen"
                      placeholder="Cantidad"
                      value={producto?.almacen || ""}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="mb-3 block text-base font-medium text-[#07074D]">
                      Descripción
                    </label>
                    <textarea
                      name="descripcion"
                      id="descripcion"
                      placeholder="Descripción"
                      value={producto?.descripcion || ""}
                      onChange={handleChange}
                      className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="bg-gray-100 p-4">
            <Button
              color="danger"
              variant="light"
              onClick={onClose}
              className="mr-4"
            >
              Close
            </Button>
            <Button color="primary" onClick={onClose}>
              Action
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModificarProductoComponent;
