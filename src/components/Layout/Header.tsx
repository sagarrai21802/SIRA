import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sparkles, Sun, Moon, User, LogOut, Settings, Menu } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";

export function Header({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  // Stable user menu on hover
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);

  const openMenu = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsMenuOpen(true);
  };

  const closeMenuWithDelay = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsMenuOpen(false);
      closeTimeoutRef.current = null;
    }, 150);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      alert("Signed out successfully!");
    } catch (err: any) {
      console.error("Error signing out:", err);
      alert(err.message);
    }
  };

  const showHamburger = user && location.pathname !== "/";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left section: Hamburger + Logo */}
        <div className="flex items-center space-x-3">
          {showHamburger && (
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-800 dark:text-white" />
            </button>
          )}
          <Link to={user ? "/dashboard" : "/"} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">SYRA</span>
          </Link>
        </div>

        {/* Right section: Theme toggle + Auth */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center justify-center"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* Auth buttons */}
          {user ? (
            <div
              className="relative"
              onMouseEnter={openMenu}
              onMouseLeave={closeMenuWithDelay}
            >
              <button
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                aria-haspopup="menu"
                aria-expanded={isMenuOpen}
              >
                <User className="w-5 h-5 text-gray-800 dark:text-white" />
                <span className="hidden sm:block text-sm font-medium text-gray-900 dark:text-gray-200">
                  {(user as any)?.profile?.email ?? "Account"}
                </span>
              </button>
              <div
                className={
                  "absolute right-0 top-full mt-2 w-48 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-lg shadow-lg border border-black/10 dark:border-white/10 py-1 transition-opacity " +
                  (isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")
                }
                role="menu"
              >
                <Link
                  to="/settings"
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 w-full text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}