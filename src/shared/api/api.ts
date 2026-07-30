import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

// Lazy import to avoid circular dependency with store
// store → authSlice → api (would be circular if api imported store directly)
let _store: any;
export function injectStore(store: any) {
    _store = store;
}

export const api: AxiosInstance = axios.create({
    // baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/v1/',
    baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000/',
    headers: { 'Content-Type': 'application/json' },
});

// ── Attach access token to every request ─────────────────────────────────────
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = _store?.getState()?.auth?.accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// ── Silent refresh on 401 ────────────────────────────────────────────────────
let isRefreshing = false;
let queue: Array<{ resolve: (t: string) => void; reject: (e: any) => void }> = [];

function flushQueue(error: any, token: string | null) {
    queue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)));
    queue = [];
}

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const original = error.config;
        if (error.response?.status !== 401 || original._retry) return Promise.reject(error);
        original._retry = true;

        const refreshToken = _store?.getState()?.auth?.refreshToken;
        if (!refreshToken) {
            _store?.dispatch({ type: 'auth/logout/fulfilled' });
            return Promise.reject(error);
        }

        if (isRefreshing) {
            return new Promise((resolve, reject) => queue.push({ resolve, reject }))
                .then((newToken) => {
                    original.headers.Authorization = `Bearer ${newToken}`;
                    return api(original);
                });
        }

        isRefreshing = true;
        try {
            const { data } = await axios.post(
                `${api.defaults.baseURL}`,
                {},
                { headers: { Authorization: `Bearer ${refreshToken}` } },
            );
            _store?.dispatch({ type: 'auth/tokenRefreshed', payload: data });
            flushQueue(null, data.accessToken);
            original.headers.Authorization = `Bearer ${data.accessToken}`;
            return api(original);
        } catch (err) {
            flushQueue(err, null);
            _store?.dispatch({ type: 'auth/logout/fulfilled' });
            return Promise.reject(err);
        } finally {
            isRefreshing = false;
        }
    },
);