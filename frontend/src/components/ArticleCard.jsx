import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const ArticleCard = ({ article, getReadTime }) => {
  return (
    <Link
      to={`/article/${article.slug}`}
      className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition flex flex-col"
    >
      {article.image && (
        <img
          src={`http://localhost:6000${article.image}`}
          alt={article.title}
          className="h-48 w-full object-cover"
        />
      )}
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2 flex justify-between items-center">
          {article.category?.name && (
            <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-1 rounded">
              {article.category.name}
            </span>
          )}
          <span className="text-gray-400 text-xs">
            {dayjs(article.createdAt).format('MMM D')}
          </span>
        </div>
        <h3 className="text-lg font-semibold flex-grow line-clamp-2">{article.title}</h3>
        <p className="text-gray-600 mt-2 text-sm line-clamp-3">
          {article.content?.substring(0, 150)}{article.content?.length > 150 ? '...' : ''}
        </p>
        <div className="mt-4 text-xs text-gray-500 flex justify-between items-center">
          <span>{getReadTime(article.content)}</span>
          <span className="italic">{article.author?.name || 'Unknown'}</span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
