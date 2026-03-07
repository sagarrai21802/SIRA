import React from "react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Privacy Policy</h1>

        <p className="text-gray-700 mb-4">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our services.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">Information We Collect</h2>
        <p className="text-gray-700 mb-4">
          We may collect personal information such as your name, email address, and any messages you send through our contact forms.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">How We Use Your Information</h2>
        <p className="text-gray-700 mb-4">
          We use your information to provide our services, respond to inquiries, improve our platform, and send important updates or notifications.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">Data Security</h2>
        <p className="text-gray-700 mb-4">
          We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">Third-Party Services</h2>
        <p className="text-gray-700 mb-4">
          We do not share your personal information with third parties except as required to provide our services or comply with legal obligations.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">Changes to This Policy</h2>
        <p className="text-gray-700 mb-4">
          We may update this Privacy Policy from time to time. Any changes will be reflected on this page, so please check back periodically.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions about this Privacy Policy, you can contact us through our Contact Us page.
        </p>
      </div>
    </div>
  );
}
