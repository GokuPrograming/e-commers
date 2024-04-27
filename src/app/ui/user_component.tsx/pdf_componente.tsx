import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import { getUserIdFromToken } from '../authUtils';
import Cookies from 'js-cookie';
import ProductoComponent from './informacion_personal';

interface Productos {
  producto: string;
  total_cantidad: number;
  total_subtotal: number;
}
interface ProductosDireccion {
  nombre: string;
  direccion: string;
  ciudad: string;
  pais: string;
  estado: string;
  codigo_postal: string;
  descripcion: string;
  total:number;
}

interface PDFProps {
  pedidoId: number;
 
}

const PDF: React.FC<PDFProps> = ({ pedidoId }) => {
  const [productos, setProductos] = useState<Productos[]>([]);
  const [productoDireccion, setProductosDireccion] = useState<ProductosDireccion[]>([]);


  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  const token = Cookies.get('token');
  const user_id = getUserIdFromToken(token);

  const productosData = async () => {
    setIsLoading(true);
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_pedido: pedidoId, id_usuario: user_id })
      };

      const response = await fetch('http://localhost:3000/user/MostrarDatosDelPedido/', requestOptions);

      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }

      const data = await response.json();
      setProductos(data.data); // Update productos as an array
      setIsLoading(false);
      setDataLoaded(true); // Set dataLoaded to true when data is loaded successfully
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  const productosDataDireccion = async () => {
    setIsLoading(true);
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_pedido: pedidoId, id_usuario: user_id })
      };

      const response = await fetch('http://localhost:3000/user/MostrarDatosDelPedidoDireccion/', requestOptions);

      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }

      const data = await response.json();
      setProductosDireccion(data.data); // Update productos as an array
      console.log(data.data)
      setIsLoading(false);
      setDataLoaded(true); // Set dataLoaded to true when data is loaded successfully
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const checarP = () => {
    console.log('purchase Data: ', productos);
    for (const purchase of productos) {
      console.log(purchase.producto);
    }
  };

  const generatePDF = () => {
    if (!dataLoaded) {
      console.log('Los datos aún no se han cargado');
      return;
    }

    try {
      const doc = new jsPDF();
      // Título del reporte
      doc.setFontSize(24);
      doc.setTextColor(33, 150, 243); // Azul
      doc.text('Reporte de Compras', 15, 20);

      // Información de la dirección
      doc.setFontSize(12);
      doc.setTextColor(0); // Negro
      doc.text('Información de la dirección:', 15, 30);
      // Agrega la información de la dirección aquí
      productoDireccion.forEach((purchase) => {
        doc.text('Nombre del usuario:', 15, 35);
        doc.text(purchase.nombre, 20, 40);

        doc.text('CP: ', 15, 50);
        doc.text(purchase.codigo_postal, 25, 55);

        doc.text('Direccion: ', 15, 65);
        doc.text(purchase.direccion, 20, 70);
///-------------------------------------------------------
        doc.text('Ciudad: ', 100, 35);
        doc.text(purchase.ciudad, 105, 40);

        doc.text('País:', 100, 50);
        doc.text(purchase.nombre, 105, 55);

        doc.text('Total de la venta:', 100, 65);
        doc.text(purchase.total.toString(), 105, 70);
        // doc.text(purchase.nombre, margin + 2, currentY + 7);
    
      });
      //

      // Contenido del reporte
      const margin = 10;
      const startY = 60; // Ajusta la posición vertical según la longitud de la dirección y el título del reporte
      const cellWidth = 45;
      const cellHeight = 10;
      const lineHeight = 10;
      const date = new Date().toLocaleDateString();

      // Fecha
      doc.text(`Fecha: ${date}`, 15, 10);

      // Cabecera de la tabla
      let currentY = startY + lineHeight * 2;
      doc.setFont('bold');
      doc.setFillColor(200, 220, 255); // Color de fondo de la cabecera
      doc.rect(margin, currentY, cellWidth, cellHeight, 'F');
      doc.text('Producto', margin + 2, currentY + 7);
      doc.rect(margin + cellWidth, currentY, cellWidth, cellHeight);
      doc.text('Cantidad', margin + cellWidth + 2, currentY + 7);
      doc.rect(margin + cellWidth * 2, currentY, cellWidth, cellHeight);

      doc.text('Total', margin + cellWidth * 2 + 2, currentY + 7);

      // Contenido de la tabla
      currentY += lineHeight;
      doc.setFont('normal');
      productos.forEach((purchase) => {
        doc.text(purchase.producto, margin + 2, currentY + 7);
        doc.text(purchase.total_cantidad.toString(), margin + cellWidth + 2, currentY + 7);
        doc.text(purchase.total_subtotal.toString(), margin + cellWidth * 2 + 2, currentY + 7);
        currentY += lineHeight;
      });

      // Total final
      const totalFinal = productos.reduce((total, purchase) => total + purchase.total_subtotal, 0);
      doc.text(`Total Final: ${totalFinal}`, margin, currentY + 20);

      // Guardar el PDF
      doc.save('reporte_compras.pdf');
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  };


  useEffect(() => {
    productosData();
    productosDataDireccion();
  }, [pedidoId]);

  return (
    <div className="text-center my-4">
      <h1 className="text-3xl font-bold text-blue-500 mb-2">PDF</h1>
      {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={productosData}>Ver el Fetch</button> */}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={generatePDF} disabled={!dataLoaded}>Generar PDF</button>
      {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={checarP}>checar </button> */}
    </div>
  );
};

export default PDF;
