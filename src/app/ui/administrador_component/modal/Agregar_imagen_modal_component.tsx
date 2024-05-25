import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";

const ModificarProductoComponent: React.FC<{ value: number }> = ({ value }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Handle any updates needed when the `value` prop changes
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    try {
      setUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append('imagen', file);
      formData.append('id_producto', value.toString());

      const response = await fetch('http://localhost:3002/actualizarImagen', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload');
      }

      const data = await response.json();
      console.log('Response:', data);
      alert('Image uploaded successfully');
      onClose(); // Close the modal after successful upload
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
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
      <Modal isOpen={isOpen} onClose={onClose} className="flex items-center justify-center min-h-screen">
        <ModalContent className="bg-white p-4 max-h-[25rem] w-full max-w-lg mx-auto rounded-lg shadow-lg">
          <ModalHeader className="bg-gray-800 text-white p-4 rounded-t-lg">
            Modificar Imagen Producto
          </ModalHeader>
          <ModalBody className="p-2 max-h-[33rem] overflow-y-auto lb-6">
            <div className="max-w-md p-6 border rounded-lg shadow-lg mx-auto">
              <h2 className="text-center text-2xl font-bold mb-4">Upload Image</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                    Select an image:
                  </label>
                  <input
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={uploading}
                  className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  }`}
                >
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
              </form>
              {error && <p className="mt-4 text-center text-red-600">{error}</p>}
            </div>
          </ModalBody>
          <ModalFooter className="bg-blue-100 p-4 rounded-b-lg flex justify-end">
            <Button color="danger" variant="light" onClick={onClose} className="mr-4">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModificarProductoComponent;
