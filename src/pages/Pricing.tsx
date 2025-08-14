import React from "react";

export default function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "$9/mo",
      features: ["10 Projects", "5GB Storage", "Email Support"],
    },
    {
      name: "Pro",
      price: "$29/mo",
      features: ["50 Projects", "50GB Storage", "Priority Support"],
    },
    {
      name: "Enterprise",
      price: "$99/mo",
      features: ["Unlimited Projects", "200GB Storage", "Dedicated Support"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Pricing Plans</h1>
      <p className="text-gray-600 mb-12 text-center max-w-xl">
        Choose the plan that fits your needs. Upgrade or cancel anytime.
      </p>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition"
          >
            <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
            <p className="text-3xl font-bold mb-6">{plan.price}</p>
            <ul className="mb-6 space-y-2 text-gray-600">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2 text-green-500">✔</span> {feature}
                </li>
              ))}
            </ul>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
