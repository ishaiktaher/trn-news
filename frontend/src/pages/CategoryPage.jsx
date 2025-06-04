// src/pages/CategoryPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { Link } from "react-router-dom";
import ArticleList from "../components/ArticleList";

const CategoryPage = () => {
  const { slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [categoryName, setCategoryName] = useState(slug);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryArticles = async () => {
      try {
        const res = await api.get(`/articles?category=${slug}`);
        setArticles(res.data);
        if (res.data[0]?.category?.name) {
          setCategoryName(res.data[0].category.name);
        }
      } catch (err) {
        console.error("Failed to fetch articles for category:", slug);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryArticles();
  }, [slug]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      {loading ? (
        <p>Loading articles...</p>
      ) : articles.length === 0 ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Category: {categoryName}</h1>
          <p>No articles found in this category.</p>
        </>
      ) : (
        <ArticleList articles={articles} title={`Category: ${categoryName}`} />
      )}
    </div>
  );
};

export default CategoryPage;
