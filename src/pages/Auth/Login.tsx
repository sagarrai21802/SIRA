import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { API_BASE, API_ENDPOINTS } from "../../lib/api";
import toast from "react-hot-toast";

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [needsPasswordSetup, setNeedsPasswordSetup] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const state = location.state as { message?: string; error?: string } | null;
    if (state?.message) {
      setSuccessMessage(state.message);
    }
    if (state?.error) {
      setError(state.error);
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password);
      localStorage.setItem('showWelcome', 'true');
      navigate("/dashboard");

      // Auto-resume LinkedIn connect if a code was stored
      const pendingCode = localStorage.getItem('li_pending_code');
      if (pendingCode) {
        try {
          toast.loading('Finishing LinkedIn connection...', { id: 'li-connect' });
          const token = localStorage.getItem('auth_token');
          const redirectUri = import.meta.env.VITE_LINKEDIN_REDIRECT_URI || `${window.location.origin}/linkedin-callback`;
          const resp = await fetch(`${API_BASE}${API_ENDPOINTS.LINKEDIN_EXCHANGE_CODE}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            },
            body: JSON.stringify({ code: pendingCode, redirect_uri: redirectUri })
          });
          const data = await resp.json();
          if (!resp.ok) throw new Error(data.error || 'Failed to connect LinkedIn');
          toast.success('LinkedIn connected!', { id: 'li-connect' });
          localStorage.removeItem('li_pending_code');

          // If there is a pending post, publish it
          const pendingRaw = localStorage.getItem('li_pending_post');
          if (pendingRaw) {
            const pending = JSON.parse(pendingRaw);
            if (pending?.content) {
              toast.loading('Posting to LinkedIn...', { id: 'li-post' });
              const postResp = await fetch(`${API_BASE}${API_ENDPOINTS.LINKEDIN_POST}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: JSON.stringify({ content: pending.content, image_url: pending.image_url || null })
              });
              const postData = await postResp.json();
              if (!postResp.ok) throw new Error(postData.error || 'Failed to post to LinkedIn');
              toast.success('Posted to LinkedIn!', { id: 'li-post' });
            }
            localStorage.removeItem('li_pending_post');
            navigate('/linkedinpostgenerator');
          }
        } catch (ex: any) {
          toast.error(ex?.message || 'Failed to finish LinkedIn connection', { id: 'li-connect' });
        }
      }
    } catch (err: any) {
      if (err.needsPasswordSetup || err.message?.toLowerCase().includes('needs password setup') || err.message?.toLowerCase().includes('account needs password setup')) {
        setNeedsPasswordSetup(true);
        setError('Your account needs password setup. Please set a new password below.');
      } else if (err.message?.toLowerCase().includes('email not confirmed')) {
        setError('Please confirm your email address before logging in. Check your inbox for the confirmation link.');
      } else {
        setError(err.message || "Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}${API_ENDPOINTS.SET_PASSWORD}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password: newPassword
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to set password');
      }
      
      setSuccessMessage('Password set successfully! You can now log in.');
      setNeedsPasswordSetup(false);
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.message || 'Failed to set password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
      {/* Decorative background orbs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      {/* Content grid */}
      <div className="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* Left banner */}
        <div className="hidden lg:flex flex-col justify-center px-12 text-white">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                <Sparkles className="h-7 w-7" />
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight">Welcome to SIRA</h1>
            </div>
            <p className="text-white/80 text-lg max-w-xl">
              Create on-brand content, images and posts tailored to your business. Sign in to continue where you left off.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                <div className="text-2xl font-bold">10k+</div>
                <div className="text-white/80 text-sm">Images generated</div>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                <div className="text-2xl font-bold">25k+</div>
                <div className="text-white/80 text-sm">Posts created</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right auth panel */}
        <div className="flex items-center justify-center p-6 lg:p-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-md rounded-3xl border border-white/20 bg-white/80 p-6 shadow-2xl backdrop-blur dark:bg-gray-900/80"
          >
            {successMessage && (
              <div className="mb-3 rounded-lg border border-green-300 bg-green-50 px-4 py-2 text-green-700">
                {successMessage}
              </div>
            )}

            {needsPasswordSetup ? (
              <form onSubmit={handlePasswordSetup}>
                <div className="mb-6 text-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Set up password</h2>
                  {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full rounded-xl border border-gray-300 bg-gray-100 p-3 text-gray-600 dark:border-gray-700 dark:bg-gray-800"
                  />
                </div>

                <div className="mb-4 relative">
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">New password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-gray-700 dark:bg-gray-800"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-[38px] text-sm text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <div className="mb-6 relative">
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-gray-700 dark:bg-gray-800"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white shadow hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? "Setting up..." : "Set password"}
                </button>

                <button
                  type="button"
                  onClick={() => { setNeedsPasswordSetup(false); setError(""); setSuccessMessage(""); }}
                  className="mt-3 w-full text-sm text-gray-500 hover:text-gray-700"
                >
                  Back to login
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-6 text-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h2>
                  {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-gray-700 dark:bg-gray-800"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    autoFocus
                  />
                </div>

                <div className="mb-2 relative">
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-gray-700 dark:bg-gray-800"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-[38px] text-sm text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <div className="mb-6 text-right">
                  <a href="/help" className="text-xs text-indigo-600 hover:underline">Forgot password?</a>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white shadow hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

                <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  Don’t have an account?
                  <Link to="/signup" className="ml-1 font-medium text-indigo-600 hover:underline">Sign up</Link>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
