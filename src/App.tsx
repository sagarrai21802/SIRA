
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Header } from "./components/Layout/Header";
import { Footer } from "./components/Layout/Footer";
import { Sidebar } from "./components/Layout/Sidebar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoadingScreen } from "./components/LoadingScreen";
import { ProfileGuard } from "./components/ProfileGuard";
import { ThemeProvider } from "./components/Theme/ThemeProvider";
import { LayoutProvider } from "./components/Layout/LayoutContext";
import { Home } from "./pages/Home";
import Login from "./pages/Auth/Login";
import { Signup } from "./pages/Auth/Signup";
import Profile from "./pages/Profile";
import { Dashboard } from "./pages/Dashboard";
import { ContentGenerator } from "./pages/ContentGenerator";
import SEOToolkit from "./pages/SEOToolkit";
import { useAuth, AuthProvider } from "./hooks/useAuth";
import { useLayout } from "./components/Layout/LayoutContext";
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
import { ProfilePersonalization } from "./pages/Auth/ProfilePersonalization";
import LinkedInCallback from "./pages/LinkdinCallback";
import { Analytics } from "./pages/Analytics";
import { NewProject } from "./pages/NewProject";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import Press from "./pages/Press";
import Partners from "./pages/Partners";
import Help from "./pages/Help";
import Docs from "./pages/Docs";
import Tutorials from "./pages/Tutorials";
import API from "./pages/API";
import Status from "./pages/Status";
import Changelog from "./pages/Changelog";
import Cookies from "./pages/Cookies";
import GDPR from "./pages/GDPR";
import Security from "./pages/Security";
import Compliance from "./pages/Compliance";

function AppContent() {
  const { loading: authLoading } = useAuth();
  const { isCollapsed, setIsCollapsed } = useLayout();
  const [showLoading, setShowLoading] = useState(true);

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
      <Header onToggleSidebar={() => setIsCollapsed(!isCollapsed)} />

      <div className="flex flex-1">
        {/* ✅ Fixed Sidebar */}
        {!hideSidebar && !isCollapsed && <Sidebar />}

        {/* ✅ Main content shifted by ml-72 when sidebar is visible */}
        <div className={`flex flex-col flex-1 transition-all duration-300 ${!hideSidebar && !isCollapsed ? "ml-72" : isCollapsed ? "ml-16" : ""}`}>
          <main className="flex-1 p-6">
            <ProfileGuard>
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/personalization" element={<ProtectedRoute><ProfilePersonalization /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/linkedin-callback" element={<LinkedInCallback />} />
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
              <Route path="/instagrampostgenerator" element={<ProtectedRoute><InstagramPostGenerator /></ProtectedRoute>} />
              <Route path="/seo/metatags" element={<ProtectedRoute><MetaTags/></ProtectedRoute>} />
              <Route path="/seo/keyword" element={<ProtectedRoute><KeywordGenerator /></ProtectedRoute>} />
              <Route path="/seo/schemagenerator" element={<ProtectedRoute><SchemaGenerator /></ProtectedRoute>} />

              {/* Add the Scheduler route */}
              <Route path="/scheduler" element={<ProtectedRoute><Scheduler /></ProtectedRoute>} />
              {/* Add the Analytics route */}
              <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
              {/* Add the New Project route */}
              <Route path="/new-project" element={<ProtectedRoute><NewProject /></ProtectedRoute>} />
              {/* Footer routes */}
              <Route path="/content-generator" element={<ProtectedRoute><ContentGenerator /></ProtectedRoute>} />
              <Route path="/image-generation" element={<ProtectedRoute><ImageGenerator /></ProtectedRoute>} />
              <Route path="/seo-toolkit" element={<ProtectedRoute><SEOToolkit /></ProtectedRoute>} />
              <Route path="/careers" element={<ProtectedRoute><Careers /></ProtectedRoute>} />
              <Route path="/blog" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
              <Route path="/press" element={<ProtectedRoute><Press /></ProtectedRoute>} />
              <Route path="/partners" element={<ProtectedRoute><Partners /></ProtectedRoute>} />
              <Route path="/help" element={<ProtectedRoute><Help /></ProtectedRoute>} />
              <Route path="/docs" element={<ProtectedRoute><Docs /></ProtectedRoute>} />
              <Route path="/tutorials" element={<ProtectedRoute><Tutorials /></ProtectedRoute>} />
              <Route path="/api" element={<ProtectedRoute><API /></ProtectedRoute>} />
              <Route path="/status" element={<ProtectedRoute><Status /></ProtectedRoute>} />
              <Route path="/changelog" element={<ProtectedRoute><Changelog /></ProtectedRoute>} />
              <Route path="/cookies" element={<ProtectedRoute><Cookies /></ProtectedRoute>} />
              <Route path="/gdpr" element={<ProtectedRoute><GDPR /></ProtectedRoute>} />
              <Route path="/security" element={<ProtectedRoute><Security /></ProtectedRoute>} />
              <Route path="/compliance" element={<ProtectedRoute><Compliance /></ProtectedRoute>} />
              </Routes>
            </ProfileGuard>
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
    <ThemeProvider>
      <AuthProvider>
        <LayoutProvider>
          <Router>
            <AppContent />
          </Router>
        </LayoutProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
