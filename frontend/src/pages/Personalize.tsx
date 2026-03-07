// src/pages/PersonalizedForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PersonalizedForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    organization: "",
    website: "",
    purpose: "",
    industry: "",
  });

  // handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    navigate("/signin"); // SignIn page par bhejo
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600">
      {/* container thoda chhota kar diya */}
      <div className="bg-white shadow-2xl rounded-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-indigo-600">
          Welcome to SYRA.io
        </h1>
        <p className="text-gray-500 text-center mb-6 text-sm">
          Please fill in your details before signing in
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium text-sm">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="Enter your full name"
            />
          </div>

          {/* Organization Name */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium text-sm">
              Organization Name
            </label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="Enter organization name"
            />
          </div>

          {/* Website URL */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium text-sm">
              Website URL
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="https://example.com"
            />
          </div>

          {/* Purpose */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium text-sm">
              Purpose
            </label>
            <select
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            >
              <option value="">Select Purpose</option>
              <option value="Branding">Branding</option>
              <option value="Content">Content</option>
              <option value="Organic">Organic</option>
            </select>
          </div>

          {/* Industry */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium text-sm">
              Industry
            </label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            >
              <option value="">Select Industry</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Technology">Technology</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition text-sm"
          >
            Continue →
          </button>
        </form>
      </div>
    </div>
  );
}