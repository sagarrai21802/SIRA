import React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Building2, HelpCircle } from "lucide-react";
import { Button } from "../components/UI/Button";
import { Link } from "react-router-dom";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      period: "forever free",
      description: "Perfect for getting started",
      features: [
        "10 AI generations/month",
        "5 images/month",
        "Basic SEO tools",
        "Email support",
        "1 user",
      ],
      cta: "Get Started",
      popular: false,
      color: "from-gray-500 to-gray-600",
    },
    {
      name: "Professional",
      price: "$29",
      period: "per month",
      description: "Best for growing teams",
      features: [
        "Unlimited AI generations",
        "100 images/month",
        "Advanced SEO toolkit",
        "Priority support",
        "5 users",
        "Content scheduler",
        "Analytics dashboard",
      ],
      cta: "Start Free Trial",
      popular: true,
      color: "from-blue-500 to-purple-600",
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      description: "For large organizations",
      features: [
        "Everything in Pro",
        "Unlimited images",
        "Custom AI training",
        "Dedicated account manager",
        "Unlimited users",
        "API access",
        "SSO & advanced security",
      ],
      cta: "Contact Sales",
      popular: false,
      color: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/10 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Simple, Transparent Pricing</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Start free and scale as you grow. All plans include core features with no hidden fees.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative rounded-3xl p-8 ${
                plan.popular
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl scale-105 z-10'
                  : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h2 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                  {plan.name}
                </h2>
                <p className={`text-sm mb-4 ${plan.popular ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.popular ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className={`p-1 rounded-full ${plan.popular ? 'bg-white/20' : 'bg-green-100 dark:bg-green-900/30'}`}>
                      <Check className={`w-4 h-4 ${plan.popular ? 'text-white' : 'text-green-600 dark:text-green-400'}`} />
                    </div>
                    <span className={`text-sm ${plan.popular ? 'text-blue-50' : 'text-gray-600 dark:text-gray-300'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? 'bg-white text-blue-600 hover:bg-blue-50'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                }`}
                asChild
              >
                <Link to="/signup">{plan.cta}</Link>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div 
          className="mt-20 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Can I change plans anytime?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Is there a free trial?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Yes, all paid plans come with a 14-day free trial. No credit card required.</p>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
            <HelpCircle className="w-5 h-5" />
            <span>Have more questions? <Link to="/contact" className="text-blue-600 hover:text-blue-700 font-medium">Contact us</Link></span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
