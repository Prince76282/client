import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8080/api/overlays'; // Ensure this is the correct URL for your Flask app

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
