import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const authService = {
  // Login
  async login(email, password) {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  // Register Employee
  async registerEmployee(userData) {
    const response = await api.post("/auth/register/employee", userData);
    return response.data;
  },

  // Register Company
  async registerCompany(companyData) {
    const response = await api.post("/auth/register/company", companyData);
    return response.data;
  },

  // Get current user
  async getCurrentUser(token) {
    const response = await api.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // Logout
  async logout(token) {
    const response = await api.post(
      "/auth/logout",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },

  // Update user profile
  async updateProfile(token, profileData) {
    const response = await api.put("/users/profile", profileData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // Update company profile
  async updateCompanyProfile(token, profileData) {
    const response = await api.put("/companies/profile", profileData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // Update user skills
  async updateSkills(token, skills) {
    const response = await api.put(
      "/users/skills",
      { skills },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },

  // Update user languages
  async updateLanguages(token, languages) {
    const response = await api.put(
      "/users/languages",
      { languages },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },

  // Update company specialties
  async updateSpecialties(token, specialties) {
    const response = await api.put(
      "/companies/specialties",
      { specialties },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },

  // Update company benefits
  async updateBenefits(token, benefits) {
    const response = await api.put(
      "/companies/benefits",
      { benefits },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },

  // Apply to job
  async applyToJob(token, jobId, applicationData) {
    const response = await api.post(`/users/apply/${jobId}`, applicationData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // Get user applications
  async getUserApplications(token) {
    const response = await api.get("/users/applications", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // Save/unsave job
  async saveJob(token, jobId) {
    const response = await api.post(
      `/users/save-job/${jobId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },

  // Get saved jobs
  async getSavedJobs(token) {
    const response = await api.get("/users/saved-jobs", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // Create job (company only)
  async createJob(token, jobData) {
    const response = await api.post("/companies/jobs", jobData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // Get company jobs
  async getCompanyJobs(token, filters = {}) {
    const response = await api.get("/companies/jobs", {
      headers: { Authorization: `Bearer ${token}` },
      params: filters,
    });
    return response.data;
  },

  // Update job (company only)
  async updateJob(token, jobId, jobData) {
    const response = await api.put(`/companies/jobs/${jobId}`, jobData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // Delete job (company only)
  async deleteJob(token, jobId) {
    const response = await api.delete(`/companies/jobs/${jobId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // Get job applications (company only)
  async getJobApplications(token, jobId, filters = {}) {
    const response = await api.get(`/companies/jobs/${jobId}/applications`, {
      headers: { Authorization: `Bearer ${token}` },
      params: filters,
    });
    return response.data;
  },

  // Update application status (company only)
  async updateApplicationStatus(token, jobId, applicationId, status) {
    const response = await api.put(
      `/companies/jobs/${jobId}/applications/${applicationId}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },

  // Update avatar
  async updateAvatar(token, avatarUrl) {
    const response = await api.put(
      "/users/avatar",
      { avatar: avatarUrl },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },

  // Update company logo
  async updateLogo(token, logoUrl) {
    const response = await api.put(
      "/companies/logo",
      { logo: logoUrl },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },
};

export default authService;
