import {Routes, Route } from "react-router-dom";
import Dashboard from "./admin/Dashboard";
import CategoryList from "./admin/CategoryList";
import AdminRoute from "./admin/AdminRoute";
import CategoryForm from "./admin/CategoryForm";
import ArticleList from "./admin/ArticleList";
import ArticleForm from "./admin/ArticleForm";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Footer from "./components/Footer";
import ArticleDetail from './pages/ArticleDetail'; 

export default function App() {
  return (
    <>
      <NavBar />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          
          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Dashboard />
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
        </Routes>
      <Footer />
    </>
  );
}

