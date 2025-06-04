import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MagnifyingGlassIcon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn,
  FaYoutube
} from 'react-icons/fa';
import api from "../services/api.js";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories?limit=4');
        // const data = await response.json();
        setCategories(response.data.splice(0,4));
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback categories if API fails
        setCategories([
          { _id: '1', name: 'Politics', slug: 'politics' },
          { _id: '2', name: 'Technology', slug: 'technology' },
          { _id: '3', name: 'Business', slug: 'business' },
          { _id: '4', name: 'Health', slug: 'health' }
        ]);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      {/* Top Services Bar with Social Icons */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-2 space-y-2 sm:space-y-0">
            <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 text-sm">
              <span className="font-medium text-gray-900">Our Services:</span>
              <Link to="/news" className="text-blue-600 hover:underline">News</Link>
              <Link to="/pr-agency" className="text-gray-600 hover:underline">PR Agency</Link>
              <Link to="/fruit-delivery" className="text-gray-600 hover:underline">Fruit Delivery</Link>
              <Link to="/advertise" className="text-gray-600 hover:underline">Advertise</Link>

            </div>
            
            <div className="flex items-center space-x-4">
              {/* Social Media Icons */}
              <div className="flex items-center space-x-3 mr-2">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-500 hover:text-blue-600 transition-colors">
                  <FaFacebookF className="h-4 w-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                   className="text-gray-500 hover:text-blue-400 transition-colors">
                  <FaTwitter className="h-4 w-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                   className="text-gray-500 hover:text-pink-600 transition-colors">
                  <FaInstagram className="h-4 w-4" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                   className="text-gray-500 hover:text-blue-700 transition-colors">
                  <FaLinkedinIn className="h-4 w-4" />
                </a>
              </div>

              {/* Contact Information */}
              <div className="hidden sm:flex items-center space-x-4 border-l pl-4">
                <a href="mailto:contact@trn.com" className="flex items-center text-sm text-gray-600 hover:text-blue-600">
                  <EnvelopeIcon className="h-4 w-4 mr-1" />
                  <span className="hidden lg:inline">Contact</span>
                </a>
                <a href="tel:+1234567890" className="flex items-center text-sm text-gray-600 hover:text-blue-600">
                  <PhoneIcon className="h-4 w-4 mr-1" />
                  <span className="hidden lg:inline">+91 7097757374</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">TRN NEWS</Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
              {categories.map(category => (
                <Link 
                  key={category._id} 
                  to={`/category/${category.slug}`}
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  {category.name}
                </Link>
              ))}
              
              <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">About Us</Link>
              
              <button 
                onClick={() => navigate('/search')}
                className="p-1 text-gray-700 hover:text-blue-600"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="text-gray-700 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                     viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white pb-4 px-4 border-t">
            <div className="pt-4 space-y-3">
              {categories.map(category => (
                <Link 
                  key={category._id} 
                  to={`/category/${category.slug}`}
                  className="block py-2 px-2 text-gray-700 hover:bg-blue-50 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              
              <Link 
                to="/about" 
                className="block py-2 px-2 text-gray-700 hover:bg-blue-50 rounded"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;