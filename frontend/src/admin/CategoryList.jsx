import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import Sidebar from '../components/SideBar';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('/categories').then(res => setCategories(res.data));
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="p-4 w-full">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <Link to="/admin/categories/new" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">Add New</Link>
        <ul>
          {categories.map(cat => (
            <li key={cat._id} className="border p-2 mb-2 flex justify-between">
              {cat.name}
              <div>
                <Link to={`/admin/categories/edit/${cat._id}`} className="mr-2 text-blue-500">Edit</Link>
                {/* Delete button to be added */}
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default CategoryList;
