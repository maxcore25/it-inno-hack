import axios from 'axios';

// export const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
// });

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    Authorization: `Bearer ${typeof localStorage !== 'undefined' && localStorage.getItem('access_token')}`,
  },
});

export * from './auth';
export * from './project';
export * from './task-column';
export * from './task';
