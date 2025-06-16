// components/ArticleList.jsx
import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import placeholderImage from "../assets/news-placeholder.jpg";
const API_URL = process.env.REACT_APP_API_URL;

const getReadTime = (content) => {
  if (!content) return "1 min read";
  const words = content.trim().split(/\s+/).length;
  return `${Math.ceil(words / 200)} min read`;
};

const ArticleList = ({ articles = [], title = "Articles" }) => {
  if (!articles.length) {
    return (
      <div className="text-gray-600 text-center p-6">
        No articles available.
      </div>
    );
  }

  return (
    <section className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article._id}
            to={`/article/${article.slug}`}
            className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col"
          >
            <img
              src={
                article.featuredImage
                  ? `${API_URL}/uploads/${article.featuredImage}`
                  : placeholderImage
              }
              alt={article.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h4 className="font-semibold mb-2 text-gray-900">{article.title}</h4>
              <div
                className="text-gray-600 text-sm line-clamp-3"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
              <div className="mt-auto pt-3 text-sm text-gray-500 border-t flex justify-between">
                <span>{getReadTime(article.content)}</span>
                <span>{article.author?.name || "TRN Staff"}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ArticleList;
