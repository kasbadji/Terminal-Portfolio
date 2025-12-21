# Vercel Deployment Fix Guide

## 🔍 Root Causes Identified

### 1. **Missing Environment Variable in Production**

Your frontend was trying to fetch from `http://localhost:4000` in production because `NEXT_PUBLIC_API_BASE_URL` was not set in Vercel.

### 2. **No Middleware Present**

The "Middleware -> 404 Not Found" message in Vercel logs is misleading. You don't have a `middleware.ts` file. This is likely a default Next.js message for unmatched routes or build issues.

### 3. **Potential Build-Time Data Fetching Issues**

All your data fetching happens client-side in the `Terminal` component, which is good. However, the error handling was throwing errors that could cause issues.

---

## ✅ Changes Made

### 1. **Enhanced API Utility Module** (`web/src/lib/terminal/api.ts`)

**Changes:**

- ✅ Created `getApiBaseUrl()` function as single source of truth
- ✅ Added proper error handling (returns empty arrays/null instead of throwing)
- ✅ Added console logging for debugging
- ✅ Added Next.js cache revalidation strategies
- ✅ Handles both client and server-side environments

**Key improvements:**

```typescript
export function getApiBaseUrl(): string {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
  }
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
}
```

### 2. **Next.js Config Updates** (`web/next.config.ts`)

**Added:**

- ✅ Optional API proxy rewrite (commented approach for avoiding CORS)
- ✅ Environment-aware configuration

### 3. **Layout Metadata** (`web/src/app/layout.tsx`)

**Fixed:**

- ✅ Removed inline `<head>` tag (deprecated in App Router)
- ✅ Added proper `metadata` export
- ✅ SEO-friendly title and description

---

## 🚀 Vercel Deployment Checklist

### Step 1: Set Environment Variable

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following:

   ```
   Name:  NEXT_PUBLIC_API_BASE_URL
   Value: https://your-railway-app.railway.app
   ```

   ⚠️ **IMPORTANT:**

   - Do NOT include trailing slash
   - Use your actual Railway URL
   - Apply to: **Production**, **Preview**, and **Development**

### Step 2: Configure Root Directory

1. In Vercel project **Settings** → **General**
2. Set **Root Directory** to: `web`
3. **Framework Preset**: Next.js (should auto-detect)
4. **Build Command**: `npm run build` (default)
5. **Output Directory**: `.next` (default)

### Step 3: Verify Build Settings

Ensure these are set:

- **Node.js Version**: 20.x (or 18.x)
- **Install Command**: `npm install` (default)

### Step 4: Redeploy

1. Go to **Deployments** tab
2. Click **...** menu on latest deployment
3. Select **Redeploy**
4. OR push a new commit to trigger automatic deployment

---

## 🔧 Environment Variable Usage

### What the Code Expects

The codebase now consistently uses:

```
NEXT_PUBLIC_API_BASE_URL
```

### Local Development (.env.local)

Create `web/.env.local` (DO NOT commit this file):

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

This is optional since the code falls back to `http://localhost:4000` automatically.

### Production (Vercel)

Set in Vercel dashboard:

```bash
NEXT_PUBLIC_API_BASE_URL=https://terminal-portfolio-production.up.railway.app
```

Replace with your actual Railway URL.

---

## 🌐 Optional: API Proxy Setup (Recommended)

The updated `next.config.ts` includes an optional proxy setup to avoid CORS issues.

### How it Works

When `NEXT_PUBLIC_API_BASE_URL` is set (production), requests to `/api/*` are proxied to Railway:

```
Frontend:  GET /api/projects
           ↓
Next.js:   Rewrites to https://your-railway-app.railway.app/projects
```

### To Enable (Update your API calls)

If you want to use the proxy, update `web/src/lib/terminal/api.ts`:

```typescript
export function getApiBaseUrl(): string {
  // In production, use the proxy
  if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
    return "/api";
  }
  // In development, use direct Railway URL or localhost
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
}
```

**Benefits:**

- ✅ No CORS issues
- ✅ Cleaner URLs
- ✅ Better security (API URL not exposed to client)

---

## 🐛 Debugging Production Issues

### Check Vercel Logs

1. Go to **Deployments** → Click on deployment
2. Check **Build Logs** for build errors
3. Check **Function Logs** for runtime errors

### Common Issues

#### Issue: Still seeing 404

**Solution:**

- Verify `web` is set as Root Directory
- Check that `page.tsx` exists in `web/src/app/`
- Ensure build completed successfully

#### Issue: API calls failing

**Solution:**

- Verify `NEXT_PUBLIC_API_BASE_URL` is set in Vercel
- Check Railway app is running and accessible
- Check CORS settings on Railway backend
- Check browser console for actual error messages

#### Issue: Environment variable not working

**Solution:**

- Ensure variable name is exactly `NEXT_PUBLIC_API_BASE_URL`
- Redeploy after adding env vars (they're not retroactive)
- Check variable is applied to correct environment (Production/Preview)

---

## 📝 Files Modified

### Modified Files:

1. ✅ `web/src/lib/terminal/api.ts` - Enhanced API utility with error handling
2. ✅ `web/next.config.ts` - Added optional proxy rewrite
3. ✅ `web/src/app/layout.tsx` - Fixed metadata export

### Files Analyzed (No Changes Needed):

- `web/src/app/page.tsx` - Simple client component, no issues
- `web/src/components/terminal/Terminal.tsx` - Client component with proper error handling
- `web/src/lib/terminal/commands.ts` - Uses API functions correctly

---

## 🎯 Expected Behavior After Fix

### Development (Local)

```bash
cd web
npm install
npm run dev
```

- App runs on http://localhost:3000
- Fetches from http://localhost:4000 (or your local API)
- Terminal commands work

### Production (Vercel)

- App deploys successfully
- Homepage `/` loads with terminal interface
- API calls go to Railway backend
- Commands like `projects`, `about`, `skills` fetch data from production API
- No 404 errors
- No "Middleware" warnings

---

## 🚨 Critical Railway Configuration

Ensure your Railway backend:

1. **Is deployed and running**

   - Check Railway dashboard
   - Verify deployment succeeded

2. **Has public networking enabled**

   - In Railway project settings
   - Should have a public URL

3. **Allows CORS from Vercel domain**

   Update `api/src/app.ts` to include:

   ```typescript
   import cors from "cors";

   app.use(
     cors({
       origin: [
         "http://localhost:3000",
         "https://your-vercel-app.vercel.app",
         /\.vercel\.app$/,
       ],
     })
   );
   ```

4. **Uses correct PORT**
   ```typescript
   const PORT = process.env.PORT || 4000;
   app.listen(PORT, "0.0.0.0", () => {
     console.log(`Server running on port ${PORT}`);
   });
   ```

---

## 📊 Summary

### Root Cause

Missing `NEXT_PUBLIC_API_BASE_URL` environment variable in Vercel caused the app to try fetching from localhost in production.

### Solution

1. ✅ Improved error handling in API functions
2. ✅ Added environment variable with fallback
3. ✅ Fixed Next.js metadata in layout
4. ✅ Optional proxy configuration
5. ⚠️ **ACTION REQUIRED**: Set `NEXT_PUBLIC_API_BASE_URL` in Vercel

### Next Steps

1. Set environment variable in Vercel (see Step 1 above)
2. Redeploy the application
3. Test production URL
4. Monitor Vercel Function Logs for any remaining issues

---

## 📞 Quick Reference

### Environment Variable

```
NEXT_PUBLIC_API_BASE_URL=https://your-railway-app.railway.app
```

### Vercel Settings

- Root Directory: `web`
- Framework: Next.js
- Build Command: `npm run build`
- Node Version: 20.x

### Local Testing

```bash
cd web
npm install
npm run dev
```

### Production URL Format

```
https://your-project.vercel.app
```

---

**If issues persist after following this guide, check:**

1. Vercel build logs for compilation errors
2. Railway logs for backend errors
3. Browser console for client-side errors
4. Network tab to see actual API request URLs
