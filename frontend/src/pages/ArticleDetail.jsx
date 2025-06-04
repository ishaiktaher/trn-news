import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import DOMPurify from 'dompurify';
import AdUnit from '../components/AdUnit';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await api.get(`/articles/${id}`);
        setArticle(res.data);
      } catch (err) {
        setError('Failed to load article');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!article) return <div className="text-center py-8">Article not found</div>;

  const sanitizedContent = DOMPurify.sanitize(article.content, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['src', 'allow', 'allowfullscreen', 'frameborder', 'scrolling'],
    ALLOWED_URI_REGEXP: /.*/
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <div className="flex items-center text-gray-600 mb-6">
        <span>By {article.author?.name || 'Unknown Author'}</span>
        <span className="mx-2">•</span>
        <span>{new Date(article.createdAt).toLocaleDateString()}</span>
      </div>
      
      {article.image && (
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}
    {/* google ad */}
      <AdUnit slot="0987654321" />
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
};

export default ArticleDetail;
