// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Sparkles, Sun, Moon, User, LogOut, Settings } from "lucide-react";
// import { useAuth } from "../../hooks/useAuth";
// import { useTheme } from "../../hooks/useTheme";

// export function Header() {
//   const { user, signOut } = useAuth();
//   const { theme, toggleTheme } = useTheme();
//   const location = useLocation();

//   const isActive = (path: string) => location.pathname === path;

//   const handleSignOut = async () => {
//     try {
//       await signOut();
//       alert("Signed out successfully!");
//     } catch (err: any) {
//       console.error("Error signing out:", err);
//       alert(err.message);
//     }
//   };

//   return (
//     <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative h-16 flex items-center">
        
//         {/* Logo pinned to left */}
//         <div className="absolute left-4 flex items-center">
//           {/* ✅ Fixed: logged in → /dashboard, not logged in → / */}
//           <Link to={user ? "/dashboard" : "/"} className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//               <Sparkles className="w-5 h-5 text-white" />
//             </div>
//             <span className="text-xl font-bold text-gray-900 dark:text-white">
//               SYRA.io
//             </span>
//           </Link>
//         </div>

//         {/* Actions pinned to right */}
//         <div className="absolute right-4 flex items-center space-x-4">
//           {/* Theme toggle */}
//           <button
//             onClick={toggleTheme}
//             className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
//           >
//             {theme === "light" ? (
//               <Moon className="w-5 h-5" />
//             ) : (
//               <Sun className="w-5 h-5" />
//             )}
//           </button>

//           {/* Auth buttons */}
//           {user ? (
//             <div className="relative group">
//               <button className="flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
//                 <User className="w-5 h-5" />
//                 <span className="hidden sm:block text-sm font-medium">
//                   {user.email}
//                 </span>
//               </button>
//               <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                 <Link
//                   to="/settings"
//                   className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
//                 >
//                   <Settings className="w-4 h-4" />
//                   <span>Settings</span>
//                 </Link>
//                 <button
//                   onClick={handleSignOut}
//                   className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 w-full text-left"
//                 >
//                   <LogOut className="w-4 h-4" />
//                   <span>Sign out</span>
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="flex items-center space-x-4">
//               <Link
//                 to="/login"
//                 className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
//               >
//                 Sign in
//               </Link>
//               <Link
//                 to="/signup"
//                 className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
//               >
//                 Get Started
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }


// header.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Sparkles, Sun, Moon, User, LogOut, Settings, Menu } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";

export function Header({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await signOut();
      alert("Signed out successfully!");
    } catch (err: any) {
      console.error("Error signing out:", err);
      alert(err.message);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 w-full">
      {/* full width flex instead of max-w container */}
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left section: Hamburger + Logo */}
        <div className="flex items-center space-x-3">
          {user && (
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center"
            >
              <Menu className="w-6 h-6 text-gray-800 dark:text-white" />
            </button>
          )}
          <Link to={user ? "/dashboard" : "/"} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
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
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center justify-center"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* Auth buttons */}
          {user ? (
            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                <User className="w-5 h-5" />
                <span className="hidden sm:block text-sm font-medium text-gray-900 dark:text-gray-200">
                  {user.email}
                </span>
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  to="/settings"
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 w-full text-left"
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