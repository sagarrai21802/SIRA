// Centralized API configuration
const inferDefaultApiBase = () => {
  // Prefer localhost server in dev if env not provided
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
      return 'http://localhost:4000';
    }
  }
  // Fallback to production API
  return 'https://sira-msb1.onrender.com';
};

export const API_BASE = (import.meta.env.VITE_API_BASE && String(import.meta.env.VITE_API_BASE).trim()) || inferDefaultApiBase();

// Helper function to get full API URL
export const getApiUrl = (endpoint: string) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE}/${cleanEndpoint}`;
};

// Common API endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  ME: '/api/auth/me',
  SET_PASSWORD: '/api/auth/set-password',
  
  // Users & Profiles
  USERS_UPSERT: '/api/users/upsert',
  PROFILES_UPSERT: '/api/profiles/upsert',
  PROFILES_GET: (id: string) => `/api/profiles/${id}`,
  
  // Content
  CONTENT_GENERATIONS: '/api/content-generations',
  CONTENT_GENERATIONS_GET: (id: string) => `/api/content-generations/${id}`,
  
  // Templates
  TEMPLATE_GENERATIONS: '/api/template-generations',
  TEMPLATE_DAILY_COUNT: '/api/template-generations/daily-count',
  
  // Scheduled Posts
  SCHEDULED_POSTS: '/api/scheduled-posts',
  SCHEDULED_POSTS_GET: (id: string) => `/api/scheduled-posts/${id}`,
  
  // Images
  IMAGE_GENERATIONS: '/api/image-generations',
  IMAGE_GENERATIONS_GET: (id: string) => `/api/image-generations/${id}`,
  GENERATE_IMAGE: '/api/generate-image',
  EDIT_IMAGE: '/api/edit-image',
  ENHANCE_IMAGE_PROMPT: '/api/enhance-image-prompt',
  UPLOAD_PROFILE_PICTURE: '/api/upload-profile-picture',
  
  // Humanizer
  HUMANIZE_CREDITS: '/api/humanize/credits',
  HUMANIZE_SUBMIT: '/api/humanize/submit',
  HUMANIZE_DOCUMENT: '/api/humanize/document',
  
  // LinkedIn
  LINKEDIN_EXCHANGE_CODE: '/api/linkedin/exchange-code',
  LINKEDIN_STATUS: '/api/linkedin/status',
  LINKEDIN_POST: '/api/linkedin/post',
  
  // Other
  FEEDBACK: '/api/feedback',
  STATS_COUNTS: '/api/stats/counts',
  HEALTH: '/health',

  // Complaints
  DELETION_COMPLAINTS: '/api/deletion-complaints'
} as const;

export type DeletionComplaintPayload = {
  name: string;
  email: string;
  content_url?: string | null;
  content_type: 'text' | 'image' | 'post' | 'other';
  reason: 'inaccurate' | 'harmful' | 'copyright' | 'privacy' | 'other';
  details: string;
};

export async function submitDeletionComplaint(payload: DeletionComplaintPayload) {
  const resp = await fetch(getApiUrl(API_ENDPOINTS.DELETION_COMPLAINTS), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) {
    throw new Error(data?.error || 'Failed to submit complaint');
  }
  return data;
}
