import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import ArticleCard from '../components/ArticleCard';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim()) {
        setIsLoading(true);
        try {
          const res = await api.get(`/search?query=${encodeURIComponent(query)}`);
          setResults(res.data);
        } catch (error) {
          console.error('Search failed:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">
          {query ? `Search results for "${query}"` : 'Search Articles'}
        </h1>
        
        {/* Search Input (larger version) */}
        <div className="relative max-w-2xl">
          <input
            type="text"
            defaultValue={query}
            placeholder="Type and press enter to search..."
            className="w-full border-b-2 border-gray-300 px-4 py-2 text-lg focus:outline-none focus:border-blue-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                window.location.href = `/search?q=${encodeURIComponent(e.target.value)}`;
              }
            }}
          />
          <MagnifyingGlassIcon className="absolute right-2 top-3 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : results.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map(article => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      ) : query ? (
        <p className="text-gray-500 py-8 text-center">
          No articles found matching "{query}"
        </p>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p>Enter a search term to find articles</p>
          <p className="text-sm mt-2">Try searching for "technology", "politics", etc.</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;