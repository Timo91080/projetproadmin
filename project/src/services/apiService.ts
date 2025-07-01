import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  // Clients
  async getClients() {
    const response = await api.get('/clients');
    return response.data;
  },

  async getClient(id: number) {
    const response = await api.get(`/clients/${id}`);
    return response.data;
  },

  async createClient(clientData: any) {
    const response = await api.post('/clients', clientData);
    return response.data;
  },

  async updateClient(id: number, clientData: any) {
    const response = await api.put(`/clients/${id}`, clientData);
    return response.data;
  },

  async deleteClient(id: number) {
    const response = await api.delete(`/clients/${id}`);
    return response.data;
  },

  // Stations
  async getStations() {
    const response = await api.get('/stations');
    return response.data;
  },

  async getStation(id: number) {
    const response = await api.get(`/stations/${id}`);
    return response.data;
  },

  async createStation(stationData: any) {
    const response = await api.post('/stations', stationData);
    return response.data;
  },

  async updateStation(id: number, stationData: any) {
    const response = await api.put(`/stations/${id}`, stationData);
    return response.data;
  },

  async deleteStation(id: number) {
    const response = await api.delete(`/stations/${id}`);
    return response.data;
  },

  // Reservations
  async getReservations() {
    const response = await api.get('/reservations');
    return response.data;
  },

  async getReservation(id: number) {
    const response = await api.get(`/reservations/${id}`);
    return response.data;
  },

  async createReservation(reservationData: any) {
    const response = await api.post('/reservations', reservationData);
    return response.data;
  },

  async deleteReservation(id: number) {
    const response = await api.delete(`/reservations/${id}`);
    return response.data;
  },

  // Sessions
  async getSessions() {
    const response = await api.get('/sessions');
    return response.data;
  },

  async startSession(reservationId: number) {
    const response = await api.post('/sessions/start', { id_reservation: reservationId });
    return response.data;
  },

  async endSession(id: number) {
    const response = await api.put(`/sessions/${id}/end`);
    return response.data;
  },

  async deleteSession(id: number) {
    const response = await api.delete(`/sessions/${id}`);
    return response.data;
  },

  // Dashboard
  async getDashboardStats() {
    const response = await api.get('/dashboard/stats');
    return response.data;
  }
};