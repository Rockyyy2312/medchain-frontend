import apiClient from './client';

export interface RAGQueryRequest {
    query: string;
    patient_id?: string;
    top_k?: number;
}

export interface SourceChunk {
    text: string;
    source_type: 'profile' | 'record' | 'appointment';
    source_id: string;
    patient_id: string;
    score: number;
}

export interface RAGQueryResponse {
    answer: string;
    sources: SourceChunk[];
    query: string;
}

export interface RAGHealthResponse {
    status: string;
    index_loaded: boolean;
    total_vectors: number;
    llm_provider: string;
    embedding_model: string;
}

const RAG_BASE_URL = process.env.NEXT_PUBLIC_RAG_URL || 'http://localhost:8001/api/v1';

// Get the JWT token from wherever it's stored in the Django auth flow
function getAuthHeaders(): Record<string, string> {
    if (typeof window === 'undefined') return {};
    const token = localStorage.getItem('access_token') || 
                  sessionStorage.getItem('access_token') || '';
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export const ragApi = {
    query: async (params: RAGQueryRequest): Promise<RAGQueryResponse> => {
        const res = await fetch(`${RAG_BASE_URL}/query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders(),
            },
            body: JSON.stringify(params),
        });
        if (!res.ok) {
            const err = await res.json().catch(() => ({ detail: res.statusText }));
            throw new Error(err.detail || 'Query failed');
        }
        return res.json();
    },

    reindex: async (): Promise<{ status: string; total_chunks: number; message: string }> => {
        const res = await fetch(`${RAG_BASE_URL}/reindex`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders(),
            },
        });
        if (!res.ok) {
            const err = await res.json().catch(() => ({ detail: res.statusText }));
            throw new Error(err.detail || 'Reindex failed');
        }
        return res.json();
    },

    health: async (): Promise<RAGHealthResponse> => {
        const res = await fetch(`${RAG_BASE_URL}/health`, {
            headers: { ...getAuthHeaders() },
        });
        return res.json();
    },
};
