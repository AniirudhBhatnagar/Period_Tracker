# Deployment Steps - Execute Manually

## Prerequisites
- GitHub repository connected
- Render account (free tier available)
- Vercel account (free tier available)
- Environment variables ready

---

## STEP 1: Deploy Backend to Render

### 1.1 Create Render Web Service
1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the repository

### 2.2 Configure Render Settings
- **Name**: `period-tracker-backend`
- **Region**: Choose closest to users
- **Branch**: `main` (or your default branch)
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 1.3 Set Environment Variables in Render
Click "Environment" tab and add:

**REQUIRED:**
```
GEMINI_API_KEY=your_actual_gemini_api_key
JWT_SECRET=your_strong_random_jwt_secret_min_32_chars
SESSION_SECRET=your_strong_random_session_secret_min_32_chars
NODE_ENV=production
```

**OPTIONAL (set after frontend deployment):**
```
CLIENT_URL=https://your-frontend-url.vercel.app
MONGO_URI=mongodb+srv://your_mongo_connection_string
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
```

### 1.4 Deploy
1. Click "Create Web Service"
2. Wait for deployment (2-5 minutes)
3. **COPY THE RENDER URL** (e.g., `https://period-tracker-backend.onrender.com`)

### 1.5 Verify Backend
Test: `https://your-render-url.onrender.com/api/affirmation?day=1&cycleLength=28`
Should return JSON with affirmation.

---

## STEP 2: Deploy Frontend to Vercel

### 2.1 Create Vercel Project
1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Select the repository

### 2.2 Configure Vercel Settings
- **Framework Preset**: `Create React App`
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install` (auto-detected)

### 2.3 Set Environment Variables in Vercel
Click "Environment Variables" and add:

**REQUIRED:**
```
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```

**OPTIONAL:**
```
REACT_APP_API_URL=
```
(Leave empty for relative URLs with rewrites)

### 2.4 Deploy
1. Click "Deploy"
2. Wait for deployment (2-5 minutes)
3. **COPY THE VERCEL URL** (e.g., `https://period-tracker.vercel.app`)

---

## STEP 3: Configure Vercel Rewrite

### 3.1 Add Rewrite Rule
1. In Vercel Dashboard → Your Project → Settings
2. Go to "Functions & Routing" → "Rewrites"
3. Click "Add Rewrite"
4. Configure:
   - **Source**: `/api/(.*)`
   - **Destination**: `https://your-render-url.onrender.com/api/$1`
   - Replace `your-render-url.onrender.com` with your actual Render URL
5. Click "Save"

### 3.2 Redeploy Frontend
- Vercel will auto-redeploy after rewrite configuration
- Or manually trigger redeploy from "Deployments" tab

---

## STEP 4: Update Backend CLIENT_URL

### 4.1 Update Render Environment Variable
1. Go to Render Dashboard → Your Backend Service
2. Click "Environment" tab
3. Add/Update:
   ```
   CLIENT_URL=https://your-vercel-url.vercel.app
   ```
   Replace with your actual Vercel URL
4. Render will auto-redeploy

---

## STEP 5: Verify Deployment

### 5.1 Test Frontend
- Visit your Vercel URL
- Should load the landing page

### 5.2 Test API Integration
- Open browser console
- Navigate to Dashboard
- Check that affirmation loads (no CORS errors)
- Test chatbot functionality

### 5.3 Test OAuth (if enabled)
- Try Google OAuth login
- Should redirect correctly

---

## Troubleshooting

**502 Bad Gateway:**
- Check Render backend is running
- Verify rewrite destination URL is correct

**CORS Errors:**
- Verify CLIENT_URL in Render matches Vercel URL exactly
- Check CORS origins in backend/server.js includes CLIENT_URL

**API Not Found:**
- Verify rewrite rule is configured
- Check rewrite destination URL matches Render backend

**Environment Variables Not Working:**
- Ensure variables are set in platform dashboards
- Redeploy after adding variables
- Check variable names match exactly (case-sensitive)

---

## Deployment Checklist

- [ ] Backend deployed to Render
- [ ] Backend URL copied
- [ ] Backend endpoints tested
- [ ] Frontend deployed to Vercel
- [ ] Frontend URL copied
- [ ] Vercel rewrite configured
- [ ] CLIENT_URL updated in Render
- [ ] Frontend loads successfully
- [ ] API calls work (no CORS errors)
- [ ] OAuth redirects work (if enabled)

---

## URLs to Save

**Backend URL:** `https://____________________.onrender.com`
**Frontend URL:** `https://____________________.vercel.app`
