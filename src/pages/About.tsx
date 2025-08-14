

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">About Us</h1>
      <p className="text-gray-600 mb-12 text-center max-w-2xl">
        Welcome to our platform! We are dedicated to helping solo founders, startups,
        agencies, and content teams achieve their marketing goals with powerful AI tools.
        From content generation and SEO optimization to image creation and project management,
        our suite of tools is designed to make your workflow efficient and effective.
      </p>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600 text-center">
            Empower creators and teams to build, market, and grow with smart, intuitive AI tools.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition">
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-gray-600 text-center">
            To be the leading AI-powered marketing platform that simplifies content creation and
            strategy for everyone.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition">
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <p className="text-gray-600 text-center">
            Innovation, efficiency, and customer-centric design are at the heart of everything we do.
          </p>
        </div>
      </div>
    </div>
  );
}
