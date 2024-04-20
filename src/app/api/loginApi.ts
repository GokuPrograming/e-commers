// api/loginApi.ts

export const login = async (correo: string, password: string) => {
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ correo, password }),
        });
        const data = await response.json();

        if (response.ok) {
            return { success: true, data };
        } else {
            return { success: false, error: data.message || 'Login failed. Please try again.' };
        }
    } catch (error) {
        return { success: false, error: 'An error occurred. Please try again.' };
    }
};
