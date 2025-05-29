import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import api from "../services/api";
import placeholderImage from "../assets/news-placeholder.jpg";
import globalLeaders from "../assets/global-leaders.avif";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Memoized fetch function
  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/articles");
      setArticles(res.data);
    } catch (err) {
      setError("Failed to load articles. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const getReadTime = (content) => {
    if (!content) return "1 min read";
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  const isTrending = (article) => article.views && article.views > 1000;

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featured = filteredArticles[0];
  const rest = filteredArticles.slice(1);

  if (loading) {
    return (
      <div className="min-h-screen p-8 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600">Loading latest news...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8 flex flex-col items-center justify-center">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg max-w-md text-center">
          <p className="font-medium">{error}</p>
          <button
            onClick={fetchArticles}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="min-h-screen p-8 flex flex-col items-center justify-center">
        <p className="text-gray-600">No articles available.</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto min-h-screen">
      {/* Live News Ticker */}
      <div className="bg-gray-100 p-3 mb-6 flex items-center overflow-hidden rounded-lg">
        <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold mr-3 rounded z-10">
          LIVE
        </span>
        <div className="whitespace-nowrap animate-marquee">
          Breaking: New climate agreement reached • Market updates: Stocks rise
          after Fed announcement • Sports: Team advances to finals
        </div>
      </div>
      {/* Featured Article */}
      {/* {featured && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
            Top Story
          </h2>
          <Link
            to={`/article/${featured.slug}`}
            className="block group transition duration-300 hover:shadow-lg"
          >
            <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-xl overflow-hidden shadow-md">
              <div className="lg:w-2/3">
                <img
                  src={
                    featured.image
                      ? `http://localhost:6000${featured.image}`
                      : placeholderImage
                  }
                  alt={featured.title}
                  className="w-full h-64 lg:h-96 object-cover"
                  loading="lazy"
                />
              </div>
              <div className="lg:w-1/3 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    {featured.category?.name && (
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {featured.category.name}
                      </span>
                    )}
                    {isTrending(featured) && (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                        🔥 Trending
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-extrabold mb-3 text-gray-900 group-hover:text-blue-600 transition">
                    {featured.title}
                  </h2>
                  <p className="text-gray-700 mb-4 line-clamp-4">
                    {featured.content}
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{dayjs(featured.createdAt).format("MMM D, YYYY")}</span>
                  <span>{getReadTime(featured.content)}</span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )} */}

        {featured && (
          <>
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          Top Stories
        </h2>
        <Link
          to={`/article/${featured.slug}`}
          className="block group transition duration-300 hover:shadow-lg"
        >
          <div className="relative rounded-xl overflow-hidden shadow-lg mb-8">
            <img 
              src={featured.image || globalLeaders} 
              className="w-full h-96"
              alt={featured.title}
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {featured.category?.name || 'Featured'}
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">{featured.title}</h2>
              <div className="flex items-center text-white/90 mt-2">
                <span>{new Date(featured.createdAt).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <span>{Math.ceil(featured.content.length / 1000)} min read</span>
              </div>
            </div>
          </div>
          </Link>
          </>
        )}
      {/* Other Articles */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          More News
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((article) => (
            <Link
              to={`/article/${article.slug}`}
              key={article._id}
              className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-white flex flex-col h-full"
            >
              <div className="relative">
                <img
                  src={
                    article.image
                      ? `http://localhost:6000${article.image}`
                      : placeholderImage
                  }
                  alt={article.title}
                  className="h-48 w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  {article.category?.name && (
                    <span className="bg-white text-gray-800 text-xs font-semibold px-2 py-1 rounded">
                      {article.category.name}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 hover:text-blue-600 transition">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {article.content?.substring(0, 150)}
                    {article.content?.length > 150 ? "..." : ""}
                  </p>
                </div>
                <div className="mt-auto pt-3 border-t border-gray-100 text-sm text-gray-500 flex justify-between items-center">
                  <span>{getReadTime(article.content)}</span>
                  <span className="font-medium text-gray-700">
                    {article.author?.name || "TRN Staff"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Empty State for Search */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No articles found
          </h3>
          <p className="mt-1 text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}

      {/* Newsletter Signup */}
      <div className="bg-blue-20 dark:bg-blue-900/20 rounded-xl p-6 mb-8 mt-8">
          <h3 className="text-xl font-bold mb-2 dark:text-white">Stay Updated</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Get daily news digest in your inbox
          </p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Your email address"
              className="flex-grow px-4 py-2 rounded-l-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 transition">
              Subscribe
            </button>
          </div>
        </div>
    </div>
  );
};

export default Home;
