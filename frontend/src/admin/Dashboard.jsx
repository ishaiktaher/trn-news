import React, { useEffect, useState } from 'react';
import Sidebar from '../components/SideBar';
import api from '../services/api';
import dayjs from 'dayjs';

const Dashboard = () => {
  const [stats, setStats] = useState({
    articles: 0,
    drafts: 0,
    categories: 0,
    users: 0,
  });
  const [recentArticles, setRecentArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articleRes, categoryRes, userRes] = await Promise.all([
          api.get('/articles'),
          api.get('/categories'),
          api.get('/admin/users'),
        ]);

        const allArticles = articleRes.data;
        const draftCount = allArticles.filter(a => a.status === 'draft').length;

        setStats({
          articles: allArticles.length,
          drafts: draftCount,
          categories: categoryRes.data.length,
          users: userRes.data.length,
        });

        setRecentArticles(allArticles.slice(0, 5));
      } catch (err) {
        console.error('Dashboard fetch failed:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="p-6 w-full bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Articles" count={stats.articles} />
          <StatCard label="Drafts" count={stats.drafts} />
          <StatCard label="Categories" count={stats.categories} />
          <StatCard label="Users" count={stats.users} />
        </div>

        {/* Recent Articles */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Recent Articles</h2>
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3">Title</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentArticles.map(article => (
                  <tr key={article._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{article.title}</td>
                    <td className="p-3 capitalize">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        article.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {article.status}
                      </span>
                    </td>
                    <td className="p-3">{article.category?.name || '—'}</td>
                    <td className="p-3">{dayjs(article.createdAt).format('MMM D, YYYY')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

const StatCard = ({ label, count }) => (
  <div className="bg-white p-4 rounded shadow text-center">
    <h3 className="text-gray-600 text-sm">{label}</h3>
    <p className="text-2xl font-bold text-blue-700">{count}</p>
  </div>
);

export default Dashboard;
