const jwt = require('jsonwebtoken');

export const getUserIdFromToken = (token: string): number | null |any  => {
    try {
        const decodedToken: any = jwt.verify(token, 'secreto'); // Asegúrate de usar el mismo "secreto"
        if (!decodedToken || !decodedToken.id_usuario) {
            throw new Error('Token inválido');
        }
        return decodedToken.id_usuario;
    } catch (error) {
       // console.error('Error al verificar el token:', error.message);
        return null;
    }
};

