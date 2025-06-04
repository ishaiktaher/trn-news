// src/pages/Contact.jsx
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import react, {useState} from 'react';
import api from "../services/api.js";

const Contact = () => {

const [form, setForm] = useState({ name: "", email: "", message: "" });
const [success, setSuccess] = useState(false);

const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await api.post("contact", form);
    setSuccess(true);
    setForm({ name: "", email: "", message: "" });
  } catch (err) {
    alert("Failed to send message. Try again later.");
  }
};

  return (
    <div className="max-w-5xl mx-auto p-6 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <form
          className="space-y-4 bg-white p-6 rounded-lg shadow"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="mt-1 block w-full border border-gray-300 rounded px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 block w-full border border-gray-300 rounded px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              rows="5"
              placeholder="Write your message..."
              className="mt-1 block w-full border border-gray-300 rounded px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              required
              onChange={handleChange}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Send Message
          </button>
          {success && (
            <p className="text-green-600 text-sm mt-4">
              ✅ Message sent successfully!
            </p>
          )}
        </form>

        {/* Info & Socials */}
        <div className="bg-gray-50 p-6 rounded-lg shadow flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-gray-700 mb-4">
              Have a story tip, feedback, or business inquiry? Reach out to us
              using the form or the contact info below.
            </p>
            <p className="text-gray-700 text-sm mb-1">
              Email:{" "}
              <a
                href="mailto:contact@trn.com"
                className="text-blue-600 hover:underline"
              >
                contact@trn.com
              </a>
            </p>
            <p className="text-gray-700 text-sm">
              Phone:{" "}
              <a
                href="tel:+917097757374"
                className="text-blue-600 hover:underline"
              >
                +91 70977 57374
              </a>
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-3">Follow Us</h3>
            <div className="flex space-x-4 text-gray-500 text-xl">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF className="hover:text-blue-600" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="hover:text-blue-400" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="hover:text-pink-600" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn className="hover:text-blue-700" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className="hover:text-red-600" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
