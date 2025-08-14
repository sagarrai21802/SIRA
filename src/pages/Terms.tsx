import React from "react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Terms of Service</h1>
      <p className="text-gray-600 mb-12 text-center max-w-3xl">
        By using our platform, you agree to the following terms and conditions.
        Please read them carefully.
      </p>

      <div className="bg-white shadow-lg rounded-xl p-8 max-w-3xl space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p className="text-gray-600">
            By accessing or using our services, you agree to comply with and be bound by these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">2. User Responsibilities</h2>
          <p className="text-gray-600">
            You are responsible for maintaining the confidentiality of your account and any activities under your account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">3. Prohibited Use</h2>
          <p className="text-gray-600">
            You may not misuse our services or engage in any activity that disrupts, damages, or interferes with the platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">4. Modifications</h2>
          <p className="text-gray-600">
            We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">5. Contact</h2>
          <p className="text-gray-600">
            For questions regarding these Terms, please contact us via the Contact Us page.
          </p>
        </section>
      </div>
    </div>
  );
}
