"use client"
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

interface PayPalComponentProps {
    // amount: string;
    // currencyCode: string;
    // nombre: string;
    // apellido_materno: string;
    // apellido_paterno: string;
    // correo: string;
    // telefono: string;
    // id_estado: number,
    // id_pais: number,
    // codigo_postal: string;
    // descripcion: string;
    // direccion: string;
    // ciudad: string;
    // cupon: string;
    onSubmit: () => void;
}
const PayPalComponent: React.FC<PayPalComponentProps> = () => {
    return (
        <div>
            <PayPalScriptProvider options={{ 'client-id': 'ATsXThlRKQMIDRsC0xX-EWt57Vg_FkznXcQNTrWdHgT-X2337ZiEuWGnnOgtubRXGfMJICcIOZ_lZ6aY' }}>
                <PayPalButtons
                    createOrder={async () => {
                        try {
                            const response = await fetch('http://localhost:3000/api/create-order', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    // Puedes agregar aquí los detalles del pedido, como el monto y la moneda
                                    amount: '10.00',
                                    currency_code: 'USD',
                                }),
                            });

                            if (!response.ok) {
                                throw new Error('Error al crear el pedido');
                            }

                            const data = await response.json();
                            return data.orderID; // Debes retornar el ID del pedido que recibes del servidor
                        } catch (error) {
                            console.log(error);
                            throw error;
                        }
                    }}
                    onApprove={async (data: any, actions: any) => {
                        // Aquí puedes realizar acciones adicionales cuando el pago es aprobado
                        console.log('Pago aprobado:', data);
                        return actions.order.capture();
                    }}
                    onCancel={(data: any) => {
                        // Aquí puedes realizar acciones adicionales cuando el usuario cancela el pago
                        console.log('Pago cancelado:', data);
                    }}
                    style={{ layout: 'horizontal' }}
                />
            </PayPalScriptProvider>
        </div>
    );
};

export default PayPalComponent;

