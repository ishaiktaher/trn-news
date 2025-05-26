import { Link } from 'react-router-dom';

const Sidebar = () => (
  <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
    <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
    <ul className="space-y-2">
      <li><Link to="/admin/categories" className="hover:underline">Manage Categories</Link></li>
      <li><Link to="/admin/articles" className="hover:underline">Manage Articles</Link></li>
    </ul>
  </aside>
);

export default Sidebar;
