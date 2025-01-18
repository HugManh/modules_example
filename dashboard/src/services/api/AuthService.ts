import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${localStorage.getItem('token')}`, // get token from local storage
  },
});

export const login = async (data: { email: string; password: string }) =>
  api.post('auth/login', data);

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => api.post('auth/register', data);
