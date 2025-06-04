import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import Sidebar from '../components/SideBar';

const CategoryForm = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      api.get(`/categories/${id}`)
        .then(res => setName(res.data.name))
        .catch(err => console.error(err));
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await api.put(`/categories/${id}`, { name });
      } else {
        await api.post('/categories', { name });
      }
      navigate('/admin/categories');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="p-4 w-full">
        <h2 className="text-xl font-bold mb-4">{isEditMode ? 'Edit' : 'Add'} Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            {isEditMode ? 'Update' : 'Create'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default CategoryForm;
