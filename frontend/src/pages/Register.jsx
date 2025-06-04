import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', form);
      console.log('User registered:', res.data);
      alert('Registration successful!');
      navigate('/login'); // ✅ Redirect to login
    } catch (err) {
      alert(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4">Register Yourself</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="mb-2 p-2 w-full border"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="mb-2 p-2 w-full border"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="mb-2 p-2 w-full border"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
