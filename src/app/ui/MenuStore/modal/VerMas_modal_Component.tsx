import React, { useState, useEffect } from "react";
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

interface VerMasModalComponentProps {
  value: number;
}

interface Producto {
  producto: string;
  precio: string;
  almacen: number;
  imagen_url: string;
  descripcion: string;
  categoria: string;
  proveedor: string;
}

const VerMasModalComponent: React.FC<VerMasModalComponentProps> = ({
  value,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:3002/producto/${value}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data);
        if (data && data.data) {
          setProducto(data.data);
          setLoading(false);
        } else {
          throw new Error("No data found");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [value]);
  

  const handleAction = () => {
    // Aquí puedes agregar la lógica para la acción del botón "Action"
    console.log("Action button clicked");
    onClose();
  };

  return (
    <>
      {/* <Button onClick={onOpen} className="text-white font-bold py-2 px-4 rounded">
        <Image
          className="pl-2 object-contain shadow-lg"
          src="/img/page_img/informacion.png"
          alt="agregar productos"
          width={500}
          height={500}
        />
      </Button> */}
 <button
      onClick={onOpen}
      title="Info"
      className="group relative flex flex-col items-center cursor-pointer outline-none hover:rotate-90  duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50px"
        height="50px"
        viewBox="0 0 24 24"
        className="stroke-zinc-400 fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
      >
        <path
          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
          strokeWidth="1.5"
        ></path>
        <path d="M12 16V12" strokeWidth="1.5"></path>
        <circle cx="12" cy="8" r="1" strokeWidth="1.5"></circle>
      </svg>
      <span className="mt-2 text-zinc-400 group-hover:text-zinc-800 group-active:text-zinc-600 duration-300">
        More info
      </span>
    </button>
      <Modal isOpen={isOpen} onClose={onClose} className="w-1/2">
        <ModalContent>
          <ModalHeader className="bg-gray-800 text-white p-4">
            Información del producto
          </ModalHeader>
          <ModalBody className="p-2 max-h-[33rem] overflow-y-auto">
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {producto && (
              <div className="flex flex-col justify-center items-center w-full h-screen bg-gray-100">
                <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
                  <div className="w-full md:w-1/3 bg-white grid place-items-center">
                    <Image
                      src={producto.imagen_url || "/placeholder_image.png"}
                      alt="Producto"
                      width={600}
                      height={600}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                    <div className="flex justify-between item-center">
                      <div className="flex items-center">
                        <p className="text-gray-600 font-bold text-sm ml-1">
                          {producto.producto}
                        </p>
                      </div>
                      <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
                        {producto.categoria}
                      </div>
                    </div>
                    <h3 className="font-black text-gray-800 md:text-3xl text-xl">
                      {producto.producto}
                    </h3>
                    <p className="md:text-lg text-gray-500 text-base">
                      {producto.descripcion}
                    </p>
                    <p className="text-xl font-black text-gray-800">
                      ${producto.precio}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter className="bg-gray-100 p-8">
            <button
              className="mr-4 py-2 px-6 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="mr-4 py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
              onClick={handleAction}
            >
              Action
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VerMasModalComponent;
