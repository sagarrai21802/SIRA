# Login Fix Instructions

## Problem
Your backend is working perfectly, but the frontend needs to be configured to connect to it.

## Solution - Choose One Option:

### Option A: Use Local Backend (For Development)

1. **Create `.env` file** in the root directory (`/Users/apple/SIRA/.env`):
   ```bash
   VITE_API_BASE=http://localhost:4000
   ```

2. **Make sure your backend server is running**:
   ```bash
   cd server
   npm start
   ```
   You should see: "Server running at http://localhost:4000" and "Connected to MongoDB via Mongoose"

3. **Restart your frontend dev server**:
   ```bash
   # Stop current server (Ctrl+C), then:
   npm run dev
   ```

4. **Clear browser cache or use Incognito mode**

5. **Try logging in** with: `ayushinamdev@gmail.com` (your test user that worked in the logs)

---

### Option B: Use Production Backend (Render)

1. **Create `.env` file** in the root directory:
   ```bash
   VITE_API_BASE=https://sira-msb1.onrender.com
   ```

2. **Restart your frontend dev server**:
   ```bash
   npm run dev
   ```

3. **Verify your Render backend is deployed and running**:
   - Visit: https://sira-msb1.onrender.com/health
   - Should return: `{"ok":true}`

4. **Make sure Render has these environment variables set**:
   - `MONGODB_URI`
   - `JWT_SECRET`


---

## Verification Steps

1. **Check backend health**:
   ```bash
   # For local:
   curl http://localhost:4000/health
   
   # For production:
   curl https://sira-msb1.onrender.com/health
   ```
   Both should return: `{"ok":true}`

2. **Check CORS headers**:
   ```bash
   curl -X OPTIONS http://localhost:4000/api/auth/login \
     -H "Origin: http://localhost:5173" \
     -H "Access-Control-Request-Method: POST" \
     -i
   ```

3. **Open browser console** and check:
   - Network tab should show requests to your API_BASE
   - No CORS errors
   - Login request should get a response (even if credentials are wrong)

---

## For Production Deployment

When deploying to Vercel, make sure to set the environment variable:

**Vercel Dashboard → Your Project → Settings → Environment Variables**
```
VITE_API_BASE=https://sira-msb1.onrender.com
```

Then redeploy your frontend.

---

## Backend Server Logs Show Success

Your server logs show a successful login:
```
Login attempt for email: ayushinamdev@gmail.com
User found: 9b78aebd-59e6-4ceb-9151-7238066e941c
Password valid for user: 9b78aebd-59e6-4ceb-9151-7238066e941c
Login successful for user: 9b78aebd-59e6-4ceb-9151-7238066e941c
```

This means your backend is working correctly! 🎉

The issue is just the frontend configuration.

