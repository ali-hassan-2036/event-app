import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
);

// Response interceptor to handle errors globally
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/' // 👈 Redirect to login
    }
    return Promise.reject(error);
  }
);

export default {
  // Auth endpoints
  async login(credentials) {
    try {
      const response = await api.post('/login', credentials)
      return {
        user: response.data.user,
        token: response.data.access_token
      }
    } catch (error) {
      throw this.handleError(error)
    }
  },

  async register(userData) {
    try {
      const response = await api.post('/register', userData)
      return {
        user: response.data.user,
        token: response.data.token
      }
    } catch (error) {
      throw this.handleError(error)
    }
  },

  async logout() {
    try {
      await api.post('/logout')
      return true
    } catch (error) {
      throw this.handleError(error)
    }
  },

  // Helper method to handle API errors
  handleError(error) {
    if (error.response) {
      // Server responded with a status code outside 2xx range
      if (error.response.data.message) {
        return new Error(error.response.data.message)
      }
      if (error.response.data.errors) {
        return new Error(error.response.data.errors.join(', '))
      }
      return new Error(`Request failed with status ${error.response.status}`)
    } else if (error.request) {
      // Request was made but no response received
      return new Error('No response from server. Please check your connection.')
    } else {
      // Something happened in setting up the request
      return new Error('Error setting up request. Please try again.')
    }
  }
}