/**
 * API Service - Central HTTP client for backend communication
 * 
 * STUB: Replace BASE_URL with your actual backend URL.
 * Expected backend: Node.js + Express running on port 5000
 * 
 * Endpoints documented inline for each method.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

class ApiService {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  clearToken() {
    this.token = null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn(`[API STUB] ${options.method || 'GET'} ${endpoint} — Backend not connected. Using local data.`);
      throw error;
    }
  }

  // --- Generic CRUD ---
  async get<T>(endpoint: string) { return this.request<T>(endpoint); }
  async post<T>(endpoint: string, body: unknown) { return this.request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }); }
  async put<T>(endpoint: string, body: unknown) { return this.request<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) }); }
  async delete<T>(endpoint: string) { return this.request<T>(endpoint, { method: 'DELETE' }); }
}

export const apiService = new ApiService();
export default apiService;
