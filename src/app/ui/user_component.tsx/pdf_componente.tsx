import React from 'react';
import { jsPDF } from 'jspdf';

function PDF() {


    
  const generatePDF = () => {
    const doc = new jsPDF();
    
    doc.text('Título del PDF', 10, 10);
    doc.text('Este es un texto de ejemplo para el PDF generado con jsPDF en React.', 10, 20);
    
    // Guardar el PDF
    doc.save('archivo.pdf');
  };

  return (
    <div>
      <h1>Generar PDF con React</h1>
      <button onClick={generatePDF}>Generar PDF</button>
    </div>
  );
}

export default PDF;
