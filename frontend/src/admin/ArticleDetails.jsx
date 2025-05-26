import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    api.get(`/articles/${id}`).then((res) => {
      setArticle(res.data);
    });
  }, [id]);

  if (!article) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-4">Category: {article.category?.name}</p>
      {article.image && (
        <img
          src={`http://localhost:6000${article.image}`}
          alt={article.title}
          className="w-full h-auto mb-4 rounded"
        />
      )}

      {/* 🔥 Render rich text HTML content */}
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: article.body }}
      />
    </div>
  );
};

export default ArticleDetail;
