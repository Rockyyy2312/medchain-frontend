import apiClient from './client';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    access: string;
    refresh: string;
    role: string;
    email: string;
    first_name?: string;
    last_name?: string;
    user_id?: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    role?: 'PATIENT' | 'DOCTOR';
}

export interface RegisterResponse {
    message: string;
    user_id: string;
}

export const authApi = {
    login: async (data: LoginRequest): Promise<LoginResponse> => {
        const response = await apiClient.post<LoginResponse>('/auth/login/', data);
        if (typeof window !== 'undefined') {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            localStorage.setItem('user_role', response.data.role);
            localStorage.setItem('user_email', response.data.email);
            if (response.data.first_name) localStorage.setItem('user_first_name', response.data.first_name);
            if (response.data.last_name) localStorage.setItem('user_last_name', response.data.last_name);
            if (response.data.user_id) localStorage.setItem('user_id', String(response.data.user_id));
        }
        return response.data;
    },

    register: async (data: RegisterRequest): Promise<RegisterResponse> => {
        const response = await apiClient.post<RegisterResponse>('/auth/register/', data);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_role');
        localStorage.removeItem('user_email');
        localStorage.removeItem('user_first_name');
        localStorage.removeItem('user_last_name');
        localStorage.removeItem('user_id');
        document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    },

    getRole: (): 'patient' | 'doctor' => {
        const role = localStorage.getItem('user_role') || 'PATIENT';
        return role === 'DOCTOR' ? 'doctor' : 'patient';
    },

    getProfile: async () => {
        const response = await apiClient.get('/auth/me/');
        return response.data;
    },

    getDoctors: async (): Promise<Array<{ id: string; email: string; name: string; specialty: string }>> => {
        const response = await apiClient.get('/auth/doctors/');
        return response.data;
    },

    isAuthenticated: (): boolean => {
        if (typeof window === 'undefined') return false;
        return !!localStorage.getItem('access_token');
    },
};
