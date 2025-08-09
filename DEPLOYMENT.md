# URL Shortener Frontend - Deployment Guide

## Deploy to Vercel

### Prerequisites
1. Create a [Vercel](https://vercel.com) account
2. Have your backend deployed on Render

### Steps to Deploy:

1. **Push your code to GitHub** (if not already done)

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite project

3. **Configure Environment Variables:**
   - In the deployment settings, add:
     ```
     VITE_API_BASE_URL = https://your-backend.onrender.com
     ```
   - Replace with your actual Render backend URL

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your frontend will be available at: `https://your-app.vercel.app`

### After Deployment:

1. **Update Backend CORS:**
   - Go to your Render backend dashboard
   - Update the `FRONTEND_URL` environment variable to your Vercel URL
   - Redeploy the backend

2. **Test the Application:**
   - Visit your Vercel URL
   - Test URL shortening functionality
   - Check the admin page

## Local Development

1. Copy `.env.example` to `.env.local`
2. Update `VITE_API_BASE_URL` to your backend URL
3. Run `npm install`
4. Run `npm run dev`

## Environment Variables

- `VITE_API_BASE_URL`: Backend API URL
  - Local: `http://localhost:5000`
  - Production: `https://your-backend.onrender.com`

## Automatic Deployments

Vercel will automatically redeploy when you push changes to your main branch on GitHub.
