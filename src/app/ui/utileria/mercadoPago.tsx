 "use client"
import { useState } from 'react';
import { initMercadoPago } from '@mercadopago/sdk-react'
initMercadoPago('TEST-79569192-531b-4157-a5da-55127fcff800');


const Pago = () => {
  

    const handlePagoClick = () => {
        // setLoading(true);

        // Realiza una solicitud GET a tu backend para obtener el init_point de MercadoPago
        fetch('/api/preference')
            .then((res) => res.json())
            .then((data) => {
                // Redirige al usuario a la página de pago de MercadoPago
                window.location.href = data.init_point;
            })
            .catch((error) => {
                console.error('Error al obtener la preferencia de pago:', error);
                // setLoading(false);
            });
    };

    return (
        <div>
            <h1>Realizar Pago</h1>
            <button onClick={handlePagoClick}>Mercado libre
            </button>
        </div>
    );
};

export default Pago;
