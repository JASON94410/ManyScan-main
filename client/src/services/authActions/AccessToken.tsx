import { useApi } from '../../hooks/useApi';

require('dotenv').config({ path: '../config/.env' });

const api = useApi();

export async function refreshTokens() {
    const token = localStorage.getItem('refreshToken');

    if (!token) {
        throw new Error('Refresh token not found');
    }

    const requestOptions = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }

    try {
        const refreshResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/refresh-token`, requestOptions);

        if (!refreshResponse.ok) {
            throw new Error('Failed to refresh token');
        }

        return refreshResponse;
    } catch (error) {
        throw new Error('Failed to refresh token');
    }
};
export async function destroyTokenUser() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
};