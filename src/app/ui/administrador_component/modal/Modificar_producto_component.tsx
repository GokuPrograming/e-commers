import React from "react";
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

const Modificar_producto_component: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        className=" hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        <Image
          className=" object-contain shadow-lg"
          src="/img/page_img/edit.png"
          alt="Your Company"
          width={30} // Establece un valor adecuado para el ancho de la imagen
          height={30} // Establece un valor adecuado para la altura de la imagen
        />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="bg-white">
          {(onClose: () => void) => (
            <>
              <ModalHeader className="bg-gray-800 text-white p-4">
                Agregar Un producto
              </ModalHeader>
              <ModalBody className="p-4 max-h-120 overflow-y-auto">
                <div className="flex items-center justify-center p-12">
                  <div className="mx-auto w-full max-w-[550px]">
                    <form action="https://formbold.com/s/FORM_ID" method="POST">
                      <div className="mb-6 pt-4">
                        <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                          Subir Imagen
                        </label>

                        <div className="mb-8">
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
                              <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                                Arrastra
                              </span>
                              <span className="mb-2 block text-base font-medium text-[#6B7280]">
                                O
                              </span>
                              <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                                Busca
                              </span>
                            </div>
                          </label>
                        </div>
                      </div>
                      <div className="mb-5">
                        <label
                          //   for="name"
                          className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                          Nombre del producto
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Full Name"
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                      </div>
                      {/* select proveedor */}
                      <div className="mb-5">
                        <div className="max-w-2xl mx-auto">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                            Proveedor
                          </label>
                          <select
                            id="countries"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            <option selected>Escoge un proveedor</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="FR">France</option>
                            <option value="DE">Germany</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-5">
                        <label
                          //   for="subject"
                          className="mb-3 block text-base font-medium text-[#07074D]"
                        >
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
                      <div className="mb-5">
                        <label
                          //   for="message"
                          className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                          Descripcion
                        </label>
                        <textarea
                          //   rows="4"
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

export default Modificar_producto_component;
