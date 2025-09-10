// import { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import { Header } from "./components/Layout/Header";
// import { Footer } from "./components/Layout/Footer";
// import { Sidebar } from "./components/Layout/Sidebar";
// import { ProtectedRoute } from "./components/ProtectedRoute";
// import { LoadingScreen } from "./components/LoadingScreen";
// import { Home } from "./pages/Home";
// import Login from "./pages/Auth/Login"; 
// import { Signup } from "./pages/Auth/Signup";
// import Profile from "./pages/Profile";
// import { Dashboard } from "./pages/Dashboard";
// import { ContentGenerator } from "./pages/ContentGenerator";
// import SEOToolkit from "./pages/SEOToolkit";
// import { useAuth, AuthProvider } from "./hooks/useAuth"; 
// import GenerateTemplate from "./pages/Template";
// import { ImageGenerator } from "./pages/ImageGeneration";
// import Pricing from "./pages/Pricing";
// import About from "./pages/About";
// import ContactUs from "./pages/Contact";
// import Terms from "./pages/Terms";
// import Privacy from "./pages/Privacy";
// import AdGenerator from "./pages/Ad";
// import Settings from "./pages/Settings";
// import { AuthCallback } from "./pages/Auth/AuthCallback";
// import { Humanizer } from "./pages/Humanizer";
// import PromptGenerator from "./pages/Promptgenerator";

// function AppContent() {
//   const { loading: authLoading } = useAuth();
//   const [showLoading, setShowLoading] = useState(true);
//   const location = useLocation();

//   useEffect(() => {
//     if (!authLoading) {
//       // Decreased loading animation time from 2000ms to 1000ms
//       const timer = setTimeout(() => setShowLoading(false), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [authLoading]);

//   if (authLoading || showLoading) {
//     return <LoadingScreen />;
//   }

//   const noSidebarRoutes = ["/", "/login", "/signup"];
//   const hideSidebar = noSidebarRoutes.includes(location.pathname);

//   return (
//     <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
//       <Header />
//       <div className="flex flex-1">
//         {!hideSidebar && <Sidebar />}
//         <div className="flex flex-col flex-1">
//           <main className="flex-1 p-6">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/signup" element={<Signup />} />
//               <Route path="/auth/callback" element={<AuthCallback />} />
//               <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
//               <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//               <Route path="/content" element={<ProtectedRoute><ContentGenerator /></ProtectedRoute>} />
//               <Route path="/seo" element={<ProtectedRoute><SEOToolkit /></ProtectedRoute>} />
//               <Route path="/template" element={<ProtectedRoute><GenerateTemplate /></ProtectedRoute>} />
//               <Route path="/images" element={<ProtectedRoute><ImageGenerator /></ProtectedRoute>} />
//               <Route path="/ads" element={<ProtectedRoute><AdGenerator /></ProtectedRoute>} />
//               <Route path="/humanizer" element={<ProtectedRoute><Humanizer /></ProtectedRoute>} />
//               <Route path="/promptgenerator" element={<ProtectedRoute><PromptGenerator /></ProtectedRoute>} />
//               <Route path="/pricing" element={<ProtectedRoute><Pricing /></ProtectedRoute>} />
//               <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
//               <Route path="/terms" element={<ProtectedRoute><Terms /></ProtectedRoute>} />
//               <Route path="/contact" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
//               <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
//               <Route path="/privacy" element={<ProtectedRoute><Privacy /></ProtectedRoute>} />
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
//     <AuthProvider> 
//       <Router>
//         <AppContent />
//       </Router>
//     </AuthProvider>
//   );
// }


import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Header } from "./components/Layout/Header";
import { Footer } from "./components/Layout/Footer";
import { Sidebar } from "./components/Layout/Sidebar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoadingScreen } from "./components/LoadingScreen";
import { Home } from "./pages/Home";
import Login from "./pages/Auth/Login";
import { Signup } from "./pages/Auth/Signup";
import Profile from "./pages/Profile";
import { Dashboard } from "./pages/Dashboard";
import { ContentGenerator } from "./pages/ContentGenerator";
import SEOToolkit from "./pages/SEOToolkit";
import { useAuth, AuthProvider } from "./hooks/useAuth";
import GenerateTemplate from "./pages/Template";
import { ImageGenerator } from "./pages/ImageGeneration";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import ContactUs from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import AdGenerator from "./pages/Ad";
import Settings from "./pages/Settings";
import { AuthCallback } from "./pages/Auth/AuthCallback";
import { Humanizer } from "./pages/Humanizer";
import PromptGenerator from "./pages/Promptgenerator";
import { Scheduler } from "./pages/Scheduler"; // Import the Scheduler component
import InstagramPostGenerator from "./pages/InstagramPostGenerator";
import FacebookPostGenerator from "./pages/facebookPostGenerator";
import LinkedInPostGenerator from "./pages/LinkedinPostGenerator";
import MetaTags from "./pages/MetaTags";
import KeywordGenerator from "./pages/Keyword";
import SchemaGenerator from "./pages/SchemaGenerator";

function AppContent() {
  const { loading: authLoading } = useAuth();
  const [showLoading, setShowLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true); 

  const location = useLocation();
  const noSidebarRoutes = ["/", "/login", "/signup"];
  const hideSidebar = noSidebarRoutes.includes(location.pathname);

  useEffect(() => {
    if (!authLoading) {
      const timer = setTimeout(() => setShowLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [authLoading]);

  if (authLoading || showLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      {/* ✅ Header receives toggle prop */}
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1">
        {/* ✅ Fixed Sidebar */}
        {!hideSidebar && sidebarOpen && <Sidebar />}

        {/* ✅ Main content shifted by ml-64 when sidebar is visible */}
        <div className={`flex flex-col flex-1 transition-all duration-300 ${!hideSidebar && sidebarOpen ? "ml-64" : ""}`}>
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/content" element={<ProtectedRoute><ContentGenerator /></ProtectedRoute>} />
              {/* <Route path="/metatags" element={<ProtectedRoute><SEOToolkit /></ProtectedRoute>} /> */}
              <Route path="/template" element={<ProtectedRoute><GenerateTemplate /></ProtectedRoute>} />
              <Route path="/images" element={<ProtectedRoute><ImageGenerator /></ProtectedRoute>} />
              <Route path="/ads" element={<ProtectedRoute><AdGenerator /></ProtectedRoute>} />
              <Route path="/humanizer" element={<ProtectedRoute><Humanizer /></ProtectedRoute>} />
              <Route path="/promptgenerator" element={<ProtectedRoute><PromptGenerator /></ProtectedRoute>} />
              <Route path="/pricing" element={<ProtectedRoute><Pricing /></ProtectedRoute>} />
              <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
              <Route path="/terms" element={<ProtectedRoute><Terms /></ProtectedRoute>} />
              <Route path="/contact" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/privacy" element={<ProtectedRoute><Privacy /></ProtectedRoute>} />
              <Route path="/linkedinpostgenerator" element={<ProtectedRoute><LinkedInPostGenerator /></ProtectedRoute>} />
              <Route path="/facebookpostgenerator" element={<ProtectedRoute><FacebookPostGenerator /></ProtectedRoute>} />
              <Route path="/instagrampotgenerator" element={<ProtectedRoute><InstagramPostGenerator /></ProtectedRoute>} />
              <Route path="/seo/metatags" element={<ProtectedRoute><MetaTags/></ProtectedRoute>} />
              <Route path="/seo/keyword" element={<ProtectedRoute><KeywordGenerator /></ProtectedRoute>} />
              <Route path="/seo/schemagenerator" element={<ProtectedRoute><SchemaGenerator /></ProtectedRoute>} />

              {/* Add the Scheduler route */}
              <Route path="/scheduler" element={<ProtectedRoute><Scheduler /></ProtectedRoute>} />
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
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
