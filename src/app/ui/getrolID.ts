const jwt = require('jsonwebtoken');

export const getrolIdFromToken = (token: string): number | null => {
    try {
        const decodedToken: any = jwt.verify(token, 'secreto'); // Asegúrate de usar el mismo "secreto"
        if (!decodedToken || !decodedToken.id_rol) {
            throw new Error('Token inválido');
        }
       // console.log(decodedToken.id_rol)
       return decodedToken.id_rol;
    } catch (error) {
        console.error('Error al verificar el token:', error.message);
        return null;
    }
};
