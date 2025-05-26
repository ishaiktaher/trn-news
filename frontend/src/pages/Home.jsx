import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/articles')
      .then(res => setArticles(res.data))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, []);

  // Estimate read time (avg 200 words/minute)
  const getReadTime = content => {
    if (!content) return '1 min read';
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-600">Loading latest news...</div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="p-8 text-center text-gray-600">No articles available.</div>
    );
  }

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Featured Article */}
      <section className="mb-10">
        <h1 className="text-4xl font-bold mb-4">Top Story</h1>
        <Link to={`/article/${featured._id}`} className="block group">
          {featured.image && (
            <img
              src={`http://localhost:6000${featured.image}`}
              alt={featured.title}
              className="w-full max-h-96 object-cover rounded-lg mb-4 group-hover:opacity-90 transition"
            />
          )}
          <h2 className="text-3xl font-extrabold mb-2">{featured.title}</h2>
          <p className="text-gray-700 mb-2 line-clamp-3">{featured.content}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>{featured.category?.name && (
              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{featured.category.name}</span>
            )}</span>
            <span>{dayjs(featured.createdAt).format('MMM D, YYYY')}</span>
            <span>{getReadTime(featured.content)}</span>
          </div>
        </Link>
      </section>

      {/* Other Articles Grid */}
      <section>
        <h2 className="text-2xl font-bold mb-6">More News</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map(article => (
            <Link
              to={`/article/${article._id}`}
              key={article._id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
            >
              {article.image && (
                <img
                  src={`http://localhost:6000${article.image}`}
                  alt={article.title}
                  className="h-48 w-full object-cover"
                />
              )}
              <div className="p-4 flex flex-col flex-grow">
                <div className="mb-2 flex justify-between items-center">
                  {article.category?.name && (
                    <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-1 rounded">
                      {article.category.name}
                    </span>
                  )}
                  <span className="text-gray-400 text-xs">
                    {dayjs(article.createdAt).format('MMM D')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold flex-grow">{article.title}</h3>
                <p className="text-gray-600 mt-2 line-clamp-3">
                  {article.content?.substring(0, 150)}{article.content?.length > 150 ? '...' : ''}
                </p>
                <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
                  <span>{getReadTime(article.content)}</span>
                  <span className="italic">{article.author?.name || 'Unknown'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
