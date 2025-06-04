import React, { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import api from "../services/api";
import placeholderImage from "../assets/news-placeholder.jpg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ArticleList from "../components/ArticleList";
import AdUnit from "../components/AdUnit";
const ARTICLES_PER_PAGE = 6;

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [trendingVisible, setTrendingVisible] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const loaderRef = useRef(null);

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/articles");
      setArticles(res.data);
      setFilteredArticles(res.data);
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

  const uniqueCategories = [
    "All",
    ...Array.from(
      new Set(articles.map((a) => a.category?.name).filter(Boolean))
    ),
  ];

  useEffect(() => {
    let filtered = articles;
    if (searchQuery) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (article) => article.category?.name === selectedCategory
      );
    }

    setFilteredArticles(filtered);
    setPage(1);
  }, [searchQuery, selectedCategory, articles]);

  const featured = filteredArticles[0];
  const sideArticles = filteredArticles.slice(1, 5);
  const paginatedArticles = filteredArticles
    .filter((a) => a._id !== featured?._id)
    .slice(0, page * ARTICLES_PER_PAGE);

  const hasMore = filteredArticles.length > paginatedArticles.length + 1;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetchingMore) {
          setIsFetchingMore(true);
          setTimeout(() => {
            setPage((prev) => prev + 1);
            setIsFetchingMore(false);
          }, 700);
        }
      },
      { threshold: 1.0 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, isFetchingMore]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <Skeleton height={30} width={200} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Skeleton height={400} />
          <Skeleton height={400} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          <p>{error}</p>
          <button
            onClick={fetchArticles}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto min-h-screen">
      {/* Live Ticker */}
      <div className="bg-gray-100 p-3 mb-4 flex items-center overflow-hidden rounded-lg">
        <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold mr-3 rounded z-10">
          LIVE
        </span>
        <div className="whitespace-nowrap animate-marquee">
          Breaking: New climate agreement • Stocks rise after Fed update • Team
          enters finals
        </div>
      </div>
      {/* Trending Now */}
      {articles.some(isTrending) && (
        <div className="mb-6">
          <button
            onClick={() => setTrendingVisible((prev) => !prev)}
            className="font-semibold text-blue-700 mb-2"
          >
            {trendingVisible ? "Hide" : "Show"} Trending Now
          </button>
          {trendingVisible && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {articles
                .filter(isTrending)
                .slice(0, 3)
                .map((trend) => (
                  <Link
                    key={trend._id}
                    to={`/article/${trend.slug}`}
                    className="bg-white rounded shadow p-4 hover:shadow-lg transition"
                  >
                    <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {trend.title}
                    </h4>
                    <div
                      className="text-sm text-gray-600 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: trend.content }}
                    ></div>
                  </Link>
                ))}
            </div>
          )}
        </div>
      )}
      {/* Category Tabs */}
      <div className="flex gap-3 overflow-x-auto mb-6">
        {uniqueCategories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-1 rounded-full text-sm ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      {featured && (
        <section
          className={`mb-10 grid grid-cols-1 ${
            sideArticles.length > 0 ? "lg:grid-cols-3" : "lg:grid-cols-1"
          } gap-6`}
        >
          <Link
            to={`/article/${featured.slug}`}
            className="lg:col-span-2 block group hover:shadow-lg transition bg-white rounded-xl overflow-hidden shadow"
          >
            <img
              src={
                featured.featuredImage
                  ? `http://localhost:4000/uploads/${featured.featuredImage}`
                  : placeholderImage
              }
              alt={featured.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <div className="flex gap-2 mb-2">
                {featured.category?.name && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {featured.category.name}
                  </span>
                )}
                {isTrending(featured) && (
                  <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded">
                    🔥 Trending
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition">
                {featured.title}
              </h2>
              <div
                className="text-gray-700 mb-4 line-clamp-4"
                dangerouslySetInnerHTML={{ __html: featured.content }}
              ></div>
              <div className="text-sm text-gray-500 flex justify-between">
                <span>{dayjs(featured.createdAt).format("MMM D, YYYY")}</span>
                <span>{getReadTime(featured.content)}</span>
              </div>
            </div>
          </Link>

          {sideArticles.length > 0 && (
            <div className="flex flex-col justify-between space-y-6">
              {sideArticles.map((article) => (
                <Link
                  key={article._id}
                  to={`/article/${article.slug}`}
                  className="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition flex"
                >
                  <img
                    src={
                      article.featuredImage
                        ? `http://localhost:4000/uploads/${article.featuredImage}`
                        : placeholderImage
                    }
                    alt={article.title}
                    className="w-24 h-24 object-cover"
                  />
                  <div className="p-3 flex flex-col justify-between">
                    <h4 className="text-sm font-semibold text-gray-800 line-clamp-2">
                      {article.title}
                    </h4>
                    <div
                      className="text-xs text-gray-600 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: article.content }}
                    ></div>
                    <span className="text-xs text-gray-500">
                      {getReadTime(article.content)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      )}
      {/* google Ad */}
      <AdUnit slot="1234567890" />
      <section>
        {/* <h3 className="text-xl font-semibold mb-4">More News</h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedArticles.map((article) => (
            <Link
              to={`/article/${article.slug}`}
              key={article._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col"
            >
              <img
                loading="lazy"
                src={
                  article.featuredImage
                    ? `http://localhost:4000/uploads/${article.featuredImage}`
                    : placeholderImage
                }
                alt={article.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h4 className="font-semibold mb-2 text-gray-900">{article.title}</h4>
                <div className="text-gray-600 text-sm line-clamp-3" dangerouslySetInnerHTML={{ __html: article.content }}></div>
                <div className="mt-auto pt-3 text-sm text-gray-500 border-t flex justify-between">
                  <span>{getReadTime(article.content)}</span>
                  <span>{article.author?.name || "TRN Staff"}</span>
                </div>
              </div>
            </Link>
          ))}
        </div> */}
        <ArticleList articles={paginatedArticles} title="More News" />
      </section>
      <div
        ref={loaderRef}
        className="h-16 mt-8 flex justify-center items-center"
      >
        {isFetchingMore && (
          <div className="spinner-border animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        )}
      </div>
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
          title="Back to top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default Home;
