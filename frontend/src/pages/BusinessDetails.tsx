// src/pages/BusinessDetailsForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BusinessDetailsForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    linkedin_url: "",
    business_name: "",
    industry: "",
    business_description: "",
    target_audience: "",
    tone_of_voice: "",
    primary_objective: "",
    target_platforms: [] as string[],
  });

  // handle input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle checkbox (multi-select)
  const handleCheckbox = (platform: string) => {
    setFormData((prev) => {
      if (prev.target_platforms.includes(platform)) {
        return {
          ...prev,
          target_platforms: prev.target_platforms.filter((p) => p !== platform),
        };
      } else {
        return {
          ...prev,
          target_platforms: [...prev.target_platforms, platform],
        };
      }
    });
  };

  // handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Business Details:", formData);
    navigate("/signin"); // ✅ SignIn page pe redirect
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-pink-600">
      <div className="bg-white shadow-2xl rounded-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-purple-600">
          Business Details
        </h1>
        <p className="text-gray-500 text-center mb-6 text-sm">
          Tell us more about your business
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* LinkedIn URL */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium text-sm">
              LinkedIn URL
            </label>
            <input
              type="url"
              name="linkedin_url"
              value={formData.linkedin_url}
              onChange={handleChange}
              required
              placeholder="https://linkedin.com/in/your-profile"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
          </div>

          {/* Business Name */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium text-sm">
              Business Name
            </label>
            <input
              type="text"
              name="business_name"
              value={formData.business_name}
              onChange={handleChange}
              required
              placeholder="Enter business name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
          </div>

          {/* Industry */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium text-sm">
              Industry
            </label>
            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
              placeholder="e.g. Healthcare, Technology..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
          </div>

          {/* Business Description */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium text-sm">
              Business Description
            </label>
            <textarea
              name="business_description"
              value={formData.business_description}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Short description of your business"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            ></textarea>
          </div>

          {/* Target Audience */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium text-sm">
              Target Audience
            </label>
            <input
              type="text"
              name="target_audience"
              value={formData.target_audience}
              onChange={handleChange}
              required
              placeholder="One-line description"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
          </div>

          {/* Tone of Voice */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium text-sm">
              Tone of Voice
            </label>
            <select
              name="tone_of_voice"
              value={formData.tone_of_voice}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            >
              <option value="">Select Tone</option>
              <option value="Professional">Professional</option>
              <option value="Casual">Casual</option>
              <option value="Witty">Witty</option>
              <option value="Inspirational">Inspirational</option>
            </select>
          </div>

          {/* Primary Objective */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium text-sm">
              Primary Objective
            </label>
            <select
              name="primary_objective"
              value={formData.primary_objective}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            >
              <option value="">Select Objective</option>
              <option value="Brand Awareness">Brand Awareness</option>
              <option value="Sales">Sales</option>
              <option value="Leads">Leads</option>
            </select>
          </div>

          {/* Target Platforms */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium text-sm">
              Target Platforms
            </label>
            <div className="flex flex-wrap gap-3 text-sm">
              {["Instagram", "LinkedIn", "Facebook", "Twitter", "YouTube"].map(
                (platform) => (
                  <label key={platform} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.target_platforms.includes(platform)}
                      onChange={() => handleCheckbox(platform)}
                      className="accent-purple-600"
                    />
                    {platform}
                  </label>
                )
              )}
            </div>
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2.5 rounded-lg font-semibold hover:bg-purple-700 transition text-sm"
          >
            Continue →
          </button>
        </form>
      </div>
    </div>
  );
}