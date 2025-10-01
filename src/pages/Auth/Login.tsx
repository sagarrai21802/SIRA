import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

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
      navigate("/dashboard");
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
      const response = await fetch('http://localhost:4000/api/auth/set-password', {
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      {successMessage && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {successMessage}
        </div>
      )}
      {needsPasswordSetup ? (
        <form
          onSubmit={handlePasswordSetup}
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Set Up Password</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="border rounded-lg p-3 w-full bg-gray-100 text-gray-600"
            />
          </div>

          <div className="mb-4 relative">
            <label className="block mb-2 font-medium text-gray-700">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="mb-4 relative">
            <label className="block mb-2 font-medium text-gray-700">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm new password"
              className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white w-full py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? "Setting up..." : "Set Password"}
          </button>

          <button
            type="button"
            onClick={() => {
              setNeedsPasswordSetup(false);
              setError("");
              setSuccessMessage("");
            }}
            className="w-full py-2 text-gray-500 hover:text-gray-700 mt-2"
          >
            Back to Login
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4 relative">
            <label className="block mb-2 font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white w-full py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-gray-500 mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </form>
      )}
    </div>
  );
}
