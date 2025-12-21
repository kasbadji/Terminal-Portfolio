# Backend (Railway) Configuration Guide

## 🔧 Current Configuration

Your Express API already has CORS enabled:

```typescript
app.use(cors()); // Allows all origins
```

This is fine for development, but let's make it production-ready.

---

## ✅ Recommended Backend Updates

### 1. Update CORS Configuration (Optional but Recommended)

Update `api/src/app.ts` to be more specific:

```typescript
import express from "express";
import cors from "cors";
import { router } from "./routes/index.js";

export const app = express();

// Enhanced CORS configuration
const corsOptions = {
  origin: function (origin: string | undefined, callback: Function) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:3001",
      process.env.FRONTEND_URL,
      /\.vercel\.app$/, // All Vercel preview deployments
    ].filter(Boolean);

    const isAllowed = allowedOrigins.some((allowed) => {
      if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return allowed === origin;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(null, true); // Still allow for now, but log
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", router);
app.use(router);
```

### 2. Verify Server Configuration

Check `api/src/server.ts`:

```typescript
import { app } from "./app.js";

const PORT = process.env.PORT || 4000;
const HOST = "0.0.0.0"; // Important for Railway

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
```

---

## 🚂 Railway Environment Variables

Set these in Railway dashboard:

```bash
# Required
DATABASE_URL=<automatically set by Railway Postgres>
NODE_ENV=production
PORT=<automatically set by Railway>

# Optional - for CORS
FRONTEND_URL=https://your-app.vercel.app
```

---

## 🔍 Railway Deployment Checklist

### 1. Verify Service is Running

- Check Railway dashboard
- Look for green "Active" status
- Check recent deployment logs

### 2. Check Public Networking

- Go to your Railway service
- Settings → Networking
- Ensure "Public Networking" is enabled
- Note your public URL (e.g., `https://xxx.railway.app`)

### 3. Verify Database Connection

- Ensure Postgres service is running
- Check that `DATABASE_URL` is set in your API service
- Run migrations if needed

### 4. Test Endpoints

Test your Railway URL directly:

```bash
# Test projects endpoint
curl https://your-railway-app.railway.app/projects

# Test profile endpoint
curl https://your-railway-app.railway.app/profile

# Test skills endpoint
curl https://your-railway-app.railway.app/skills
```

Expected responses:

- Should return JSON data
- Status code 200
- CORS headers present

---

## 🐛 Common Railway Issues

### Issue: Routes not found (404)

**Cause:** Your API has duplicate route registration

```typescript
app.use("/api", router); // Routes become /api/projects
app.use(router); // Routes also at /projects
```

**Current behavior:**

- Both `/projects` and `/api/projects` work
- Frontend uses `/projects` (without /api prefix)

**Recommended:** Keep both for backwards compatibility, or choose one:

```typescript
// Option 1: Only use /api prefix
app.use("/api", router);

// Then update frontend to:
// ${API_BASE_URL}/api/projects

// Option 2: Only use root paths (current approach)
app.use(router);

// Frontend uses:
// ${API_BASE_URL}/projects
```

### Issue: Railway app crashes on startup

**Solutions:**

1. Check build logs for TypeScript errors
2. Ensure `dist/` folder is generated
3. Verify `start` script: `"start": "node dist/server.js"`
4. Check that `PORT` is read from environment

### Issue: Database connection fails

**Solutions:**

1. Verify Postgres service is linked to API service
2. Check `DATABASE_URL` is set
3. Run Prisma migrations:
   ```bash
   npx prisma migrate deploy
   ```
4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

---

## 📦 Railway Build Configuration

### package.json scripts (Current):

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

### Railway Build Settings:

- **Build Command**: `npm run build && npx prisma generate`
- **Start Command**: `npm start`
- **Node Version**: 20.x

---

## 🔄 Deployment Process

### Railway Auto-Deploy

1. Push to GitHub
2. Railway detects changes
3. Runs build command
4. Generates Prisma client
5. Starts server with `npm start`

### Manual Deploy

1. Go to Railway dashboard
2. Click on your service
3. Click "Deploy" → "Redeploy"

---

## 🧪 Testing the Integration

### Local Testing

```bash
# Terminal 1: Start API
cd api
npm run dev

# Terminal 2: Start Frontend
cd web
npm run dev

# Visit http://localhost:3000
# Type commands: projects, about, skills
```

### Production Testing

```bash
# Set the environment variable
export NEXT_PUBLIC_API_BASE_URL=https://your-railway-app.railway.app

# Build and test
cd web
npm run build
npm start

# Or test deployed version directly
# Visit https://your-app.vercel.app
```

---

## 🔐 Security Recommendations

### 1. Rate Limiting

Add rate limiting to prevent abuse:

```bash
npm install express-rate-limit
```

```typescript
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP",
});

app.use(limiter);
```

### 2. Helmet for Security Headers

```bash
npm install helmet
```

```typescript
import helmet from "helmet";
app.use(helmet());
```

### 3. Environment Variables

Never commit:

- `.env`
- `DATABASE_URL`
- API keys

---

## 📊 Monitoring

### Railway Logs

```bash
# View in Railway dashboard
Deployments → [Select deployment] → View Logs
```

### Health Check Endpoint

Add to `api/src/app.ts`:

```typescript
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});
```

Test: `https://your-railway-app.railway.app/health`

---

## 🎯 Summary

### Current Status

✅ CORS enabled (all origins)
✅ Routes work at both `/projects` and `/api/projects`
✅ Express + TypeScript + Prisma configured
✅ Railway-compatible server setup

### Action Items

1. ✅ Verify Railway service is running
2. ✅ Test all endpoints directly
3. ⚠️ Optional: Update CORS to specific origins
4. ⚠️ Optional: Add rate limiting
5. ⚠️ Set `FRONTEND_URL` in Railway env vars

### No Changes Required If:

- Railway app is running and accessible
- Endpoints return JSON data
- CORS headers are present
- Frontend can connect in production

---

**The backend is already well-configured. Focus on the Vercel environment variable setup!**
