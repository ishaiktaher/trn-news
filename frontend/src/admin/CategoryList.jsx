// import React, { useEffect, useState } from 'react';
// import api from '../services/api';
// import Sidebar from '../components/SideBar';
// import { Link } from 'react-router-dom';

// const CategoryList = () => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     api.get('/categories').then(res => setCategories(res.data));
//   }, []);

//   return (
//     <div className="flex">
//       <Sidebar />
//       <main className="p-4 w-full">
//         <h2 className="text-xl font-bold mb-4">Categories</h2>
//         <Link to="/admin/categories/new" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">Add New</Link>
//         <ul>
//           {categories.map(cat => (
//             <li key={cat._id} className="border p-2 mb-2 flex justify-between">
//               {cat.name}
//               <div>
//                 <Link to={`/admin/categories/edit/${cat._id}`} className="mr-2 text-blue-500">Edit</Link>
//                 {/* Delete button to be added */}
//               </div>
//             </li>
//           ))}
//         </ul>
//       </main>
//     </div>
//   );
// };

// export default CategoryList;
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Sidebar from '../components/SideBar';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to load categories", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await api.delete(`/categories/${id}`);
        fetchCategories();
      } catch (err) {
        alert("Error deleting category");
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="p-6 w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Categories</h2>
          <Link
            to="/admin/categories/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            + Add New
          </Link>
        </div>

        {loading ? (
          <p>Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="text-gray-500">No categories found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded">
              <thead>
                <tr className="bg-gray-100 text-left text-sm text-gray-600 uppercase tracking-wider">
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat._id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4 font-medium text-gray-800">{cat.name}</td>
                    <td className="py-2 px-4 text-right space-x-2">
                      <Link
                        to={`/admin/categories/edit/${cat._id}`}
                        className="text-sm bg-green-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(cat._id)}
                        className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
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
};

export default CategoryList;
