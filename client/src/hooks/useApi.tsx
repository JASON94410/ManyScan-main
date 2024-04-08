const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

import { destroyTokenUser, refreshTokens } from '../services/authActions/AccessToken';


function applyTokenHeaders(requestOptions: RequestInit): RequestInit {
    const token = localStorage.getItem('accessToken');
    const headers = new Headers(requestOptions.headers);

    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    return {
        ...requestOptions,
        headers: headers,
    }
};

async function handleUnauthorizedError(error: Response): Promise<Response> {
    if (error.status === 401) {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            try {
                const result = await refreshTokens() 
                const responseData = await result.json() 

                localStorage.setItem('accessToken', responseData.accessToken);
                localStorage.setItem('refreshToken', responseData.refreshToken);

                const newRequestOptions = applyTokenHeaders(error);
                return fetch(error.url, newRequestOptions);
            } catch (error) {
                destroyTokenUser()
                window.location.href = '/';
            }
        } else {
            destroyTokenUser()
            window.location.href = '/';
        }
    }
    return Promise.reject(error);
};

export function useApi() {

    function fetchApi(url: string, options: RequestInit = {}): Promise<Response> {
        const requestOptions = applyTokenHeaders(options);

        return fetch(`${API_BASE_URL}${url}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response;
            })
            .catch(error => {
                return handleUnauthorizedError(error);
            })
    }
    async function post(url: string, body: any): Promise<Response> {
        return fetchApi(url, {
            method: 'POST',
            body: JSON.stringify(body),
        })
    }

    return { fetchApi, post /* , get, put, delete */ }
};