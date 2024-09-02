import { backendApi } from "@/api/backendApi";
import MockAdapter from 'axios-mock-adapter';

const mockBackendAdapater = new MockAdapter(backendApi);

mockBackendAdapater.onGet('/test').reply(200, {data: test});

describe('backendApi axios instance', () => {
    
    test('Should have baseURL set to VITE_BACKEND_API_URL', () => {
        const backendUrl = backendApi.defaults.baseURL as string;

        expect(backendUrl).toBe(import.meta.env.VITE_BACKEND_API_URL);
    });

    test('Should set Authorization header with token from localStorage', async () => {
        const token = 'MyAuthToken';
        localStorage.setItem('token', token);


        const response = await backendApi.get('/test');

        expect(response.config.headers.Authorization).toBe(`Bearer ${token}`);
    });

    test('Should not set Authorization header if token is not in localStorage', async () => {
        localStorage.clear();

        const response = await backendApi.get('/test');

        expect(response.config.headers.Authorization).toBeUndefined();
    });
});