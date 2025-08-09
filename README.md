# URL Shortener App

A full-stack MERN application for shortening URLs with an admin dashboard.

## Features

- **URL Shortening**: Convert long URLs into short, manageable links
- **Redirect Service**: Automatically redirect short URLs to original destinations
- **Admin Dashboard**: View all shortened URLs, visit counts, and statistics
- **Visit Tracking**: Track how many times each short URL has been visited
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React + Vite, Tailwind CSS, React Router, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **URL Generation**: nanoid for unique short codes

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation & Setup

### 1. Clone and Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Database Setup

#### Option A: Local MongoDB
- Install MongoDB on your system
- Start MongoDB service
- Database will be created automatically at `mongodb://localhost:27017/urlshortener`

#### Option B: MongoDB Atlas (Cloud)
- Create a free MongoDB Atlas account
- Create a new cluster
- Get your connection string
- Update `backend/.env` with your MongoDB URI

### 3. Environment Configuration

The backend `.env` file is already configured for local development:
```
MONGODB_URI=mongodb://localhost:27017/urlshortener
PORT=5000
```

For production or MongoDB Atlas, update the `MONGODB_URI` in `backend/.env`.

### 4. Running the Application

#### Start Backend Server
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

#### Start Frontend Development Server
```bash
# In a new terminal, from the root directory
npm run dev
```
Frontend will run on `http://localhost:5173`

## API Endpoints

### Backend Routes

- `POST /api/shorten` - Create a shortened URL
- `GET /api/urls` - Get all URLs (for admin page)
- `GET /:shortcode` - Redirect to original URL
- `GET /health` - Health check

### Example API Usage

```javascript
// Shorten a URL
const response = await axios.post('http://localhost:5000/api/shorten', {
  original_url: 'https://example.com/very/long/url'
});

// Response
{
  "original_url": "https://example.com/very/long/url",
  "short_code": "abc123",
  "short_url": "http://localhost:5000/abc123",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

## Usage

### Shortening URLs

1. Go to `http://localhost:5173`
2. Enter a long URL in the input field
3. Click "Shorten URL"
4. Copy the generated short URL
5. Use the short URL to redirect to the original

### Admin Dashboard

1. Navigate to `http://localhost:5173/admin`
2. View statistics: total URLs, total visits, average visits per URL
3. See all shortened URLs in a table format
4. Test short URLs directly from the admin panel
