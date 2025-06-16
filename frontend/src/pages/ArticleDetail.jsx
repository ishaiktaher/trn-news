import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import DOMPurify from 'dompurify';
import AdUnit from '../components/AdUnit';
import placeholderImage from "../assets/news-placeholder.jpg";
import dayjs from 'dayjs';
const BASE_URL = process.env.REACT_APP_API_URL;

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const contentRef = useRef();

  useEffect(() => {
    if (!article?.content || !contentRef.current) return;
  
    const container = contentRef.current;
    const oembeds = container.querySelectorAll("oembed[url]");
  
    oembeds.forEach((node) => {
      let url = node.getAttribute("url") || node.getAttribute("data-oembed-url");
  
      // Handle Twitter/X
      if (url.includes("x.com")) {
        url = url.replace("x.com", "twitter.com");
      }
      if (url.includes("twitter.com")) {
        const blockquote = document.createElement("blockquote");
        blockquote.className = "twitter-tweet";
  
        const a = document.createElement("a");
        a.href = url;
        a.textContent = url;
  
        blockquote.appendChild(a);
        node.parentNode.replaceWith(blockquote);
        return;
      }
  
      // Handle Instagram
      if (url.includes("instagram.com")) {
        const blockquote = document.createElement("blockquote");
        blockquote.className = "instagram-media";
        blockquote.setAttribute("data-instgrm-permalink", url);
        blockquote.setAttribute("data-instgrm-version", "14");
  
        // Optional fallback link
        const a = document.createElement("a");
        a.href = url;
        a.textContent = url;
        blockquote.appendChild(a);
  
        node.parentNode.replaceWith(blockquote);
      }
    });
  
    // Load or re-run Twitter widget
    if (window.twttr?.widgets) {
      window.twttr.widgets.load();
    } else {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }
  
    // Load or re-run Instagram embed
    if (window.instgrm?.Embeds) {
      window.instgrm.Embeds.process();
    } else {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [article]);
  

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
        <span>By {article.author?.name || "Unknown Author"}</span>
        <span className="mx-2">•</span>
        <span>{new Date(article.createdAt).toLocaleDateString()}</span>
      </div>

      {article.featuredImage && (
        <img
          src={
            article.featuredImage
              ? `${BASE_URL}/uploads/${article.featuredImage}`
              : placeholderImage
          }
          alt={article.title}
          className="w-full h-80 object-cover rounded-lg mb-6"
        />
      )}
      {/* google ad */}
      <AdUnit slot="0987654321" />
      <div
        ref={contentRef}
        className="prose max-w-none wrap-anywhere overflow-wrap-break-word"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      <p className="text-sm text-gray-500">
        {article.viewsCount || 0} views • Published{" "}
        {dayjs(article.createdAt).format("MMM D, YYYY")}
      </p>
    </div>
  );
};

export default ArticleDetail;
