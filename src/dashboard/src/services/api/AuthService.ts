import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${localStorage.getItem('token')}`, // get token from local storage
  },
});

export const login = async (data: { email: string; password: string }) => {
  //   api.post('auth/login', data);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email === 'manh2909@gmail.com' && data.password) {
        resolve({
          status: 200,
          statusText: 'OK',
          data: {
            accessToken: 'fake-jwt-token',
          },
        });
      } else {
        reject({
          status: 401,
          message: 'Invalid credentials',
        });
      }
    }, 5000);
  });
};

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  //   api.post('auth/login', data);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email === 'manh2909@gmail.com' && data.password && data.name) {
        resolve({
          status: 200,
          statusText: 'OK',
          data: {
            accessToken: 'fake-jwt-token',
          },
        });
      } else {
        reject({
          status: 401,
          message: 'Invalid credentials',
        });
      }
    }, 5000);
  });
};
