// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import { Header } from './components/Layout/Header';
// import { Footer } from './components/Layout/Footer';
// import { ProtectedRoute } from './components/ProtectedRoute';
// import { LoadingScreen } from './components/LoadingScreen';
// import { Home } from './pages/Home';
// import { Login } from './pages/Auth/Login';
// import { Signup } from './pages/Auth/Signup';
// import { Dashboard } from './pages/Dashboard';
// import { ContentGenerator } from './pages/ContentGenerator';
// // import ImageGenerator from './pages/ImageGenerator';
// import SEOToolkit from './pages/SEOToolkit';
// import { useAuth } from './hooks/useAuth';

// // ✅ Import your new GenerateTemplate page
// import  GenerateTemplate  from './pages/Template';

// function App() {
//   const { loading } = useAuth();

//   if (loading) {
//     return <LoadingScreen />;
//   }

//   return (
//     <Router>
//       <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
//         <Header />
//         <main className="flex-1">
//           <Routes>
//             {/* Public routes */}
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
            
//             {/* Protected routes */}
//             <Route
//               path="/dashboard"
//               element={
//                 <ProtectedRoute>
//                   <Dashboard />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/content"
//               element={
//                 <ProtectedRoute>
//                   <ContentGenerator />
//                 </ProtectedRoute>
//               }
//             />
//             {/* <Route
//               path="/images"
//               element={
//                 <ProtectedRoute>
//                   <ImageGenerator />
//                 </ProtectedRoute>
//               }
//             /> */}
//             <Route
//               path="/seo"
//               element={
//                 <ProtectedRoute>
//                   <SEOToolkit />
//                 </ProtectedRoute>
//               }
//             />
//             {/* ✅ New Generate Template Route */}
//             <Route
//               path="/template"
//               element={
//                 <ProtectedRoute>
//                   <GenerateTemplate />
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </main>
//         <Footer />
        
//         <Toaster
//           position="top-right"
//           toastOptions={{
//             duration: 4000,
//             style: {
//               background: 'var(--toast-bg)',
//               color: 'var(--toast-color)',
//               border: '1px solid var(--toast-border)',
//             },
//           }}
//         />
//       </div>
//     </Router>
//   );
// }

// export default App;



import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Header } from "./components/Layout/Header";
import { Footer } from "./components/Layout/Footer";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoadingScreen } from "./components/LoadingScreen";
import { Home } from "./pages/Home";
import { Login } from "./pages/Auth/Login";
import { Signup } from "./pages/Auth/Signup";
import { Dashboard } from "./pages/Dashboard";
import { ContentGenerator } from "./pages/ContentGenerator";
import SEOToolkit from "./pages/SEOToolkit";
import { useAuth } from "./hooks/useAuth";
import GenerateTemplate from "./pages/Template";
import {
  LayoutDashboard,
  Layers,
  BarChart3,
  FileText,
  Image as ImageIcon,
} from "lucide-react";

// Sidebar Component
function Sidebar() {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Templates", icon: Layers, href: "/template" },
    { name: "SEO Tools", icon: BarChart3, href: "/seo" },
    { name: "Content", icon: FileText, href: "/content" },
    { name: "Images", icon: ImageIcon, href: "/images" },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col p-4">
      <div className="mb-8 text-2xl font-bold text-center">Menu</div>
      <nav className="flex flex-col gap-2">
        {menuItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.href}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition"
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
        {/* Top Navbar */}
        <Header />

        <div className="flex flex-1">
          {/* Left Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex flex-col flex-1">
            <main className="flex-1 p-6">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/content"
                  element={
                    <ProtectedRoute>
                      <ContentGenerator />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/seo"
                  element={
                    <ProtectedRoute>
                      <SEOToolkit />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/template"
                  element={
                    <ProtectedRoute>
                      <GenerateTemplate />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/images"
                  element={
                    <ProtectedRoute>
                      <div className="text-gray-700 dark:text-white text-lg">
                        Images page coming soon...
                      </div>
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>

            {/* Footer */}
            <Footer />
          </div>
        </div>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "var(--toast-bg)",
              color: "var(--toast-color)",
              border: "1px solid var(--toast-border)",
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;