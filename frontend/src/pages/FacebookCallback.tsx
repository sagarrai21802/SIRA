import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_BASE, API_ENDPOINTS } from "../lib/api";

export default function FacebookCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const storedRedirect = (import.meta as any).env?.VITE_FACEBOOK_REDIRECT_URI || `${window.location.origin}/facebook-callback`;

    if (!code) {
      toast.error("Facebook authentication failed.");
      navigate("/profile");
      return;
    }

    const doExchange = async () => {
      try {
        toast.loading("Connecting Facebook...", { id: "fb-connect" });
        const token = localStorage.getItem('auth_token');
        if (!token) {
          try { localStorage.setItem('fb_pending_code', code); } catch {}
          toast.error('Please log in to connect Facebook', { id: 'fb-connect' });
          navigate('/login', { state: { message: 'Log in to connect Facebook, we will finish connecting automatically.' } });
          return;
        }
        const resp = await fetch(`${API_BASE}${API_ENDPOINTS.FACEBOOK_EXCHANGE_CODE}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ code, redirect_uri: storedRedirect })
        });
        const data = await resp.json().catch(() => ({}));
        if (!resp.ok) {
          throw new Error((data as any).error || 'Failed to connect Facebook');
        }
        toast.success("Facebook connected!", { id: "fb-connect" });

        // Auto-resume pending post if present
        try {
          const pendingRaw = localStorage.getItem('fb_pending_post');
          if (pendingRaw) {
            const pending = JSON.parse(pendingRaw);
            if (pending?.content) {
              toast.loading('Posting to Facebook...', { id: 'fb-post' });
              const postResp = await fetch(`${API_BASE}${API_ENDPOINTS.FACEBOOK_POST}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ content: pending.content, image_urls: pending.image_urls || [] })
              });
              const postData = await postResp.json().catch(() => ({}));
              if (!postResp.ok) {
                throw new Error((postData as any).error || 'Failed to post to Facebook');
              }
              toast.success('Posted to Facebook successfully!', { id: 'fb-post' });
            }
            localStorage.removeItem('fb_pending_post');
          }
        } catch (e: any) {
          toast.error(e?.message || 'Failed to auto-post to Facebook', { id: 'fb-post' });
        }

        navigate("/facebookpostgenerator");
      } catch (err: any) {
        toast.error(err?.message || "Failed to link Facebook", { id: "fb-connect" });
        navigate("/profile");
      }
    };

    doExchange();
  }, [navigate]);

  return <div>Loading...</div>;
}


