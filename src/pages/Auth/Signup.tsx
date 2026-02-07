import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, UserPlus, Mail, Lock, Eye, EyeOff, User, Phone, CheckCircle2, Github, Chrome } from 'lucide-react';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import { Card, CardContent, CardHeader } from '../../components/UI/Card';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

export function Signup() {
  // State for user inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // New state for display name
  const [displayName, setDisplayName] = useState('');
  // New state for optional phone number
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  // Handles the form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation for required fields
    if (!email || !password || !confirmPassword || !displayName) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Password match validation
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Password length validation
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setLoadingMessage('Creating account...');
    
    // Show "waking up server" message after 3 seconds if still loading
    const serverWakeTimeout = setTimeout(() => {
      if (loading) {
        setLoadingMessage('Waking up server... This may take a moment');
      }
    }, 3000);
    
    try {
      const { isConfirmed } = await signUp(email, password, { displayName, phone });
      clearTimeout(serverWakeTimeout);
      
      if (isConfirmed) {
        // User is already confirmed (rare case)
        toast.success('Account created! Please log in.');
        navigate('/login');
      } else {
        toast.success(
          'Please check your email for confirmation link!'
        );
        navigate('/login', { 
          state: { 
            message: 'Please check your email and confirm your account before logging in.' 
          }
        });
      }
    } catch (error: any) {
      clearTimeout(serverWakeTimeout);
      toast.error(error?.message || 'Failed to sign up');
    }
    setLoading(false);
    setLoadingMessage('Creating account...');
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Creating account...');

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
      {/* Decorative background orbs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* Left banner */}
        <div className="hidden lg:flex flex-col justify-center px-12 text-white">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                <Sparkles className="h-7 w-7" />
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight">Join SIRA</h1>
            </div>
            <p className="text-white/80 text-lg max-w-xl">
              Personalize your brand identity once, and generate on-brand content everywhere.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                <div className="text-2xl font-bold">Get started fast</div>
                <div className="text-white/80 text-sm">A clean, simple setup flow</div>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                <div className="text-2xl font-bold">Brand-aware</div>
                <div className="text-white/80 text-sm">Auto-personalized outputs</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right panel */}
        <div className="flex items-center justify-center p-6 lg:p-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-md rounded-3xl border border-white/20 bg-white/80 p-8 shadow-2xl backdrop-blur dark:bg-gray-900/80"
          >
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create your account</h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Start your marketing journey with SIRA</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-gray-300 pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent dark:border-gray-700 dark:bg-gray-800 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-gray-300 pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent dark:border-gray-700 dark:bg-gray-800 transition-all"
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">We'll never share your email with anyone.</p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="w-full rounded-xl border border-gray-300 pl-10 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent dark:border-gray-700 dark:bg-gray-800 transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 text-gray-500" /> : <Eye className="w-4 h-4 text-gray-500" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="w-full rounded-xl border border-gray-300 pl-10 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent dark:border-gray-700 dark:bg-gray-800 transition-all"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4 text-gray-500" /> : <Eye className="w-4 h-4 text-gray-500" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number <span className="text-gray-400 font-normal">(Optional)</span></label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full rounded-xl border border-gray-300 pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent dark:border-gray-700 dark:bg-gray-800 transition-all"
                  />
                </div>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                By creating an account, you agree to our{' '}
                <Link to="/terms" className="text-indigo-600 hover:text-indigo-700 font-medium">Terms of Service</Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-indigo-600 hover:text-indigo-700 font-medium">Privacy Policy</Link>.
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3.5 font-semibold text-white shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 transition-all duration-200 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    {loadingMessage}
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Create Account
                  </>
                )}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white/80 dark:bg-gray-900/80 text-gray-500">Or sign up with</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <Chrome className="w-5 h-5 text-red-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <Github className="w-5 h-5 text-gray-900 dark:text-white" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">GitHub</span>
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}