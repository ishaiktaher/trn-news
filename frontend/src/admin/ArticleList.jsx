// import React, { useEffect, useState } from 'react';
// import api from '../services/api.js';
// import Sidebar from '../components/SideBar';
// import { Link } from 'react-router-dom';

// const ArticleList = () => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   useEffect(() => {
//     api.get('/articles').then(res => setArticles(res.data));
//   }, []);

//   return (
//     <div className="flex">
//       <Sidebar />
//       <main className="p-4 w-full">
//         <h2 className="text-xl font-bold mb-4">Articles</h2>
//         <Link to="/admin/articles/new" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">Add Article</Link>
//         <ul>
//           {articles.map(article => (
//             <li key={article._id} className="border p-2 mb-2">
//               <div className="flex justify-between">
//                 <div>
//                   <h3 className="font-semibold">{article.title}</h3>
//                   <p className="text-sm text-gray-500">{article.category?.name}</p>
//                 </div>
//                 <div>
//                   <Link to={`/admin/articles/edit/${article.slug}`} className="text-blue-600 mr-2">Edit</Link>
//                   {/* Delete logic to be added */}
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </main>
//     </div>
//   );
// };

// export default ArticleList;
import React, { useEffect, useState } from 'react';
import api from '../services/api.js';
import Sidebar from '../components/SideBar';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const ITEMS_PER_PAGE = 10;

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    api.get('/articles')
      .then(res => setArticles(res.data))
      .catch(err => console.error('Failed to load articles:', err))
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const paginated = articles.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await api.delete(`/articles/${id}`);
        setArticles(prev => prev.filter(a => a._id !== id));
      } catch (err) {
        alert('Failed to delete article');
        console.error(err);
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="p-6 w-full bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Articles</h2>
          <Link
            to="/admin/articles/new"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add Article
          </Link>
        </div>

        {loading ? (
          <p>Loading articles...</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-left text-xs uppercase text-gray-600">
                <tr>
                  <th className="p-3">Title</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Author</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Views</th>
                  <th className="p-3">Created</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((article) => (
                  <tr key={article._id} className="border-t hover:bg-gray-50">
                    <td className="p-3 font-medium">{article.title}</td>
                    <td className="p-3">{article.category?.name || "-"}</td>
                    <td className="p-3">{article.author?.name || 'Unknown'}</td>
                    <td className="p-3 capitalize">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          article.status === "published"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {article.status}
                      </span>
                    </td>
                    <td className="p-3">{article.viewsCount || 0}</td>
                    <td className="p-3">
                      {dayjs(article.createdAt).format("MMM D, YYYY")}
                    </td>
                    <td className="p-3 text-right space-x-2 flex justify-end">
                      <Link
                        to={`/admin/articles/edit/${article.slug}`}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-xs hover:bg-blue-200 transition"
                      >
                        <FiEdit2 className="mr-1" /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(article._id)}
                        className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-md text-xs hover:bg-red-200 transition"
                      >
                        <FiTrash2 className="mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center p-4 border-t">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ArticleList;
