// import {useNavigate } from "react-router-dom";
// import { FaSignOutAlt } from "react-icons/fa";
// import DP from "../assets/DP.png";
// import { NavLink } from "react-router-dom";
// import { FaTachometerAlt, FaUsers, FaTags, FaNewspaper } from "react-icons/fa";

// export default function Sidebar() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     document.cookie = "token=; Max-Age=0"; // clear cookie if used
//     navigate("/login");
//   };

//   const navLinkClass = ({ isActive }) =>
//     `flex items-center gap-2 px-4 py-2 rounded-md transition ${
//       isActive
//         ? "bg-blue-700 text-white font-semibold"
//         : "text-gray-300 hover:bg-gray-800 hover:text-white"
//     }`;

//   return (
//     <aside className="bg-gray-900 text-white min-w-xl min-h-screen flex flex-col justify-between">
//       <div>
//         {/* Branding */}
//         {/* <div className="p-4 border-b border-gray-700 text-center">
//           <h1 className="text-xl font-bold">TRN NEWS Admin</h1>
//         </div> */}

//         <div className="p-4 flex flex-col items-center gap-2 border-b border-gray-700">
//           <img src={DP} alt="Logo" className="h-12 w-12 rounded-full border" />
//           <h1 className="text-lg font-bold">TRN NEWS</h1>
//           <p className="text-sm text-gray-400">Admin Panel</p>
//         </div>

//         {/* Menu */}
//         {/* <nav className="flex flex-col gap-2 mt-4 px-4 py-2">
//           <Link to="/admin/dashboard" className="hover:text-blue-400">Dashboard</Link>
//           <Link to="/admin/users" className="hover:text-blue-400">Manage Users</Link>
//           <Link to="/admin/categories" className="hover:text-blue-400">Manage Categories</Link>
//           <Link to="/admin/articles" className="hover:text-blue-400">Manage Articles</Link>
//         </nav> */}
//         <nav className="flex flex-col gap-1 mt-4 px-4 text-sm">
//           <NavLink to="/admin/dashboard" className={navLinkClass}>
//             <FaTachometerAlt /> Dashboard
//           </NavLink>

//           {user?.role === "admin" && (
//             <NavLink to="/admin/users" className={navLinkClass}>
//               <FaUsers /> Manage Users
//             </NavLink>
//           )}
//           <NavLink to="/admin/categories" className={navLinkClass}>
//             <FaTags /> Manage Categories
//           </NavLink>
//           <NavLink to="/admin/articles" className={navLinkClass}>
//             <FaNewspaper /> Manage Articles
//           </NavLink>
//         </nav>
//       </div>

//       {/* Footer with logout */}
//       <div className="p-4 border-t border-gray-700">
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-2 hover:text-red-400 transition"
//         >
//           <FaSignOutAlt />
//           <span>Logout</span>
//         </button>
//       </div>
//     </aside>
//   );
// }
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaTachometerAlt, FaUsers, FaTags, FaNewspaper } from "react-icons/fa";
import DP from "../assets/DP.png";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; 

export default function Sidebar() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie = "token=; Max-Age=0";
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md font-medium transition duration-200 ${
      isActive
        ? "bg-blue-700 text-white"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen flex flex-col justify-between shadow-lg">
      <div>
        {/* Branding */}
        <div className="p-6 flex flex-col items-center gap-2 border-b border-gray-800">
          <img src={DP} alt="Logo" className="h-14 w-14 rounded-full border-2 border-blue-500 shadow" />
          <h1 className="text-xl font-bold tracking-wide">TRN NEWS</h1>
          <p className="text-sm text-gray-400">Admin Panel</p>
        </div>

        {/* Navigation */}
        <div className="mt-4 px-4">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Navigation</p>
          <nav className="flex flex-col gap-1 text-sm">
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
      </div>

      {/* Logout Footer */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-start gap-3 px-3 py-2 text-red-400 hover:bg-red-800/20 hover:text-red-300 rounded-md transition"
        >
          <FaSignOutAlt className="text-base" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
