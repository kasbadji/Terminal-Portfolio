# ✅ Vercel Deployment Checklist

## 🚨 Critical Action Required

### Set Environment Variable in Vercel Dashboard

```
Variable Name:  NEXT_PUBLIC_API_BASE_URL
Variable Value: https://your-railway-app.railway.app
Apply To:       Production ✓  Preview ✓  Development ✓
```

**Steps:**

1. [ ] Go to https://vercel.com/dashboard
2. [ ] Click your project
3. [ ] Settings → Environment Variables
4. [ ] Click "Add New"
5. [ ] Enter name: `NEXT_PUBLIC_API_BASE_URL`
6. [ ] Enter value: Your Railway URL (no trailing slash)
7. [ ] Check all three environments
8. [ ] Click Save

---

## 🔧 Vercel Project Settings

### Root Directory

```
✓ Set to: web
```

**How to check:**

1. [ ] Go to Settings → General
2. [ ] Find "Root Directory"
3. [ ] Should show: `web`
4. [ ] If not, edit and set to `web`

### Framework Preset

```
✓ Should be: Next.js
```

### Build Settings

```
Build Command:     npm run build (default)
Output Directory:  .next (default)
Install Command:   npm install (default)
```

### Node.js Version

```
✓ Use: 20.x or 18.x
```

---

## 🚀 Deployment

### Trigger New Deployment

**Option 1: Automatic (Recommended)**

1. [ ] Push changes to GitHub
2. [ ] Vercel auto-deploys

**Option 2: Manual**

1. [ ] Go to Deployments tab
2. [ ] Find latest deployment
3. [ ] Click "..." menu
4. [ ] Click "Redeploy"
5. [ ] Check "Use existing Build Cache" (optional)
6. [ ] Click "Redeploy"

---

## ✅ Verification Steps

### 1. Check Build

1. [ ] Go to Deployments
2. [ ] Click on latest deployment
3. [ ] Check Build Logs - should be all green
4. [ ] Look for "Build Completed"
5. [ ] No errors in logs

### 2. Test Production Site

1. [ ] Visit your Vercel URL
2. [ ] Page loads (no 404)
3. [ ] Terminal interface appears
4. [ ] ASCII art displays

### 3. Test API Integration

Open terminal on your site and test:

1. [ ] Type `help` - shows help menu
2. [ ] Type `projects` - loads projects from Railway
3. [ ] Type `about` - loads profile data
4. [ ] Type `skills` - displays skills with bars

### 4. Check Browser Console

1. [ ] Press F12 to open DevTools
2. [ ] Go to Console tab
3. [ ] Should see no red errors
4. [ ] Any API errors should show Railway URL (not localhost)

### 5. Check Network Tab

1. [ ] Stay in DevTools
2. [ ] Go to Network tab
3. [ ] Type a command (e.g., `projects`)
4. [ ] Look for API request
5. [ ] URL should be: `https://your-railway-app.railway.app/projects`
6. [ ] NOT: `http://localhost:4000/projects`
7. [ ] Status: 200 OK
8. [ ] Response: JSON data

---

## 🚂 Railway Backend Verification

### Check Railway Service

1. [ ] Go to Railway dashboard
2. [ ] Find your API service
3. [ ] Status shows "Active" (green)
4. [ ] Recent deployment successful

### Test Endpoints Directly

Open terminal and run:

```bash
# Replace with your Railway URL
RAILWAY_URL="https://your-railway-app.railway.app"

# Test projects
curl $RAILWAY_URL/projects

# Test profile
curl $RAILWAY_URL/profile

# Test skills
curl $RAILWAY_URL/skills
```

**Expected:**

1. [ ] Each returns JSON data
2. [ ] Status code 200
3. [ ] No error messages

---

## 🐛 Troubleshooting

### Issue: Still seeing 404

**Check:**

- [ ] Root directory is `web` in Vercel settings
- [ ] Build completed successfully
- [ ] No build errors in logs
- [ ] `web/src/app/page.tsx` exists in repo

### Issue: API calls failing

**Check:**

- [ ] `NEXT_PUBLIC_API_BASE_URL` is set in Vercel
- [ ] Variable value has no trailing slash
- [ ] Variable is applied to "Production"
- [ ] You redeployed AFTER setting the variable
- [ ] Railway backend is running and accessible

### Issue: Seeing localhost in production

**Check:**

- [ ] Environment variable is exactly `NEXT_PUBLIC_API_BASE_URL`
- [ ] Variable is saved in Vercel
- [ ] You clicked "Save" (not just entered it)
- [ ] You redeployed after adding variable
- [ ] Browser cache cleared (Ctrl+Shift+R)

### Issue: "Middleware" error in logs

**This is expected behavior if:**

- [ ] Environment variable not set → Falls back to localhost → Fails → 404
- [ ] Fix: Set the environment variable

---

## 📋 Quick Reference

### Environment Variable

```bash
NEXT_PUBLIC_API_BASE_URL=https://your-railway-app.railway.app
```

### Vercel CLI Commands (Optional)

```bash
# Install Vercel CLI
npm i -g vercel

# Link project
vercel link

# Add env var
vercel env add NEXT_PUBLIC_API_BASE_URL

# Redeploy
vercel --prod
```

---

## 🎯 Success Criteria

When everything works, you should see:

✅ **Homepage**

- Terminal interface loads
- ASCII art displays
- Green prompt appears
- Can type commands

✅ **Commands Work**

- `projects` - Lists projects from database
- `about` - Shows profile information
- `skills` - Displays skill bars
- `help` - Shows available commands

✅ **No Errors**

- No 404 pages
- No "localhost" in network requests
- No CORS errors in console
- No "Failed to fetch" errors

✅ **Vercel Logs**

- Build succeeds
- No "Middleware -> 404" errors
- Function logs show successful requests

---

## 📞 Final Steps

After completing all checklist items:

1. [ ] All code changes committed and pushed
2. [ ] Environment variable set in Vercel
3. [ ] Application redeployed
4. [ ] Production site tested and working
5. [ ] All commands load data successfully
6. [ ] No errors in browser console

---

## 🎉 You're Done!

If all items are checked and the site works:

- ✅ Deployment successful
- ✅ Environment configured correctly
- ✅ API integration working
- ✅ Production ready

**Test URL:** https://your-project.vercel.app

---

**Remember: The main fix is setting `NEXT_PUBLIC_API_BASE_URL` in Vercel!** 🚀

Everything else is already configured in the code changes made.
