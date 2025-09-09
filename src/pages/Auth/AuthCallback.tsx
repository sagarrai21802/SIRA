// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth';
// import { supabase } from '../../lib/supabaseClient';

// export function AuthCallback() {
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   useEffect(() => {
//     const handleAuthCallback = async () => {
//       // Clear any existing session to ensure user needs to log in
//       await supabase.auth.signOut();
      
//       navigate('/login', { 
//         replace: true,
//         state: { message: 'Email confirmed! Please log in with your credentials.' } 
//       });
//     };

//     handleAuthCallback();
//   }, [navigate, user]);

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//     </div>
//   );
// }

// New AuthCallback component that handles website scraping and profile auto-filling
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { scrapeWebsite } from '../../lib/scraper';
import { generateWithGemini } from '../../lib/gemini';
import toast from 'react-hot-toast';

export function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // When the user is redirected from the email confirmation link,
        // there should be a session.
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          const userId = session.user.id;

          // Get website_url from the user's metadata
          const websiteUrl = session.user.user_metadata?.website_url;

          // If the user has a website URL, scrape it and generate a brand snapshot
          if (websiteUrl) {
            toast.loading('Analyzing your website to build your brand snapshot...', { duration: 5000 });

            const scrapedText = await scrapeWebsite(websiteUrl);

            const brandSnapshot = await generateWithGemini({
              prompt: `Based on the following text from a company's website, create a concise "brand snapshot". This snapshot should be a short paragraph that captures the brand's essence, target audience, and key offerings. This will be used to auto-fill their profile and generate social media content. Website content: "${scrapedText}"`, contentType: 'social-media',
              tone: 'professional',
            });

            // Preserve existing metadata and add the new brand snapshot
            const { error: updateError } = await supabase.auth.updateUser({
              data: { ...session.user.user_metadata, brand_snapshot: brandSnapshot }
            });

            if (updateError) {
              throw new Error(`Failed to update profile: ${updateError.message}`);
            }
            toast.success('Your brand snapshot has been created!');
          }
        }
      } catch (error: any) {
        toast.error(error.message || 'An error occurred during profile setup.');
      } finally {
        // Clear any existing session to ensure user needs to log in
        await supabase.auth.signOut();
        
        // Redirect to login page
        navigate('/login', { 
          replace: true,
          state: { message: 'Email confirmed! Please log in with your credentials.' } 
        });
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
          Finalizing your account setup...
        </p>
      </div>
    </div>
  );
}
