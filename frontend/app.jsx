import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./src/admin/Dashboard";
import CategoryList from "./src/admin/CategoryList";
import AdminRoute from "./src/admin/AdminRoute";
import CategoryForm from "./src/admin/CategoryForm";
import ArticleList from "./src/admin/ArticleList";
import ArticleForm from "./src/admin/ArticleForm";
import Login from "./src/pages/Login";
import Home from "./src/pages/Home";
import NavBar from "./src/components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

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
      
    </>
  );
}

export default App;
