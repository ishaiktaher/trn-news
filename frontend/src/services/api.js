import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true, // ✅ required for sending cookies cross-origin
});

// Helper to get token from cookie
// function getTokenFromCookie() {
//   const match = document.cookie.match(/(^| )token=([^;]+)/);
//   return match ? match[2] : null;
// }

// Attach token from cookie to Authorization header
// api.interceptors.request.use((config) => {
//   const token = getTokenFromCookie(); // ✅ get token from cookie, not localStorage
//   console.log("token", token)
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;
