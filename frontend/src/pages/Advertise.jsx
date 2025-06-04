// src/pages/Advertise.jsx
import { Link } from "react-router-dom";

const Advertise = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Advertise with TRN News</h1>

      <section className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          TRN News reaches thousands of readers each month across India. If you're a brand, business, or agency looking to promote your message, we offer flexible advertising options tailored to your needs.
        </p>

        <div>
          <h2 className="text-xl font-semibold text-blue-700 mb-2">📌 Advertising Options</h2>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>Banner Ads</strong> – Display your brand on the homepage, sidebar, or within articles</li>
            <li><strong>Sponsored Articles</strong> – Publish a promotional story reviewed by our editorial team</li>
            <li><strong>Newsletter Sponsorship</strong> – Get your brand in front of our subscriber base</li>
            <li><strong>Event Coverage</strong> – Promote your event via featured stories</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-blue-700 mb-2">📐 Ad Sizes & Locations</h2>
          <ul className="list-disc ml-6">
            <li>Leaderboard Banner – 728×90 (Homepage)</li>
            <li>Sidebar Rectangle – 300×250 (All pages)</li>
            <li>In-Content Banner – 468×60 (After 2nd paragraph)</li>
          </ul>
        </div>

        <div className="bg-blue-50 p-4 rounded shadow mt-8 text-center">
          <p className="text-lg font-medium mb-2">Interested in Advertising?</p>
          <p>Contact us at <a href="mailto:contact@trn.com" className="text-blue-600 hover:underline">contact@trn.com</a> or fill out our <Link to="/contact" className="text-blue-600 hover:underline">Contact Form</Link>.</p>
        </div>
      </section>
    </div>
  );
};

export default Advertise;
