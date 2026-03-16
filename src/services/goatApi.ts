import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/'; // Update with your backend URL

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const goatApi = {
    // Create new goat
    createGoat: async (goatData: any) => {
        const response = await api.post('/goats', goatData);
        return response.data;
    },
};

// Request interceptor for API calls
// api.interceptors.request.use(
//     (config) => {
//         console.log(`🚀 Making ${config.method?.toUpperCase()} request to: ${config.url}`);
//         // You can add auth tokens here later
//         // const token = localStorage.getItem('token');
//         // if (token) {
//         //   config.headers.Authorization = `Bearer ${token}`;
//         // }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// Response interceptor for API calls
// api.interceptors.response.use(
//     (response) => {
//         console.log('✅ Response received:', response.status);
//         return response;
//     },
//     (error) => {
//         console.error('❌ API Error:', error.response?.data || error.message);
//         return Promise.reject(error);
//     }
// );