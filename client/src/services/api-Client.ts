import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios request interceptor for adding the Authorization header

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      // const decoded = token ? (jwtDecode(token) as MyJwtPayload) : null;
      // config.headers['id'] = decoded?.id;
      // config.headers['role'] = decoded?.role;

    }
    return config;
  },
  (error) => {
    
    return Promise.reject(error);
  }
);


// Axios instance for uploading images and files (multipart form data)
const fileUploadAxiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Use the same request interceptor for Authorization header in the file upload instance
fileUploadAxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

 export const fileUploadApiClient = fileUploadAxiosInstance;


const apiClient = axiosInstance;
export default apiClient;
