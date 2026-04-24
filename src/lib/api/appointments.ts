import apiClient from './client';

export interface Appointment {
    id: string;
    doctor_name: string;
    specialty: string;
    appointment_date: string;
    appointment_time: string;
    reason: string;
    status: string;
    created_at?: string;
}

export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export const appointmentsApi = {
    getAppointments: async (page = 1): Promise<PaginatedResponse<Appointment>> => {
        const response = await apiClient.get<any>('/appointments/', {
            params: { page }
        });
        const data = response.data;
        if (Array.isArray(data)) {
            return { count: data.length, next: null, previous: null, results: data };
        }
        return data;
    },

    bookAppointment: async (data: Omit<Appointment, 'id' | 'status' | 'created_at'>): Promise<Appointment> => {
        const response = await apiClient.post('/appointments/', data);
        return response.data;
    }
};
