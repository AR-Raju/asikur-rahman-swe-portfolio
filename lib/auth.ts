const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://swe-portfolio-server.vercel.app/api";

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = API_BASE_URL;
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("auth_token");
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    // Ensure headers is always a plain object
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers ? (options.headers as Record<string, string>) : {}),
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "An error occurred" }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // Authentication
  async login(email: string, password: string) {
    const response = await this.request<{ data: { token: string; user: any } }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    this.setToken(response.data.token);
    return response.data;
  }

  async logout() {
    try {
      await this.request("/auth/logout", { method: "POST" });
    } finally {
      this.clearToken();
    }
  }

  async getCurrentUser() {
    return this.request<{ data: any }>("/auth/me");
  }

  // Profile
  async getProfile() {
    return this.request<{ data: any }>("/profile");
  }

  async updateProfile(data: any) {
    return this.request<{ data: any }>("/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  // Education
  async getEducation() {
    return this.request<{ data: any[] }>("/education");
  }

  async createEducation(data: any) {
    return this.request<{ data: any }>("/education", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateEducation(id: string, data: any) {
    return this.request<{ data: any }>(`/education/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteEducation(id: string) {
    return this.request(`/education/${id}`, { method: "DELETE" });
  }

  // Experience
  async getExperience() {
    return this.request<{ data: any[] }>("/experience");
  }

  async createExperience(data: any) {
    return this.request<{ data: any }>("/experience", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateExperience(id: string, data: any) {
    return this.request<{ data: any }>(`/experience/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteExperience(id: string) {
    return this.request(`/experience/${id}`, { method: "DELETE" });
  }

  // Skills
  async getSkills() {
    return this.request<{ data: any[] }>("/skills");
  }

  async createSkill(data: any) {
    return this.request<{ data: any }>("/skills", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateSkill(id: string, data: any) {
    return this.request<{ data: any }>(`/skills/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteSkill(id: string) {
    return this.request(`/skills/${id}`, { method: "DELETE" });
  }

  // Projects
  async getProjects() {
    return this.request<{ data: any[] }>("/projects");
  }

  async getProject(id: string) {
    return this.request<{ data: any }>(`/projects/${id}`);
  }

  async createProject(data: any) {
    return this.request<{ data: any }>("/projects", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateProject(id: string, data: any) {
    return this.request<{ data: any }>(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteProject(id: string) {
    return this.request(`/projects/${id}`, { method: "DELETE" });
  }

  // Blogs
  async getBlogs() {
    return this.request<{ data: any[] }>("/blogs");
  }

  async getBlog(slug: string) {
    return this.request<{ data: any }>(`/blogs/${slug}`);
  }

  async createBlog(data: any) {
    return this.request<{ data: any }>("/blogs", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateBlog(slug: string, data: any) {
    return this.request<{ data: any }>(`/blogs/${slug}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteBlog(slug: string) {
    return this.request(`/blogs/${slug}`, { method: "DELETE" });
  }

  // Contact
  async getContactSettings() {
    return this.request<{ data: any }>("/contact/settings");
  }

  async updateContactSettings(data: any) {
    return this.request<{ data: any }>("/contact/settings", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async sendContactMessage(data: any) {
    return this.request<{
      success: any;
      data: any;
    }>("/contact/message", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getContactMessages() {
    return this.request<{ data: any[] }>("/contact/messages");
  }

  async updateMessageStatus(id: string, status: string) {
    return this.request<{ data: any }>(`/contact/messages/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
  }

  async deleteContactMessage(id: string) {
    return this.request(`/contact/messages/${id}`, { method: "DELETE" });
  }

  // File Upload
  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`${this.baseURL}/upload`, {
      method: "POST",
      headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    return await response.json();
  }
}

export const apiClient = new ApiClient();
