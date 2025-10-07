import React, { useState } from "react";
// import { getMongoDb } from "../lib/realm"; 

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:4000';
      const resp = await fetch(`${apiBase}/api/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      if (!resp.ok) throw new Error(await resp.text());
    } catch (error: any) {
      setLoading(false);
      console.error("Error saving feedback:", error?.message || error);
      return;
    }

    setLoading(false);

    setSubmitted(true); // Show thank-you message
    setName("");
    setEmail("");
    setMessage("");
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-16 px-4">
        <div className="bg-white shadow-lg rounded-xl p-12 text-center max-w-lg">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Thank You!</h1>
          <p className="text-gray-600 mb-6">
            Your message has been received. We appreciate your feedback and will get back to you soon.
          </p>
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
            onClick={() => setSubmitted(false)}
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Contact Us</h1>
      <p className="text-gray-600 mb-12 text-center max-w-2xl">
        Have questions or feedback? Fill out the form below and we’ll get back to you as soon as possible.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg"
      >
        <input
          type="text"
          placeholder="Your Name"
          className="border p-3 w-full mb-4 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="border p-3 w-full mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Your Message"
          className="border p-3 w-full mb-4 rounded"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-500 text-white px-6 py-3 rounded-lg w-full transition ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
