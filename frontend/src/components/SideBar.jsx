import {useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import DP from "../assets/DP.png";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaTags, FaNewspaper } from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie = "token=; Max-Age=0"; // clear cookie if used
    navigate("/admin");
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-md transition ${
      isActive
        ? "bg-blue-700 text-white font-semibold"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <aside className="bg-gray-900 text-white w-70 min-h-screen flex flex-col justify-between">
      <div>
        {/* Branding */}
        {/* <div className="p-4 border-b border-gray-700 text-center">
          <h1 className="text-xl font-bold">TRN NEWS Admin</h1>
        </div> */}

        <div className="p-4 flex flex-col items-center gap-2 border-b border-gray-700">
          <img src={DP} alt="Logo" className="h-12 w-12 rounded-full border" />
          <h1 className="text-lg font-bold">TRN NEWS</h1>
          <p className="text-sm text-gray-400">Admin Panel</p>
        </div>

        {/* Menu */}
        {/* <nav className="flex flex-col gap-2 mt-4 px-4 py-2">
          <Link to="/admin/dashboard" className="hover:text-blue-400">Dashboard</Link>
          <Link to="/admin/users" className="hover:text-blue-400">Manage Users</Link>
          <Link to="/admin/categories" className="hover:text-blue-400">Manage Categories</Link>
          <Link to="/admin/articles" className="hover:text-blue-400">Manage Articles</Link>
        </nav> */}
        <nav className="flex flex-col gap-1 mt-4 px-4 text-sm">
          <NavLink to="/admin/dashboard" className={navLinkClass}>
            <FaTachometerAlt /> Dashboard
          </NavLink>

          {user?.role === "admin" && (
            <NavLink to="/admin/users" className={navLinkClass}>
              <FaUsers /> Manage Users
            </NavLink>
          )}
          <NavLink to="/admin/categories" className={navLinkClass}>
            <FaTags /> Manage Categories
          </NavLink>
          <NavLink to="/admin/articles" className={navLinkClass}>
            <FaNewspaper /> Manage Articles
          </NavLink>
        </nav>
      </div>

      {/* Footer with logout */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 hover:text-red-400 transition"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
