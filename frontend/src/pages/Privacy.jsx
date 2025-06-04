// src/pages/PrivacyPolicy.jsx
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 py-10 text-gray-700 leading-relaxed">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>

      <p className="mb-4">
        At TRN News, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website.
      </p>

      <h2 className="text-xl font-semibold text-blue-700 mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc ml-6 space-y-1">
        <li>Personal details like name and email address (if you contact us or subscribe)</li>
        <li>Log data including IP address, browser type, pages visited, and time spent</li>
        <li>Cookies to personalize your experience and serve relevant ads</li>
      </ul>

      <h2 className="text-xl font-semibold text-blue-700 mt-6 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc ml-6 space-y-1">
        <li>To improve our website and user experience</li>
        <li>To respond to inquiries or feedback</li>
        <li>To send newsletters if you opt-in</li>
        <li>To display personalized ads via third-party services like Google AdSense</li>
      </ul>

      <h2 className="text-xl font-semibold text-blue-700 mt-6 mb-2">3. Third-Party Services</h2>
      <p>
        We use third-party tools like Google Analytics and AdSense that may collect data for analytics and advertising. These tools may use cookies and similar technologies.
      </p>

      <h2 className="text-xl font-semibold text-blue-700 mt-6 mb-2">4. Your Rights</h2>
      <p>
        You may request access, correction, or deletion of your personal data by contacting us at <a href="mailto:contact@trn.com" className="text-blue-600 hover:underline">contact@trn.com</a>.
      </p>

      <h2 className="text-xl font-semibold text-blue-700 mt-6 mb-2">5. Cookie Policy</h2>
      <p>
        We use cookies to enhance functionality and serve ads. You can manage cookie preferences in your browser settings.
      </p>

      <h2 className="text-xl font-semibold text-blue-700 mt-6 mb-2">6. Updates to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised effective date.
      </p>

      <p className="mt-8 text-sm text-gray-500">Last updated: June 1, 2025</p>
    </div>
  );
};

export default PrivacyPolicy;
