# 🚂 Railway Cloud Deployment Guide

This guide provides step-by-step instructions for deploying the **Health Companion** full stack (Spring Boot Backend + React Frontend + PostgreSQL Database) to Railway.

---

## 🏗 Architecture on Railway

```
                     ┌───────────────────────────────────┐
                     │         Railway Project           │
                     │                                   │
┌──────────────┐     │  ┌─────────────────────────────┐  │
│ User Browser │────>│  │ Frontend (Vite / React)     │  │
└──────────────┘     │  │ Public HTTPS Domain         │  │
                     │  └──────────────┬──────────────┘  │
                     │                 │ /api calls       │
                     │                 ▼                 │
                     │  ┌─────────────────────────────┐  │
                     │  │ Backend (Spring Boot 3.4)   │  │
                     │  │ Internal / Public Domain    │  │
                     │  └──────────────┬──────────────┘  │
                     │                 │ JDBC            │
                     │                 ▼                 │
                     │  ┌─────────────────────────────┐  │
                     │  │ PostgreSQL Database         │  │
                     │  │ Managed Service             │  │
                     │  └─────────────────────────────┘  │
                     └───────────────────────────────────┘
```

---

## 📋 Step 1: Push Code to GitHub

Railway continuously deploys from GitHub. If you haven't pushed this repository to GitHub yet:

1. Open **[GitHub.com](https://github.com/new)** and create a new repository:
   - Repository name: `health-companion`
   - Visibility: Public or Private

2. Run the following commands in your local terminal:
   ```bash
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/health-companion.git
   git branch -M main
   git push -u origin main
   ```

*(Your local repository is already initialized and cleanly committed).*

---

## 📋 Step 2: Create a Project in Railway

1. Go to **[railway.com](https://railway.com)** (or **[railway.app](https://railway.app)**) and click **Login** (choose **Continue with GitHub**).
2. On your Railway Dashboard, click the button: **+ New Project**.
3. Select **Deploy from GitHub repo**.
4. Choose your `health-companion` repository.

---

## 📋 Step 3: Add PostgreSQL Database

1. In your Railway project canvas, click **+ New** (top right or press `Cmd/Ctrl + K`).
2. Select **Database** → **Add PostgreSQL**.
3. Railway will spin up a fully managed PostgreSQL instance in seconds.

---

## 📋 Step 4: Configure the Backend Service

1. Click on the repository service that Railway created (or click **+ New** → **GitHub Repo** → `health-companion`).
2. Go to the **Settings** tab:
   - **Root Directory**: Set to `/backend` (or leave default if using root Dockerfile).
   - **Build**: Railway automatically detects `backend/Dockerfile` and `railway.json`.
3. Go to the **Variables** tab and click **+ New Variable** (or Raw Editor):
   ```env
   SPRING_PROFILES_ACTIVE=postgres
   SPRING_DATASOURCE_URL=${{Postgres.DATABASE_URL}}
   GEMINI_API_KEY=YOUR_GEMINI_API_KEY
   GEMINI_MODEL=gemini-3.6-flash
   PORT=8080
   ```
   *(Note: `${{Postgres.DATABASE_URL}}` automatically references Railway's managed Postgres instance)*
4. Go to **Networking** in the service settings:
   - Click **Generate Domain** (e.g. `health-companion-backend-production.up.railway.app`).

---

## 📋 Step 5: Configure the Frontend Service

1. In the same Railway project canvas, click **+ New** → **GitHub Repo** → select `health-companion` again.
2. Rename this service to `health-companion-frontend`.
3. Go to **Settings**:
   - **Root Directory**: Set to `/frontend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npx serve -s dist -l $PORT` (or use Docker with `frontend/Dockerfile`)
4. Go to **Variables**:
   ```env
   VITE_API_URL=https://health-companion-backend-production.up.railway.app
   ```
5. Under **Networking**:
   - Click **Generate Domain** to get your public live app URL.

---

## 📋 Step 6: Verify Deployment

1. Open your frontend Railway domain in the browser (e.g., `https://health-companion-frontend-production.up.railway.app`).
2. The UI will render the clean Health Companion interface.
3. Test by submitting a symptom query: *"I have a fever and headache"*.
4. Test document attachment and health library modules.
