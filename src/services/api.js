import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.5.1.200:3333',
});

export default api;
