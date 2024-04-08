import { useApi } from '../../hooks/useApi';
 const api = useApi();

// Call API BACK-END login function
export async function signin(body: any) {
    try {
        const login = api.post('api/api/auth/signin', body)
        return login

    } catch (error) {
        console.log('error auth' + error)
    }
}