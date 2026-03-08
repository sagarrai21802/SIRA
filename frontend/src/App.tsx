import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Header } from "./components/Layout/Header";
import { Sidebar } from "./components/Layout/Sidebar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ProfileGuard } from "./components/ProfileGuard";
import { ThemeProvider } from "./components/Theme/ThemeProvider";
import { LayoutProvider } from "./components/Layout/LayoutContext";
import { Home } from "./pages/Home";
import Login from "./pages/Auth/Login";
import { Signup } from "./pages/Auth/Signup";
import { Dashboard } from "./pages/Dashboard";
import { useAuth, AuthProvider } from "./hooks/useAuth";
import { useLayout } from "./components/Layout/LayoutContext";
import GenerateTemplate from "./pages/Template";

import Pricing from "./pages/Pricing";
import About from "./pages/About";
import ContactUs from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import { AuthCallback } from "./pages/Auth/AuthCallback";
import { Scheduler } from "./pages/Scheduler"; // Import the Scheduler component
import InstagramPostGenerator from "./pages/InstagramPostGenerator";
import FacebookPostGenerator from "./pages/facebookPostGenerator";
import LinkedInPostGenerator from "./pages/LinkedinPostGenerator";
import { ProfilePersonalization } from "./pages/Auth/ProfilePersonalization";
import LinkedInCallback from "./pages/LinkdinCallback";
import InstagramCallback from "./pages/InstagramCallback";
import FacebookCallback from "./pages/FacebookCallback";
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
import ComplaintDeletion from "./pages/ComplaintDeletion";
import DataDeletion from "./pages/DataDeletion";

function AppContent() {
  const { loading: authLoading } = useAuth();
  const { isCollapsed, setIsCollapsed } = useLayout();

  const location = useLocation();
  const noSidebarRoutes = ["/", "/login", "/signup", "/complaint-deletion"];
  const hideSidebar = noSidebarRoutes.includes(location.pathname);



  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      {/* ✅ Header receives toggle prop */}
      <Header onToggleSidebar={() => setIsCollapsed(!isCollapsed)} />

      <div className="flex flex-1">
        {/* ✅ Fixed Sidebar */}
        {!hideSidebar && !isCollapsed && <Sidebar />}

        {/* ✅ Main content shifted by responsive margin when sidebar is visible */}
        <div className={`flex flex-col flex-1 transition-all duration-300 ${!hideSidebar && !isCollapsed ? "ml-56 sm:ml-64 md:ml-72" : isCollapsed ? "ml-8" : ""}`}>
          <main className={`flex-1 ${isCollapsed ? 'py-4' : 'p-6'}`}>
            <ProfileGuard>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/personalization" element={<ProtectedRoute><ProfilePersonalization /></ProtectedRoute>} />
                <Route path="/linkedin-callback" element={<LinkedInCallback />} />
                <Route path="/instagram-callback" element={<InstagramCallback />} />
                <Route path="/facebook-callback" element={<FacebookCallback />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                {/* <Route path="/metatags" element={<ProtectedRoute><SEOToolkit /></ProtectedRoute>} /> */}
                <Route path="/template" element={<ProtectedRoute><GenerateTemplate /></ProtectedRoute>} />
                <Route path="/pricing" element={<ProtectedRoute><Pricing /></ProtectedRoute>} />
                <Route path="/about" element={<About />} />
                <Route path="/terms" element={<ProtectedRoute><Terms /></ProtectedRoute>} />
                <Route path="/contact" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/linkedinpostgenerator" element={<ProtectedRoute><LinkedInPostGenerator /></ProtectedRoute>} />
                <Route path="/facebookpostgenerator" element={<ProtectedRoute><FacebookPostGenerator /></ProtectedRoute>} />
                <Route path="/instagrampostgenerator" element={<ProtectedRoute><InstagramPostGenerator /></ProtectedRoute>} />

                {/* Add the Scheduler route */}
                <Route path="/scheduler" element={<ProtectedRoute><Scheduler /></ProtectedRoute>} />
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
                {/* Public complaints/deletion page */}
                <Route path="/complaint-deletion" element={<ComplaintDeletion />} />
                <Route path="/datadeletion" element={<DataDeletion />} />
              </Routes>
            </ProfileGuard>
          </main>
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
