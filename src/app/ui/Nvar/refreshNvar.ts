
import Cookies from 'js-cookie';
import { getrolIdFromToken } from '../getrolID';
const token = Cookies.get('token');
const id_rol = getrolIdFromToken(token);

export const refrescarbarra = (id_rol: number) => {
    
    return id_rol;
}
