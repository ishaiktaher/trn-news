import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn,
  FaYoutube
} from 'react-icons/fa';
import { 
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">TRN GROUP</h3>
            <p className="text-gray-400">
              Comprehensive media and services solutions for modern businesses and consumers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebookF className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <FaLinkedinIn className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <FaYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Our Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/news" className="hover:text-white transition-colors">News Platform</Link>
              </li>
              <li>
                <Link to="/pr-agency" className="hover:text-white transition-colors">PR Agency</Link>
              </li>
              <li>
                <Link to="/fruit-delivery" className="hover:text-white transition-colors">Fruit Delivery</Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
              {/* <li>
                <Link to="/careers" className="hover:text-white transition-colors">Careers</Link>
              </li> */}
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-start">
                <MapPinIcon className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                <p>123 Business Ave, Suite 500<br />New York, NY 10001</p>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-3 flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-white">+1 (234) 567-890</a>
              </div>
              <div className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 mr-3 flex-shrink-0" />
                <a href="mailto:contact@trn.com" className="hover:text-white">contact@trn.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} TRN Group. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-gray-500 hover:text-white text-sm">Terms of Service</Link>
            <Link to="/privacy" className="text-gray-500 hover:text-white text-sm">Privacy Policy</Link>
            <Link to="/cookies" className="text-gray-500 hover:text-white text-sm">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;