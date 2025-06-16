// // hooks/useAuth.js
// import { useState, useEffect, createContext, useContext } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Replace this with your actual auth logic (e.g., JWT from localStorage)
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
// import { createContext, useContext, useEffect, useState } from 'react';
// import api from '../services/api'; // axios with withCredentials: true

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // On mount, verify session from server
//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         const res = await api.get('/auth/me'); // expects { user }
//         setUser(res.data);
//       } catch (err) {
//         if (err.response?.status === 401) {
//           alert('Session expired. Please log in again.');
//         }
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     checkSession();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser, loading }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
// src/hooks/useAuth.js
import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../services/api'; // axios withCredentials: true

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const wasLoggedIn = useRef(false);
  const location = useLocation();

  const protectedPaths = ['/admin', '/dashboard'];
  const isProtectedRoute = protectedPaths.some(path =>
    location.pathname.startsWith(path)
  );

  useEffect(() => {
    // If it's a public route or we already have a user (e.g. after login), skip check
    if (!isProtectedRoute || user) {
      setLoading(false);
      return;
    }

    const checkSession = async () => {
      try {
        const res = await api.get('/auth/me'); // expects { user }
        setUser(res.data);
        wasLoggedIn.current = true;
      } catch (err) {
        setUser(null);
        if (wasLoggedIn.current) {
          alert('Session expired. Please log in again.');
          wasLoggedIn.current = false;
        }
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [location.pathname, user]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
