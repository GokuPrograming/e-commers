import React from 'react'
import PayPalComponent from '@/app/ui/utileria/paypal';
import Pago from '@/app/ui/utileria/mercadoPago';
function paypal() {
    return (
        <div>paypal
            <PayPalComponent></PayPalComponent>
            1
            <form action="https://sandbox.pagofacil.tech/Payform" method="POST" name="formularioPago" target="_blank">
                2
                <input name="idSucursal" type="hidden" value="ApiKeySucursal" />
                3
                <input name="idUsuario" type="hidden" value="ApiKeyUsuario" />
                4
                <input name="idServicio" type="hidden" value="1" />
                5
                <input name="idPedido" type="hidden" value="-" />
                6
                <input name="nombre" type="hidden" value="Jon" />
                7
                <input name="apellidos" type="hidden" value="Doe" />
                8
                <input name="email" type="hidden" value="user@mail.com" />
                9
                <input name="telefono" type="hidden" value="5513374678" />
                10
                <input name="celular" type="hidden" value="5513374678" />
                11
                <input name="calleyNumero" type="hidden" value="Reforma 222" />
                12
                <input name="colonia" type="hidden" value="Centro" />
                13
                <input name="municipio" type="hidden" value="Cuahutemoc" />
                14
                <input name="estado" type="hidden" value="CDMX" />
                15
                <input name="pais" type="hidden" value="Mexico" />
                16
                <input name="cp" type="hidden" value="11560" />
                17
                <input name="redireccion" id="redireccion" type="hidden" value="1" />
                18
                <input name="urlResponse" id="urlResponse" type="hidden" value="http://empresa.com/webhook" />
                19
                <input name="monto" type="hidden" value="1.00" />
                20
                <input name="plan" type="hidden" value="NOR" />
                21
                <input name="mensualidades" type="" value="00" />
                22

                23
                <input className="" name="submit" type="submit" value="Comprar / Pagar" />
                24
            </form>

        </div>
    )
}

export default paypal