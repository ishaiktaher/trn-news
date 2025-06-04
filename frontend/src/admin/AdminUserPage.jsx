import { useEffect, useState } from 'react';
import api from '../services/api';
import Sidebar from '../components/SideBar';

export default function AdminUserPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/users', form);
      setForm({ name: '', email: '', password: '', role: 'user' });
      fetchUsers();
      alert('User created!');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error creating user');
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await api.patch(`/admin/users/${id}/role`, { role: newRole });
      fetchUsers();
    } catch (err) {
      alert('Failed to update role');
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 overflow-x-auto">
        <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

        {/* Create User Form */}
        <form onSubmit={handleCreate} className="bg-white p-4 rounded-lg shadow mb-6 w-full max-w-3xl">
          <h2 className="text-lg font-semibold mb-4">Create New User</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="border px-3 py-2 rounded w-full"
            />
            <select
              name="role"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="border px-3 py-2 rounded w-full"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="author">Author</option>
              <option value="editor">Editor</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create User
          </button>
        </form>

        {/* User Table */}
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <div className="overflow-auto">
            <table className="min-w-full bg-white shadow rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-2">Name</th>
                  <th className="text-left px-4 py-2">Email</th>
                  <th className="text-left px-4 py-2">Role</th>
                  <th className="text-left px-4 py-2">Change Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t">
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2 capitalize">{user.role}</td>
                    <td className="px-4 py-2">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="border px-2 py-1 rounded"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="author">Author</option>
                        <option value="editor">Editor</option>

                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
