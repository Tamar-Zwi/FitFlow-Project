import axios from "axios";

const API_BASE_URL = "https://localhost:7065/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("fitflow_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API - שים לב לשינוי ב-login!
export const authAPI = {
  login: (data: any) => api.post("/Auth", data), // C# מצפה ל-Email וסיסמה
};

// Users API - שיניתי מ-Users ל-User שיתאים ל-C# שלך
export const usersAPI = {
  getAll: () => api.get("/Users"),
  getById: (id: number) => api.get(`/Users/byId/${id}`),
  register: (data: any) => api.post("/Users", data),
  update: (id: number, data: any) => api.put(`/Users/${id}`, data),
  delete: (id: number) => api.delete(`/Users/${id}`),
};

// Lessons API - שיניתי מ-Lessons ל-Lesson
export const lessonsAPI = {
  getAll: () => api.get("/Lessons"),
  getById: (id: number) => api.get(`/Lessons/id/${id}`),
  create: (data: any) => api.post("/Lessons", data),
  delete: (id: number) => api.delete(`/Lessons/${id}`),
};

// Register for Lesson API
export const registerForLessonAPI = {
  getAll: () => api.get("/RegisterForLesson"),
  register: (data: any) => api.post("/RegisterForLesson", data),
};

export default api;