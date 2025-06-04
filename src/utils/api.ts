
const API_BASE_URL = 'http://localhost:5000/api';

interface AuthResponse {
  token?: string;
  user?: any;
  message?: string;
}

interface ApiResponse<T = any> {
  token?: string;
  data?: T;
  message?: string;
}

class ApiClient {
  private baseURL: string;
  private token: string | null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('token');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    return response.json();
  }

  // Auth methods
  async register(userData: any): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: any): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.token) {
      this.token = response.token;
      localStorage.setItem('token', response.token);
    }
    
    return response;
  }

  async logout(): Promise<void> {
    this.token = null;
    localStorage.removeItem('token');
  }

  // Items methods
  async getItems(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/items${queryString}`);
  }

  async getItem(id: string) {
    return this.request(`/items/${id}`);
  }

  async createItem(itemData: any) {
    return this.request('/items', {
      method: 'POST',
      body: JSON.stringify(itemData),
    });
  }

  async updateItem(id: string, itemData: any) {
    return this.request(`/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(itemData),
    });
  }

  async deleteItem(id: string) {
    return this.request(`/items/${id}`, {
      method: 'DELETE',
    });
  }

  // Requests methods
  async getRequests(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/requests${queryString}`);
  }

  async createRequest(requestData: any) {
    return this.request('/requests', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  }

  // Messages methods
  async getMessages(userId: string) {
    return this.request(`/messages/${userId}`);
  }

  async sendMessage(messageData: any) {
    return this.request('/messages', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  }

  // User methods
  async getProfile() {
    return this.request('/users/profile');
  }

  async updateProfile(profileData: any) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Reviews methods
  async createReview(reviewData: any) {
    return this.request('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  }

  async getReviews(userId: string) {
    return this.request(`/reviews/${userId}`);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
