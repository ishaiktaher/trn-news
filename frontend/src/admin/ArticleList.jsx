import React, { useEffect, useState } from 'react';
import api from '../services/api.js';
import Sidebar from '../components/SideBar';
import { Link } from 'react-router-dom';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    api.get('/articles').then(res => setArticles(res.data));
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="p-4 w-full">
        <h2 className="text-xl font-bold mb-4">Articles</h2>
        <Link to="/admin/articles/new" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">Add Article</Link>
        <ul>
          {articles.map(article => (
            <li key={article._id} className="border p-2 mb-2">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">{article.title}</h3>
                  <p className="text-sm text-gray-500">{article.category?.name}</p>
                </div>
                <div>
                  <Link to={`/admin/articles/edit/${article.slug}`} className="text-blue-600 mr-2">Edit</Link>
                  {/* Delete logic to be added */}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default ArticleList;
