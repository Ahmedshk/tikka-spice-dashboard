import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { ApiResponse } from '../types';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for HTTP-only cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add any auth headers if needed (though we're using cookies)
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ApiResponse>) => {
    // Handle common errors
    if (error.response) {
      const { status, data } = error.response;

      // Ensure error response has the correct structure
      if (data && typeof data === 'object' && 'message' in data) {
        // Return the error with the API response data
        return Promise.reject(error);
      }

      // If no structured error, create one
      if (status === 401) {
        // Unauthorized - clear auth state
        // This will be handled by the auth hook
      }

      if (status === 403) {
        // Forbidden - insufficient permissions
      }

      // Return error with response data
      return Promise.reject(error);
    }

    // Network errors or other issues
    return Promise.reject(error);
  }
);

export default api;
