import React from "react";

export default function DataDeletion() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Data Deletion</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        You can request deletion of your account and associated data at any time.
      </p>
      <div className="space-y-4 text-gray-700 dark:text-gray-300">
        <p>
          If you have an account, you can delete your data by contacting support or by
          submitting a deletion request from within the application settings if available.
        </p>
        <p>
          For assistance, email our support team at
          {" "}
          <a className="text-blue-600 dark:text-blue-400 underline" href="mailto:support@sira.ai">
            support@sira.ai
          </a>
          . Please include the email associated with your account to help us process your request.
        </p>
        <p>
          Once your deletion request is verified, we will permanently remove your personal data
          in accordance with our
          {" "}
          <a className="text-blue-600 dark:text-blue-400 underline" href="/privacy">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}


