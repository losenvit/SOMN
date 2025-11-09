import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: async (data: { email: string; username: string; password: string }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
  login: async (data: { username: string; password: string }) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
};

// Competition APIs
export const competitionAPI = {
  getAll: async () => {
    const response = await api.get('/competitions/');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/competitions/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/competitions/', data);
    return response.data;
  },
  update: async (id: number, data: any) => {
    const response = await api.put(`/competitions/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/competitions/${id}`);
    return response.data;
  },
};

// Participant APIs
export const participantAPI = {
  getByCompetition: async (competitionId: number) => {
    const response = await api.get(`/participants/competition/${competitionId}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/participants/', data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/participants/${id}`);
    return response.data;
  },
};

export default api;
