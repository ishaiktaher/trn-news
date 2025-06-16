import { Routes, Route } from "react-router-dom";
import Dashboard from "./admin/Dashboard";
import CategoryList from "./admin/CategoryList";
import AdminRoute from "./admin/AdminRoute";
import CategoryForm from "./admin/CategoryForm";
import ArticleList from "./admin/ArticleList";
import ArticleForm from "./admin/ArticleForm";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/AboutUs";
import NavBar from "./components/NavBar";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Footer from "./components/Footer";
import ArticleDetail from "./pages/ArticleDetail";
import AdminUserPage from "./admin/AdminUserPage";
import MainLayout from "./components/layouts/MainLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import Contact from './pages/Contact';
import Advertise from './pages/Advertise';
import PrivacyPolicy from './pages/Privacy';

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/news" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
          <Route path="/advertise" element={<Advertise />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />

          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/category/:slug" element={<CategoryPage />} />

          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />

        </Route>

        {/* Admin-only layout (no navbar/footer) */}
        <Route element={<AdminLayout />}>
          {/* Admin routes */}
          {/* <Route
            path="/admin"
            element={
                <Login />
            }
          /> */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminUserPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <AdminRoute>
                <CategoryList />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/categories/new"
            element={
              <AdminRoute>
                <CategoryForm />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/categories/edit/:id"
            element={
              <AdminRoute>
                <CategoryForm />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/articles"
            element={
              <AdminRoute>
                <ArticleList />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/articles/new"
            element={
              <AdminRoute>
                <ArticleForm />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/articles/edit/:id"
            element={
              <AdminRoute>
                <ArticleForm />
              </AdminRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}
