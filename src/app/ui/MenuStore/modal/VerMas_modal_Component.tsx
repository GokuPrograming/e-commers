import React, { useState, useEffect, ChangeEvent } from "react";
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
  imagen: string;
  descripcion: string;
  categoria: string;
  proveedor: string;
}

const VerMasModalComponent: React.FC<VerMasModalComponentProps> = ({ value }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [producto, setProducto] = useState<Producto | null>(null);
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
  }, [value]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Button
        onClick={onOpen}
        className="text-white font-bold py-2 px-4 rounded"
      >
        <Image
          className="pl-2 object-contain shadow-lg"
          src="/img/page_img/informacion.png"
          alt="agregar productos"
          width={500} 
          height={500} 
        />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="w-1/2">
        <ModalContent>
          {(onClose: () => void) => (
            <>
              <ModalHeader className="bg-gray-800 text-white p-4">
                Información del producto
              </ModalHeader>
              <ModalBody className="p-2 max-h-[33rem] overflow-y-auto">
                <div className="flex flex-col justify-center items-center w-full h-screen bg-gray-100">
                  <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
                    <div className="w-full md:w-1/3 bg-white grid place-items-center">
                    <Image
                        src={`/img/productos/${producto?.imagen}`}
                        alt="Producto"
                        width={400}
                        height={400}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                      <div className="flex justify-between item-center">
                        <div className="flex items-center">
                          <p className="text-gray-600 font-bold text-sm ml-1">
                            {producto?.producto}
                          </p>
                        </div>
                        <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
                          {producto?.categoria}
                        </div>
                      </div>
                      <h3 className="font-black text-gray-800 md:text-3xl text-xl">
                        {producto?.producto}
                      </h3>
                      <p className="md:text-lg text-gray-500 text-base">
                        {producto?.descripcion}
                      </p>
                      <p className="text-xl font-black text-gray-800">
                        ${producto?.precio}
                      </p>
                    </div>
                  </div>
                </div>
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
                  onClick={onClose}
                >
                  Action
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default VerMasModalComponent;
