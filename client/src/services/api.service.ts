import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../utils/constants";
import { ApiResponse } from "../types";
import { store } from "../store/store";
import { clearUser } from "../store/slices/auth.slice";

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for HTTP-only cookies
  headers: {
    "Content-Type": "application/json",
  },
});

let refreshPromise: Promise<unknown> | null = null;

function doRefresh(): Promise<unknown> {
  if (refreshPromise) return refreshPromise;
  refreshPromise = api.post(API_ENDPOINTS.AUTH.REFRESH, undefined, {
    withCredentials: true,
  });
  refreshPromise.finally(() => {
    refreshPromise = null;
  });
  return refreshPromise;
}

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor: on 401 try refresh once, then retry or clear session
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError<ApiResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      const isRefreshRequest =
        originalRequest.url?.includes("/auth/refresh") === true;
      if (isRefreshRequest) {
        store.dispatch(clearUser());
        throw error;
      }

      originalRequest._retry = true;
      try {
        await doRefresh();
        return api(originalRequest);
      } catch {
        store.dispatch(clearUser());
        throw error;
      }
    }

    throw error;
  }
);

export default api;
