"use client"
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { getUserIdFromToken } from '../authUtils';
import PayPalComponent from '@/app/ui/utileria/paypal';
import Cookies from 'js-cookie';
import Pago from '../utileria/mercadoPago';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { log } from 'console';
const token = Cookies.get('token');
///variables necesarias para su funcionalidad
interface PersonalData {
    nombre: string;
    apellido_materno: string;
    apellido_paterno: string;
    correo: string;
    telefono: string;
}


interface AddressData {
    id_estado: number,
    id_pais: number,
    codigo_postal: string;
    descripcion: string;
    direccion: string;
    ciudad: string;

}

interface CardData {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}
interface Cupon {
    cupon: string;
}
interface Total {
    total: number;
}
interface orderID {
    orderID: string;
}
// interface ClienteData {
//     nombre: string;
//     apellido_paterno: string;
//     apellido_materno: string;
//     telefono: string;
//     correo: string;
//     id_usuario: number;
//     id_cliente: number;
// }

const CheckoutForm: React.FC = () => {
    const [countries, setCountries] = useState<{ id: number; name: string }[]>([]);
    const [options, setOptions] = useState<{ id: number; name: string }[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [datosCliente, setDataClient] = useState<any[]>([]);



    //let id_pais, estado;
    ///registro de los paises

    const [activeStep, setActiveStep] = useState<number>(0);

    const [personalData, setPersonalData] = useState<PersonalData>({
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        correo: '',
        telefono: ''
    });

    const [total, setTotal] = useState<Total>({
        total: 0,
    })
    const fetchTotal = async () => {
        try {
            const userId = getUserIdFromToken(token);
            const apiClient = 'https://api-cuchau-store-pg.onrender.com/user/car/total';
            const requestBody = {
                id_usuario: userId,
            };
            const response = await fetch(apiClient, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) {
                throw new Error('No se pudo obtener los datos');
            }
            const responseData = await response.json();
            setTotal({
                //los valores de la base de datos se recuperan en las variables globales para su uso mas practico
                total: responseData.data[0].total
            });
            console.log("el total=", responseData.data[0].total);
            if (responseData.data.length > 0) {
                console.log("Los datos están cargados:", responseData.data[0].total);
            } else {
                console.log("Los datos están vacíos o no se pudieron cargar");
            }
            // Aquí puedes usar los valores de datosCliente
            if (datosCliente.length > 0) {
                const primerApellido = datosCliente[0].apellido_paterno;
                console.log("Primer apellido del cliente:", primerApellido);
            }

        } catch (error) {
            console.error('Error al obtener los datos:', error instanceof Error ? error.message : String(error));
            setError(error instanceof Error ? error.message : String(error));
        } finally {
            setIsLoading(false);
        }
    };
    //trae los datos de pais 
    const fetchData = async () => {
        try {
            const response = await fetch('https://api-cuchau-store-pg.onrender.com/pais');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCountries(data.data);
            console.log(" los paises se han cargado correctamemte")
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    // carga la informacion del cliente 
    const fetchInformacionCliente = async () => {
        try {
            const userId = getUserIdFromToken(token);
            const apiClient = 'https://api-cuchau-store-pg.onrender.com/informacionCliente';
            const requestBody = {
                id_usuario: userId,
            };
            const response = await fetch(apiClient, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) {
                throw new Error('No se pudo obtener los datos');
            }
            const responseData = await response.json();
            setDataClient(responseData.data);
            setPersonalData({
                //los valores de la base de datos se recuperan en las variables globales para su uso mas practico
                nombre: responseData.data[0].nombre,
                apellido_paterno: responseData.data[0].apellido_paterno,
                apellido_materno: responseData.data[0].apellido_materno,
                correo: responseData.data[0].correo,
                telefono: responseData.data[0].telefono
            });
            console.log("guardado en set data client");
            console.log("los datos del usuario con .data: ", responseData.data);
            console.log("los datos del usuario sin .data: ", responseData);
            console.log("el apellido p=", responseData.data[0].apellido_paterno);
            if (responseData.data.length > 0) {
                console.log("Los datos están cargados:", responseData.data);
            } else {
                console.log("Los datos están vacíos o no se pudieron cargar");
            }
            // Aquí puedes usar los valores de datosCliente
            if (datosCliente.length > 0) {
                const primerApellido = datosCliente[0].apellido_paterno;
                console.log("Primer apellido del cliente:", primerApellido);
            }

        } catch (error) {
            console.error('Error al obtener los datos:', error instanceof Error ? error.message : String(error));
            setError(error instanceof Error ? error.message : String(error));
        } finally {
            setIsLoading(false);
        }
    };

    const handleChangeCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const id = countries.find((country) => country.name === event.target.value)?.id || null;
        setSelectedCountry(id);
        fetchOptions(id);
        addressData.id_pais = id;
        console.log("el id del pais a guardar es: ", personalData.id_pais)
    };
    const handleSaveState = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const id = options.find((estado) => estado.name === event.target.value)?.id || null;

        addressData.id_estado = id;
        console.log("el id del estado a guardar es: ", personalData.id_estado)
    };

    const fetchOptions = async (id: number | null) => {
        if (id !== null) {
            console.log("es el ID= ", id);
            try {
                const response = await fetch(`https://api-cuchau-store-pg.onrender.com/estados/${id}`); // Ruta a tu otra API en Next.js
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log("es el ID= ", { id });
                setOptions(data.data);
                console.log("esta el la data opctio: ", data.data)
                // Asumiendo que la respuesta contiene un array de opciones
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        } else {
            setOptions([]); // Si no hay un país seleccionado, reiniciar las opciones
        }
    };
    //ejecuta todos los metodos en automatico al cargar la pagina
    useEffect(() => {

        fetchInformacionCliente();
        fetchData();
        fetchTotal();        //  fetchInformacionCliente();
    }, []);

    const [addressData, setAddressData] = useState<AddressData>({
        direccion: '',
        ciudad: '',
        descripcion: '',
        id_estado: 0,
        id_pais: 0,
        codigo_postal: ''
    });

    const [cupon, setCupon] = useState<Cupon>({
        cupon: '',
    })

    const [orderID, setOrderId] = useState<orderID>({
        orderID: '',
    });

    const handleProbarCupon = async () => {
        const userId = getUserIdFromToken(token); // Asegúrate de que esta función esté definida y token esté definido.
        const apiUrl = 'https://api-cuchau-store-pg.onrender.com/user/cupon';

        const requestBody = {
            codigo: cupon.cupon,
            id_usuario: userId // Cambiado punto y coma por coma
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Asegúrate de que token esté definido
            },
            body: JSON.stringify(requestBody)
        });

        // if (!response.ok) {
        //     console.log("el cupon es", cupon.cupon);
        //     throw new Error('Error al enviar la solicitud');

        // }

        console.log('Solicitud enviada con éxito');
        const responseData = await response.json();
        console.log('Respuesta de la API:', responseData.message);
        alert(responseData.message);
        const newTotal = responseData.newTotal;
        if (newTotal > 0) {
            setTotal({
                total: newTotal
            });
        } else {
            //no hace nada
        }
        // Asignando newTotal a una variable
        //Ahora puedes usar newTotal como lo necesites
        console.log(newTotal);
    };

    const handleActualizarOrderID = (orderID1: any) => {
        console.log("es el order id de la peticion", orderID1);
        
        // setOrderId({
        //     orderID:orderID1
        //     });
        orderID.orderID=orderID1;
        console.log("cargo el handler",orderID.orderID);
       // orderID:"mememem"
        
    };

    const handleNext = (): void => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // console.log("presionaste Next y los datatos son ","id del pais:", personalData.id_pais,"id del estado", personal.id_esatdo)
    };

    const handleBack = (): void => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    //     e.preventDefault();
    //     console.log('Personal Data:', personalData);
    //     console.log('Address Data:', addressData);
    //     console.log('Card Data:', cardData);
    //     console.log('cupon data:', cupon)

    //     const userId = getUserIdFromToken(token);
    //     const apiUrl = 'https://api-cuchau-store-pg.onrender.com/realizar_compra';
    //     const requestBody = {
    //         id_usuario: userId,
    //         direccion: addressData.direccion,
    //         ciudad: addressData.ciudad,
    //         descripcion: addressData.descripcion,
    //         id_estado: addressData.id_estado,
    //         id_pais: addressData.id_pais,
    //         codigo_postal: addressData.codigo_postal,
    //         correo: personalData.correo,
    //         nombre: personalData.nombre,
    //         apellido_paterno: personalData.apellido_paterno,
    //         apellido_materno: personalData.apellido_materno,
    //         telefono: personalData.telefono,
    //         codigo: cupon.cupon
    //     };

    //     const response = await fetch(apiUrl, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`
    //         },
    //         body: JSON.stringify(requestBody)
    //     });

    //     if (!response.ok) {

    //         throw new Error('Error al enviar la solicitud');
    //     }

    //     console.log('Solicitud enviada con éxito');
    //     const responseData = await response.json();
    //     console.log('Respuesta de la API:', responseData);
    //     alert('Producto agregado al carrito exitosamente');
    //     //reset();
    // };
    const handleSubmit = async (): Promise<void> => {
        try {
            console.log('Personal Data:', personalData);
            console.log('Address Data:', addressData);
   
            console.log('cupon data:', cupon)
            console.log('total a enviar', total.total);
            console.log('ORDER ID_ ',orderID.orderID);
            

            const userId = getUserIdFromToken(token);
            const apiUrl = 'https://api-cuchau-store-pg.onrender.com/realizar_compra';
            const requestBody = {
                id_usuario: userId,
                direccion: addressData.direccion,
                ciudad: addressData.ciudad,
                descripcion: addressData.descripcion,
                id_estado: addressData.id_estado,
                id_pais: addressData.id_pais,
                codigo_postal: addressData.codigo_postal,
                correo: personalData.correo,
                nombre: personalData.nombre,
                apellido_paterno: personalData.apellido_paterno,
                apellido_materno: personalData.apellido_materno,
                telefono: personalData.telefono,
                codigo: cupon.cupon,
                total: total.total,
                orderID: orderID.orderID
            };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error('Error al enviar la solicitud');
            }

            console.log('Solicitud enviada con éxito');
            const responseData = await response.json();
            console.log('Respuesta de la API:', responseData);
            alert('Producto agregado al carrito exitosamente');
        } catch (error) {
            console.error('Error al realizar la compra:', error);
            throw error;
        }
    };


    const getStepContent = (stepIndex: number): JSX.Element | string => {
        const handleInputChange = (setState: React.Dispatch<React.SetStateAction<any>>, key: string) =>
            (e: React.ChangeEvent<HTMLInputElement>) => {
                setState(prevState => ({ ...prevState, [key]: e.target.value }));
            };

        switch (stepIndex) {
            case 0:
                return (
                    <Grid container spacing={3}>
                        <TextField
                            label="Nombre"
                            fullWidth
                            value={personalData.nombre}
                            onChange={handleInputChange(setPersonalData, 'nombre')}
                        />
                        <TextField
                            label="Apellido Paterno"
                            fullWidth
                            value={personalData.apellido_paterno}
                            onChange={handleInputChange(setPersonalData, 'apellido_paterno')}
                        />
                        <TextField
                            label="Apellido materno"
                            fullWidth
                            value={personalData.apellido_materno}
                            onChange={handleInputChange(setPersonalData, 'apellido_materno')}
                        />
                        <TextField
                            label="Correo electrónico"
                            fullWidth
                            value={personalData.correo}
                            onChange={handleInputChange(setPersonalData, 'correo')}
                        />

                        <TextField
                            label="Telefono"
                            fullWidth
                            value={personalData.telefono}
                            onChange={handleInputChange(setPersonalData, 'telefono')}
                        />
                        <TextField
                            label="Total"
                            fullWidth
                            value={total.total}
                        //onChange={handleInputChange(setPersonalData, 'telefono')}
                        />

                    </Grid>
                );
            case 1:
                return (
                    <Grid container spacing={3}>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h1 className="text-xl font-semibold mb-4">Seleccionar país</h1>
                            <select className="block w-full p-3 border rounded-md mb-4"
                                onChange={handleChangeCountry}>
                                <option value="" className="text-gray-500">Selecciona un país</option>
                                {countries.map((country) => (
                                    <option key={country.id} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                            <h1 className="text-xl font-semibold mb-4">Selecciona un Estado</h1>
                            <select className="block w-full p-3 border rounded-md" onChange={handleSaveState}>
                                <option value="" className="text-gray-500">Selecciona un Estado</option>
                                {options.map((estado) => (
                                    <option key={estado.id} value={estado.name}>
                                        {estado.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <TextField
                            label="Ciudad"
                            fullWidth
                            value={addressData.ciudad}
                            onChange={handleInputChange(setAddressData, 'ciudad')}
                        />
                        <TextField
                            label="Calle"
                            fullWidth
                            value={addressData.direccion}
                            onChange={handleInputChange(setAddressData, 'direccion')}
                        />
                        <TextField
                            label="Descripcion del lugar"
                            fullWidth
                            value={addressData.descripcion}
                            onChange={handleInputChange(setAddressData, 'descripcion')}
                        />
                        <TextField
                            label="Codigo Postal"
                            fullWidth
                            value={addressData.codigo_postal}
                            onChange={handleInputChange(setAddressData, 'codigo_postal')}
                        />
                        <TextField
                            label="Tienes algun Cupon?"
                            fullWidth
                            value={cupon.cupon}
                            onChange={handleInputChange(setCupon, 'cupon')}
                        />
                        <Button onClick={handleProbarCupon} variant="outlined" color="primary" className="mr-2">
                            PROBAR CUPON
                        </Button>
                    </Grid>
                );
            case 2:
                return (
                    <Grid container spacing={3}>
                        <PayPalScriptProvider options={{
                            'client-id': 'ATsXThlRKQMIDRsC0xX-EWt57Vg_FkznXcQNTrWdHgT-X2337ZiEuWGnnOgtubRXGfMJICcIOZ_lZ6aY&currency=MXN',
                        }}>
                            <PayPalButtons
                                createOrder={async () => {
                                    try {
                                        const response = await fetch('https://api-cuchau-store-pg.onrender.com/api/create-order', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({
                                                amount: total.total.toString(),
                                                currency_code: 'MXN', // Specify MXN for pesos
                                            }),
                                        });

                                        if (!response.ok) {
                                            throw new Error('Error al crear el pedido');
                                        }

                                        const data = await response.json();
                                        return data.orderID;
                                    } catch (error) {
                                        console.log(error);
                                        throw error;
                                    }
                                }}
                                onApprove={async (data, actions: any) => {
                                    // Aquí puedes realizar acciones adicionales cuando el pago es aprobado
                                    console.log('Pago aprobado:', data);
                                   const OrderId1 = data.orderID;
                                    // console.log('order id ', data.orderID);
                                  handleActualizarOrderID(OrderId1);
                                  console.log("veremos si el orden se actualizo: ",orderID.orderID)
                                    await handleSubmit();
                                    return actions.order.capture();
                                }}
                                onCancel={(data: any) => {
                                    // Aquí puedes realizar acciones adicionales cuando el usuario cancela el pago
                                    console.log('Pago cancelado:', data);
                                }}
                                style={{ layout: 'horizontal' }}
                            // ... other PayPalButtons props
                            />
                        </PayPalScriptProvider>

                    </Grid>
                );
            default:
                return 'Unknown stepIndex';
        }
    };

    //paypal

    return (
        <form onSubmit={handleSubmit} className="mx-auto max-w-md mt-10 p-6 bg-white rounded-lg shadow-md">
            <Stepper activeStep={activeStep} className="mb-6">
                <Step key="Personal Info">
                    <StepLabel>Información personal</StepLabel>
                </Step>
                <Step key="Address">
                    <StepLabel>Dirección</StepLabel>
                </Step>
                <Step key="Card">
                    <StepLabel>Tarjeta</StepLabel>
                </Step>
            </Stepper>
            {getStepContent(activeStep)}
            <div className="mt-6">
                {activeStep !== 0 && (
                    <Button onClick={handleBack} variant="outlined" color="primary" className="mr-2">
                        Anterior
                    </Button>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={activeStep === 2 ? handleSubmit : handleNext}
                >
                    {activeStep === 2 ? 'Finalizar' : 'Siguiente'}
                </Button>
            </div>
        </form>
    );
};

export default CheckoutForm;
