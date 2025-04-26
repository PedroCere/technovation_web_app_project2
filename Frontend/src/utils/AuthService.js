import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api/auth";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const login = async (credentials) => {
  const response = await axiosInstance.post("/login", credentials);
  if (response.data && response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

const register = async (userData) => {
  const response = await axiosInstance.post("/register", userData);
  return response.data;
};

const logout = () => {
  localStorage.removeItem("token");
};

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return Boolean(token);
};

const AuthService = {
  login,
  register,
  logout,
  isAuthenticated,
};

export default AuthService;

