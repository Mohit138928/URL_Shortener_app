# URL Shortener Backend - Deployment Guide

## Deploy to Render

### Prerequisites
1. Create a [Render](https://render.com) account
2. Have your MongoDB Atlas connection string ready

### Steps to Deploy:

1. **Push your code to GitHub** (if not already done)
2. **Connect to Render:**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select this backend folder

3. **Configure the service:**
   ```
   Name: url-shortener-backend
   Environment: Node
   Region: Choose closest to your users
   Branch: main
   Root Directory: backend
   Build Command: npm install
   Start Command: npm start
   ```

4. **Set Environment Variables:**
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `NODE_ENV`: production
   - `FRONTEND_URL`: Your Vercel frontend URL (after deployment)

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL (e.g., https://your-backend.onrender.com)

### Environment Variables Required:
- `MONGODB_URI`: MongoDB connection string
- `NODE_ENV`: production
- `FRONTEND_URL`: Frontend URL for CORS

### Health Check:
Your deployed backend will be available at:
- Health check: `https://your-backend.onrender.com/health`
- API endpoints: `https://your-backend.onrender.com/api/*`

## Local Development

1. Copy `.env.example` to `.env`
2. Update the environment variables
3. Run `npm install`
4. Run `npm run dev`
