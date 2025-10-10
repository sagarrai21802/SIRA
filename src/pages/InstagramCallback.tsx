import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_BASE, API_ENDPOINTS } from "../lib/api";

export default function InstagramCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const storedRedirect = (import.meta as any).env?.VITE_INSTAGRAM_REDIRECT_URI || `${window.location.origin}/instagram-callback`;

    if (!code) {
      toast.error("Instagram authentication failed.");
      navigate("/profile");
      return;
    }

    const doExchange = async () => {
      try {
        toast.loading("Connecting Instagram...", { id: "ig-connect" });
        const token = localStorage.getItem('auth_token');
        if (!token) {
          try { localStorage.setItem('ig_pending_code', code); } catch {}
          toast.error('Please log in to connect Instagram', { id: 'ig-connect' });
          navigate('/login', { state: { message: 'Log in to connect Instagram, we will finish connecting automatically.' } });
          return;
        }
        const resp = await fetch(`${API_BASE}${API_ENDPOINTS.INSTAGRAM_EXCHANGE_CODE}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ code, redirect_uri: storedRedirect })
        });
        const data = await resp.json().catch(() => ({}));
        if (!resp.ok) {
          throw new Error((data as any).error || 'Failed to connect Instagram');
        }
        toast.success("Instagram connected!", { id: "ig-connect" });

        // Auto-resume pending post if present
        try {
          const pendingRaw = localStorage.getItem('ig_pending_post');
          if (pendingRaw) {
            const pending = JSON.parse(pendingRaw);
            if (pending?.content) {
              toast.loading('Posting to Instagram...', { id: 'ig-post' });
              const postResp = await fetch(`${API_BASE}${API_ENDPOINTS.INSTAGRAM_POST}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ content: pending.content, image_urls: pending.image_urls || [] })
              });
              const postData = await postResp.json().catch(() => ({}));
              if (!postResp.ok) {
                throw new Error((postData as any).error || 'Failed to post to Instagram');
              }
              toast.success('Posted to Instagram successfully!', { id: 'ig-post' });
            }
            localStorage.removeItem('ig_pending_post');
          }
        } catch (e: any) {
          toast.error(e?.message || 'Failed to auto-post to Instagram', { id: 'ig-post' });
        }

        navigate("/instagrampostgenerator");
      } catch (err: any) {
        toast.error(err?.message || "Failed to link Instagram", { id: "ig-connect" });
        navigate("/profile");
      }
    };

    doExchange();
  }, [navigate]);

  return <div>Loading...</div>;
}


