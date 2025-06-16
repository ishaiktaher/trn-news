// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
// import api from '../services/api';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { setUser } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post('/auth/login', { email, password });

//       // localStorage.setItem('token', res.data.token);
//       localStorage.setItem('user', JSON.stringify(res.data.user));

//       setUser(res.data.user);

//       navigate('/admin/dashboard');
//     } catch (err) {
//       alert('Login failed: ' + (err.response?.data?.message || err.message));
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-20 p-4 border rounded">
//       <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           required
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           required
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setErrorMsg('');
  //   try {
  //     const res = await api.post('/auth/login', { email, password });
  //     localStorage.setItem('user', JSON.stringify(res.data.user));
  //     setUser(res.data.user);
  //     navigate('/admin/dashboard');
  //   } catch (err) {
  //     setErrorMsg(err.response?.data?.message || 'Login failed. Please try again.');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
  
      // ❌ Don’t store manually — cookies are already set
      // localStorage.setItem('token', res.data.token);
  
      setUser(res.data.user); // ✅ set it in memory
  
      navigate('/admin/dashboard');
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.message || err.message));
    }
  };
  

  return (
    <div className="min-h-lh flex  justify-center bg-gradient-to-br from-blue-600 to-indigo-700 px-4 pt-8 pb-10">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl pb-20">
        {/* Logo */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-indigo-700">Admin Portal</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to manage TRN News</p>
        </div>

        {/* Error */}
        {errorMsg && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
