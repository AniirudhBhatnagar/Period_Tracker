# MyRhythm – Period & Wellness Tracker

A modern, friendly web app to track menstrual cycles, moods, symptoms, and daily wellbeing. It provides a beautiful dashboard, daily tips and affirmations (powered by Gemini), and an optional chatbot for supportive guidance.

## Features
- Cycle dashboard with current phase and progress
- Daily affirmation generated for the selected day
- Symptom logging with curated categories
- Mood tracking UI
- Wellness tips per phase
- Chatbot assistant for supportive Q&A

## Tech Stack
- Frontend: React (Create React App), React Router, Day.js, Tailwind-style classes, Lucide/React Icons
- Backend: Node.js, Express, Google AI (Gemini)
- Optional Auth: Passport Google OAuth (can be disabled if unused)
- Optional DB: MongoDB via Mongoose (not required if you don’t use auth/data persistence)

## Screenshots
- Dashboard: add screenshot path when available
- Chatbot: add screenshot path when available

## Getting Started (Local)
1. Clone the repo
2. Backend
   - `cd backend && npm install`
   - Set env vars (at least `GEMINI_API_KEY` and `SESSION_SECRET`)
   - `npm start` → http://localhost:5050
3. Frontend
   - `cd frontend && npm install`
   - `npm start` → http://localhost:3000

## Available Scripts
Frontend (in `frontend/`):
- `npm start` – start dev server
- `npm run build` – production build

Backend (in `backend/`):
- `npm start` – start Express server

## Environment Variables
Backend:
- `GEMINI_API_KEY`: Google AI Studio API key for affirmations/chat
- `SESSION_SECRET`: any strong string for sessions
- `GOOGLE_CLIENT_ID` (optional): for Google OAuth
- `GOOGLE_CLIENT_SECRET` (optional): for Google OAuth
- `MONGO_URI` (optional): only if you use Mongo features

Frontend:
- Typically none required unless you externalize client config (e.g., Firebase). If you do, add them in your hosting dashboard.

## Project Structure
- `frontend/` – React app (UI, components, assets)
- `backend/` – Express server (AI endpoints, optional auth)

---

# Tracker – Deployment Guide

This repo contains a React (CRA) frontend and a Node/Express backend.

## Recommended Hosting
- Frontend: Vercel (static build)
- Backend: Render (web service)

Frontend calls the backend via relative `/api/...` and is routed by a platform rewrite.

## Project Structure
- `frontend/` – React app
- `backend/` – Express server (Gemini proxy, optional auth)

## Prerequisites
- GitHub repo connected to Vercel and Render
- Secrets (MongoDB is optional):
  - `GEMINI_API_KEY` (Google AI Studio)
  - `SESSION_SECRET` (any strong string)
  - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` (only if using Google OAuth)
  - Optional: `MONGO_URI` if you enable MongoDB later

---

## Backend (Render)
1) Create Web Service
- New → Web Service → select repo
- Root Directory: `backend/`
- Build: `npm install`
- Start: `npm start`

2) Environment Variables
- `PORT=5050`
- `SESSION_SECRET=...`
- `GEMINI_API_KEY=...`
- `GOOGLE_CLIENT_ID=...` (optional)
- `GOOGLE_CLIENT_SECRET=...` (optional)
- `MONGO_URI=...` (optional)

3) Verify
- Open `https://<render-app>.onrender.com/api/affirmation?day=1&cycleLength=28`

Notes: Server listens on `process.env.PORT || 5050`. If Mongo is not set, Mongo-dependent auth routes won’t work, but AI endpoints will.

---

## Frontend (Vercel)
1) Create Project
- Root Directory: `frontend/`
- Framework Preset: Create React App

2) Build Settings
- Install: `npm install`
- Build: `npm run build`
- Output: `build`

3) Rewrites (Settings → Functions & Routing → Rewrites)
- Source: `/api/(.*)`
- Destination: `https://<render-app>.onrender.com/api/$1`

4) Deploy and test the dashboard and chatbot.

---

## Local Development
Backend
```
cd backend
npm install
export GEMINI_API_KEY=your_key
export SESSION_SECRET=dev_secret
# export MONGO_URI=your_mongo_uri  # optional
npm start  # http://localhost:5050
```

Frontend
```
cd frontend
npm install
npm start  # http://localhost:3000
```

---

## Troubleshooting
- CORS: ensure Vercel rewrite is set; use relative `/api` in the frontend.
- 404/502: confirm Render URL and logs.
- OAuth: set redirect URI to `https://<render-app>.onrender.com/auth/google/callback`.
- Gemini: verify `GEMINI_API_KEY` and model availability.

---

## Security
- Never commit secrets; store them as platform env vars.
