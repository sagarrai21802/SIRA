# Deployment Guide for Vercel

## Issue Fixed
The login issue on Vercel was caused by hardcoded `http://localhost:4000` URLs in the frontend code. This has been fixed by:

1. **Centralized API Configuration**: Created `src/lib/api.ts` with environment-based API URLs
2. **Updated All API Calls**: Replaced all hardcoded localhost URLs with `import.meta.env.VITE_API_BASE || 'http://localhost:4000'`
3. **Enhanced CORS Configuration**: Updated server CORS to allow Vercel domains
4. **Vercel Configuration**: Added `vercel.json` for proper deployment setup

## Environment Variables Required

### Frontend (Vercel Environment Variables)
Set these in your Vercel project settings:

```
VITE_API_BASE=https://your-app-name.vercel.app
VITE_GEMINI_API_KEY=your-gemini-api-key
VITE_MONGODB_URI=your-mongodb-connection-string
VITE_MONGODB_DB_NAME=your-database-name
VITE_REALM_APP_ID=your-realm-app-id
```

### Backend (Server Environment Variables)
Set these in your Vercel project settings for the API routes:

```
MONGODB_URI=your-mongodb-connection-string
MONGODB_DB_NAME=your-database-name
JWT_SECRET=your-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
VITE_GEMINI_API_KEY=your-gemini-api-key
UNDETECTABLE_API_KEY=your-undetectable-api-key
FRONTEND_URL=https://your-app-name.vercel.app
```

## Deployment Steps

1. **Deploy to Vercel**:
   ```bash
   # Install Vercel CLI if not already installed
   npm i -g vercel
   
   # Deploy
   vercel
   ```

2. **Set Environment Variables**:
   - Go to your Vercel project dashboard
   - Navigate to Settings > Environment Variables
   - Add all the required variables listed above

3. **Redeploy**:
   - After setting environment variables, trigger a new deployment
   - Or run `vercel --prod` to deploy to production

## Files Modified

- `src/lib/api.ts` - New centralized API configuration
- `src/hooks/useAuth.tsx` - Updated to use environment variable
- `src/pages/ContentGenerator.tsx` - Updated API calls
- `src/pages/Auth/Login.tsx` - Updated API calls
- `src/utils/uploadImage.ts` - Updated API calls
- All scheduler components - Updated API calls
- All other pages with API calls - Updated to use environment variable
- `server/index.js` - Enhanced CORS configuration
- `vercel.json` - Added Vercel deployment configuration
- `package.json` - Added vercel-build script

## Testing

After deployment:
1. Check that the frontend loads correctly
2. Test login functionality
3. Verify API calls are working (check browser network tab)
4. Test other features that make API calls

## Troubleshooting

If you still see CORS errors:
1. Check that `VITE_API_BASE` is set correctly in Vercel
2. Verify the API URL is accessible
3. Check browser console for any remaining hardcoded URLs
4. Ensure CORS configuration includes your Vercel domain
