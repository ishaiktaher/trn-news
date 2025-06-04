// src/pages/About.jsx
import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          About TRN News
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Delivering timely, truthful, and trusted journalism every day. TRN
          News is your digital gateway to what's happening locally and globally.
        </p>
      </div>

      {/* Our Story */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2 text-blue-700">Our Story</h2>
        <p className="text-gray-700 leading-relaxed">
          Founded in 2024, TRN News was born from a vision to make high-quality
          journalism accessible to everyone. Our mission is to provide a
          reliable news platform where people can explore unbiased reporting,
          critical analysis, and compelling stories from around the world.
        </p>
      </section>
      {/* Meet the Team */}
      {/* <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700 text-center">
          Meet Our Team
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Taher Shaik",
              role: "Web Developer",
              bio: "Frontend & Backend developer at Webers Innovations, leading the TRN News platform.",
              image: "/team/taher.jpg",
              email: "shaikt30@gmail.com",
              linkedin: "https://linkedin.com/in/shaiktaher",
            },
            {
              name: "Priya Sharma",
              role: "Editor-in-Chief",
              bio: "Ensures editorial quality, manages contributors, and oversees news curation.",
              image: "/team/priya.jpg",
              email: "priya@trnnews.com",
              linkedin: "https://linkedin.com/in/priyasharma",
            },
            {
              name: "Rahul Mehta",
              role: "Senior Journalist",
              bio: "Investigates and reports on politics and civic developments across regions.",
              image: "/team/rahul.jpg",
              email: "rahul@trnnews.com",
              linkedin: "https://linkedin.com/in/rahulmehta",
            },
          ].map((member, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-2 border-blue-500"
              />
              <h4 className="text-lg font-semibold text-gray-800">
                {member.name}
              </h4>
              <p className="text-sm text-gray-500">{member.role}</p>
              <p className="mt-2 text-gray-600 text-sm">{member.bio}</p>
              <div className="mt-4 flex justify-center gap-4 text-blue-600">
                <a
                  href={`mailto:${member.email}`}
                  title="Email"
                  className="hover:underline text-sm"
                >
                  {member.email}
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn"
                  className="hover:underline text-sm"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* What We Cover */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2 text-blue-700">
          What We Cover
        </h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-1">
          <li>Breaking news and daily updates</li>
          <li>Politics, Business, and Technology</li>
          <li>Health, Education, Environment, and Culture</li>
          <li>Investigative journalism and human interest stories</li>
        </ul>
      </section>

      {/* Values */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2 text-blue-700">
          Our Values
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <h3 className="font-semibold text-lg">Integrity</h3>
            <p>
              We uphold the highest ethical standards in reporting and
              fact-checking.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Independence</h3>
            <p>
              We are free from political or corporate influence, ensuring
              unbiased journalism.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Transparency</h3>
            <p>
              We believe in clarity of source, authorship, and correction of
              errors.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Impact</h3>
            <p>
              We aim to inform, empower, and create positive change through
              knowledge.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-blue-50 rounded-lg p-6 mt-12">
        <h3 className="text-xl font-semibold mb-2">
          Stay informed with TRN News
        </h3>
        <p className="text-gray-600 mb-4">
          Join our newsletter or follow us on social media for daily news and
          insights.
        </p>

        <Link
          to="/contact"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
};

export default About;
