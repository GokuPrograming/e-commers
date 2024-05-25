import React, { useState, ChangeEvent } from "react";

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

const Agregar_producto_Component: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [ruta, setRuta] = useState("ruta");

  const actualiza = (e: ChangeEvent<HTMLInputElement>) => {
    const nombre = e.target.files?.[0]?.name;
    if (nombre) {
      console.log(nombre);
      //setRuta("http://localhost:8080/evidencia/" + nombre);
    }
  };
  return (
    <>
      <Button
        onClick={onOpen}
        className="bg-green-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
      >
        Agregar productos
        <Image
          className="pl-2 object-contain shadow-lg"
          src="/img/page_img/plus.png"
          alt="agregar productos"
          width={30} // Establece un valor adecuado para el ancho de la imagen
          height={30} // Establece un valor adecuado para la altura de la imagen
        />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="bg-white max-h-100 max-w-150">
          {(onClose: () => void) => (
            <>
              <ModalHeader className="bg-gray-800 text-white p-4">
                Agregar Un producto
              </ModalHeader>
              <ModalBody className="border border-gray-200 bg-white shadow-md max-h-[33rem] overflow-y-auto">
                <div className="flex flex-col items-center justify-center p-12">
                  <div className="w-full max-w-[550px]">
                    <form action="https://formbold.com/s/FORM_ID" method="POST">
                      <div className="mb-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={actualiza}
                        />
                        <input
                          type="text"
                          value={ruta}
                          className="form-control mt-2"
                          readOnly
                        />
                      </div>
                      <div className="mb-6">
                        <label className="block text-xl font-semibold text-[#07074D]">
                          Subir Imagen
                        </label>
                        <div className="mt-4">
                          <input
                            type="file"
                            name="file"
                            id="file"
                            className="sr-only"
                            accept="image/*"
                          />
                          <label
                            htmlFor="file"
                            className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                          >
                            <div>
                              <span className="block text-xl font-semibold text-[#07074D]">
                                Arrastra
                              </span>
                              <span className="block text-base font-medium text-[#6B7280]">
                                O
                              </span>
                              <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                                Busca
                              </span>
                            </div>
                          </label>
                        </div>
                      </div>
                      <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-base font-medium text-[#07074D]">
                            Nombre del producto
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Nombre del producto"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-900">
                            Proveedor
                          </label>
                          <select
                            id="countries"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          >
                            <option selected>Escoge un proveedor</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="FR">France</option>
                            <option value="DE">Germany</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-base font-medium text-[#07074D]">
                          Cantidad
                        </label>
                        <input
                          type="text"
                          name="subject"
                          id="subject"
                          placeholder="Enter your subject"
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                      </div>
                      <div>
                        <label className="block text-base font-medium text-[#07074D]">
                          Descripción
                        </label>
                        <textarea
                          name="message"
                          id="message"
                          placeholder="Type your message"
                          className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        ></textarea>
                      </div>
                      <div>
                        <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
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
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Agregar_producto_Component;
