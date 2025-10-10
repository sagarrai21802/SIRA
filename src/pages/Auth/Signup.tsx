import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, UserPlus } from 'lucide-react';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import { Card, CardContent, CardHeader } from '../../components/UI/Card';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';


// New Signup component with additional fields
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
    try {
      // The signUp function from useAuth will need to be updated to handle the new fields.
      // For now, we'll pass them, but this will require changes in AuthContext.tsx.
      // This is a placeholder to show where the new data will be used.
      const { isConfirmed } = await signUp(email, password, { displayName, phone });
      
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
      toast.error(error?.message || 'Failed to sign up');
    }
    setLoading(false);
  };

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
            className="w-full max-w-md rounded-3xl border border-white/20 bg-white/80 p-6 shadow-2xl backdrop-blur dark:bg-gray-900/80"
          >
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create your account</h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Start your marketing journey with SIRA</p>
            </div>

            <Card className="border-0 bg-transparent shadow-none">
              <CardHeader className="p-0 mb-2">
                <h3 className="text-base font-medium text-gray-900 dark:text-white">Sign up</h3>
              </CardHeader>
              <CardContent className="p-0">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Name"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter your name"
                    className="bg-white/90 dark:bg-gray-800/90"
                    required
                  />
                  <div>
                    <Input
                      label="Email address"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="bg-white/90 dark:bg-gray-800/90"
                      required
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">We’ll never share your email.</p>
                  </div>
                  <div className="relative">
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-gray-700 dark:bg-gray-800"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="relative">
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                    <input
                      type="password"
                      placeholder="Repeat your password"
                      className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-gray-700 dark:bg-gray-800"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                  </div>
                  <Input
                    label="Phone Number (Optional)"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="bg-white/90 dark:bg-gray-800/90"
                  />

                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    By creating an account, you agree to our <a href="/terms" className="text-indigo-600 hover:underline">Terms</a> and <a href="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</a>.
                  </div>

                  <Button type="submit" className="w-full" loading={loading} icon={UserPlus}>
                    Create Account
                  </Button>
                </form>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-indigo-600 hover:underline font-medium">
                      Sign in
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}