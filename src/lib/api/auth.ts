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
        document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    },

    getRole: (): 'patient' | 'doctor' => {
        const role = localStorage.getItem('user_role') || 'PATIENT';
        return role === 'DOCTOR' ? 'doctor' : 'patient';
    },

    isAuthenticated: (): boolean => {
        if (typeof window === 'undefined') return false;
        return !!localStorage.getItem('access_token');
    },
};
