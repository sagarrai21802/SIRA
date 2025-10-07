// src/components/LinkedInCallback.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_BASE, API_ENDPOINTS } from "../lib/api";
import { useAuth } from "../hooks/useAuth";

export default function LinkedInCallback() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const storedRedirect = import.meta.env.VITE_LINKEDIN_REDIRECT_URI || `${window.location.origin}/linkedin-callback`;

    if (!code) {
      toast.error("LinkedIn authentication failed.");
      navigate("/profile");
      return;
    }

    const doExchange = async () => {
      try {
        toast.loading("Connecting LinkedIn...", { id: "li-connect" });
        const token = localStorage.getItem('auth_token');
        if (!token) {
          try {
            // Store code to resume after login
            localStorage.setItem('li_pending_code', code);
          } catch {}
          toast.error('Please log in to connect LinkedIn', { id: 'li-connect' });
          navigate('/login', { state: { message: 'Log in to connect LinkedIn, we will finish connecting automatically.' } });
          return;
        }
        const resp = await fetch(`${API_BASE}${API_ENDPOINTS.LINKEDIN_EXCHANGE_CODE}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          },
          body: JSON.stringify({ code, redirect_uri: storedRedirect })
        });
        const data = await resp.json();
        if (!resp.ok) {
          throw new Error(data.error || 'Failed to connect LinkedIn');
        }
        toast.success("LinkedIn profile linked successfully!", { id: "li-connect" });

        // Auto-resume pending post if present
        try {
          const pendingRaw = localStorage.getItem('li_pending_post');
          if (pendingRaw) {
            const pending = JSON.parse(pendingRaw);
            if (pending?.content) {
              toast.loading('Posting to LinkedIn...', { id: 'li-post' });
              const postResp = await fetch(`${API_BASE}${API_ENDPOINTS.LINKEDIN_POST}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ content: pending.content, image_url: pending.image_url || null })
              });
              const postData = await postResp.json();
              if (!postResp.ok) {
                throw new Error(postData.error || 'Failed to post to LinkedIn');
              }
              toast.success('Posted to LinkedIn successfully!', { id: 'li-post' });
            }
            localStorage.removeItem('li_pending_post');
          }
        } catch (e: any) {
          toast.error(e?.message || 'Failed to auto-post to LinkedIn', { id: 'li-post' });
        }

        navigate("/linkedinpostgenerator");
      } catch (err: any) {
        toast.error(err.message || "Failed to link LinkedIn", { id: "li-connect" });
        navigate("/profile");
      }
    };

    doExchange();
  }, [navigate]);

  return <div>Loading...</div>;
}