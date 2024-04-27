import React from 'react';
import { jsPDF } from 'jspdf';

function PDF() {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Título del reporte
    doc.setFontSize(24);
    doc.setTextColor(33, 150, 243); // Azul
    doc.text('Reporte de Compras', 15, 20);

    // Contenido del reporte
    const margin = 10;
    const startY = 30;
    const cellWidth = 45;
    const cellHeight = 10;
    const lineHeight = 10;
    const date = new Date().toLocaleDateString();
    const purchases = [
      {
        producto: 'Zapatos',
        cantidad: '10 pares',
        precioUnitario: '$50',
        total: '$500'
      },
      {
        producto: 'Camisetas',
        cantidad: '20 unidades',
        precioUnitario: '$20',
        total: '$400'
      }
    ];

    let currentY = startY;

    // Fecha
    doc.setFontSize(12);
    doc.setTextColor(0); // Negro
    doc.text(`Fecha: ${date}`, margin, currentY);

    // Cabecera de la tabla
    currentY += lineHeight;
    doc.setFont('bold');
    doc.setFillColor(200, 220, 255); // Color de fondo de la cabecera
    doc.rect(margin, currentY, cellWidth, cellHeight, 'F');
    doc.text('Producto', margin + 2, currentY + 7);
    doc.rect(margin + cellWidth, currentY, cellWidth, cellHeight, 'F');
    doc.text('Cantidad', margin + cellWidth + 2, currentY + 7);
    doc.rect(margin + cellWidth * 2, currentY, cellWidth, cellHeight, 'F');
    doc.text('Precio Unitario', margin + cellWidth * 2 + 2, currentY + 7);
    doc.rect(margin + cellWidth * 3, currentY, cellWidth, cellHeight, 'F');
    doc.text('Total', margin + cellWidth * 3 + 2, currentY + 7);

    // Contenido de la tabla
    currentY += lineHeight;
    doc.setFont('normal');
    purchases.forEach((purchase, index) => {
      const startY = currentY + (index * cellHeight);
      doc.rect(margin, startY, cellWidth, cellHeight);
      doc.text(purchase.producto, margin + 2, startY + 7);
      doc.rect(margin + cellWidth, startY, cellWidth, cellHeight);
      doc.text(purchase.cantidad, margin + cellWidth + 2, startY + 7);
      doc.rect(margin + cellWidth * 2, startY, cellWidth, cellHeight);
      doc.text(purchase.precioUnitario, margin + cellWidth * 2 + 2, startY + 7);
      doc.rect(margin + cellWidth * 3, startY, cellWidth, cellHeight);
      doc.text(purchase.total, margin + cellWidth * 3 + 2, startY + 7);
    });

    // Total general
    const totalGeneral = purchases.reduce((total, purchase) => total + parseInt(purchase.total.slice(1)), 0);
    currentY += purchases.length * cellHeight + lineHeight;
    doc.setFont('bold');
    doc.text(`Total General: $${totalGeneral}`, margin, currentY);

    // Guardar el PDF
    doc.save('reporte_compras.pdf');
  };

  return (
    <div className="text-center my-4">
      <h1 className="text-3xl font-bold text-blue-500 mb-2">PDF</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={generatePDF}>Generar PDF</button>
    </div>
  );
}

export default PDF;
