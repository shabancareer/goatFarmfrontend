import { api } from "./api";

const API_BASE_URL = 'http://localhost:3000/api/goats'; // Update with your backend URL

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});