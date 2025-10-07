// Centralized API configuration
export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

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
  UPLOAD_PROFILE_PICTURE: '/api/upload-profile-picture',
  
  // Humanizer
  HUMANIZE_CREDITS: '/api/humanize/credits',
  HUMANIZE_SUBMIT: '/api/humanize/submit',
  HUMANIZE_DOCUMENT: '/api/humanize/document',
  
  // Other
  FEEDBACK: '/api/feedback',
  STATS_COUNTS: '/api/stats/counts',
  HEALTH: '/health'
} as const;
