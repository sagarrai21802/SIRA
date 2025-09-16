// src/components/LinkedInCallback.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LinkedInCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      // Send this authorization code to your backend (or a Make.com webhook)
      // to exchange it for an access token.
      // This is a simplified example. In a real app, you'd use a serverless function.
      toast.success("LinkedIn connected! Processing...");

      // Use a Make.com webhook to handle the token exchange
      fetch(`https://hook.us2.make.com/YOUR_MAKE_WEBHOOK_ID?code=${code}`)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Save token in Supabase or handle success
            toast.success("LinkedIn profile linked successfully!");
          } else {
            toast.error("Failed to link LinkedIn.");
          }
          navigate("/profile");
        })
        .catch(error => {
          toast.error("An error occurred.");
          navigate("/profile");
        });

    } else {
      toast.error("LinkedIn authentication failed.");
      navigate("/profile");
    }
  }, [navigate]);

  return <div>Loading...</div>;
}