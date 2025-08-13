// import React from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import { Header } from "./components/Layout/Header";
// import { Footer } from "./components/Layout/Footer";
// import { Sidebar } from "./components/Layout/Sidebar";
// import { ProtectedRoute } from "./components/ProtectedRoute";
// import { LoadingScreen } from "./components/LoadingScreen";
// import { Home } from "./pages/Home";
// import { Login } from "./pages/Auth/Login";
// import { Signup } from "./pages/Auth/Signup";
// import  Profile  from "./pages/Profile";
// import { Dashboard } from "./pages/Dashboard";
// import { ContentGenerator } from "./pages/ContentGenerator";
// import SEOToolkit from "./pages/SEOToolkit";
// import { useAuth } from "./hooks/useAuth";
// import GenerateTemplate from "./pages/Template";
// import { ImageGenerator } from "./pages/ImageGeneration";

// function AppContent() {
//   const { loading } = useAuth();
//   const location = useLocation();

//   if (loading) {
//     return <LoadingScreen />;
//   }

//   // Routes where we don't want sidebar
//   const noSidebarRoutes = ["/", "/login", "/signup"];
//   const hideSidebar = noSidebarRoutes.includes(location.pathname);

//   return (
//     <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
//       <Header />

//       <div className="flex flex-1">
//         {/* Sidebar only on specific pages */}
//         {!hideSidebar && <Sidebar />}

//         <div className="flex flex-col flex-1">
//           <main className="flex-1 p-6">
//             <Routes>
//               {/* Public routes */}
//               <Route path="/" element={<Home />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/signup" element={<Signup />} />
//               <Route
//                     path="/profile"
//                     element={
//                       <ProtectedRoute>
//                         <Profile />
//                       </ProtectedRoute>
//                     }
//                   />

//               {/* Protected routes */}
//               <Route
//                 path="/dashboard"
//                 element={
//                   <ProtectedRoute>
//                     <Dashboard />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/content"
//                 element={
//                   <ProtectedRoute>
//                     <ContentGenerator />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/seo"
//                 element={
//                   <ProtectedRoute>
//                     <SEOToolkit />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/template"
//                 element={
//                   <ProtectedRoute>
//                     <GenerateTemplate />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/images"
//                 element={
//                   <ProtectedRoute>
//                       <ImageGenerator />
//                   </ProtectedRoute>
//                 }
//               />
//             </Routes>
//           </main>

//           <Footer />
//         </div>
//       </div>

//       <Toaster
//         position="top-right"
//         toastOptions={{
//           duration: 4000,
//           style: {
//             background: "var(--toast-bg)",
//             color: "var(--toast-color)",
//             border: "1px solid var(--toast-border)",
//           },
//         }}
//       />
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }


import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Header } from "./components/Layout/Header";
import { Footer } from "./components/Layout/Footer";
import { Sidebar } from "./components/Layout/Sidebar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoadingScreen } from "./components/LoadingScreen";
import { Home } from "./pages/Home";
import { Login } from "./pages/Auth/Login";
import { Signup } from "./pages/Auth/Signup";
import Profile from "./pages/Profile";
import { Dashboard } from "./pages/Dashboard";
import { ContentGenerator } from "./pages/ContentGenerator";
import SEOToolkit from "./pages/SEOToolkit";
import { useAuth } from "./hooks/useAuth";
import GenerateTemplate from "./pages/Template";
import { ImageGenerator } from "./pages/ImageGeneration";

function AppContent() {
  const { loading: authLoading } = useAuth();
  const [showLoading, setShowLoading] = useState(true); // control loading screen
  const location = useLocation();

  // Increase loading screen time
  useEffect(() => {
    if (!authLoading) {
      const timer = setTimeout(() => setShowLoading(false), 2000); // 2000ms = 2s extra
      return () => clearTimeout(timer);
    }
  }, [authLoading]);

  if (authLoading || showLoading) {
    return <LoadingScreen />;
  }

  const noSidebarRoutes = ["/", "/login", "/signup"];
  const hideSidebar = noSidebarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header />

      <div className="flex flex-1">
        {!hideSidebar && <Sidebar />}
        <div className="flex flex-col flex-1">
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
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
                    <ImageGenerator />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </div>

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
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}