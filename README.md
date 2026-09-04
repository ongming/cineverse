# 🎬 Cineverse - Full-Stack Movie Trailer & Discovery Platform

> A modern, cinema-grade web platform for discovering trending movies, watching trailers, exploring actor filmographies, managing personal watchlists, and analyzing box-office financial metrics.

[![Frontend Status](https://img.shields.io/badge/Frontend-Vercel%20Live-brightgreen?logo=vercel)](https://cineverse-frontend-seven.vercel.app)
[![Backend Status](https://img.shields.io/badge/Backend-Render%20Live-blue?logo=render)](https://cineverse-backend-nm5l.onrender.com)
[![Database](https://img.shields.io/badge/Database-Neon%20PostgreSQL-cyan?logo=postgresql)](https://neon.tech)

---

## 🔗 Live Links

* 🌐 **Live Website**: [https://cineverse-frontend-seven.vercel.app](https://cineverse-frontend-seven.vercel.app)
* 🐙 **Frontend Repository**: [cineverse-frontend](https://github.com/ongming/cineverse-frontend)
* 🐙 **Backend Repository**: [cineverse-backend](https://github.com/ongming/cineverse-backend)
 
---

## ✨ Key Features

* **⚡ Automated Data Sync Engine**: Daily automated background job (via GitHub Actions Cron) that extracts, transforms, and updates 110+ trending movies, 1,400+ cast profiles, and backdrops from TMDb API into Neon Serverless PostgreSQL with zero data duplication (`ON CONFLICT DO UPDATE`).
* **🔐 Dual Authentication & Security**: Seamless Google OAuth 2.0 Sign-In alongside traditional email/password authentication secured with JWT (JSON Web Token) and `bcryptjs` password hashing.
* **✉️ 6-Digit OTP Password Reset**: Automated email password recovery flow delivering single-use 6-digit OTP codes via SMTP (Nodemailer).
* **🖼️ Cloud Avatar Management**: Real-time profile picture uploads processed and stored via Cloudinary CDN API.
* **🎬 Custom Cinematic Video Player**: Custom 16:9 React video player with playback speed toggles, volume sliders, fullscreen support, and mobile touch optimization.
* **⚡ Server-State Caching**: Powered by **TanStack Query (React Query)** for instant API caching, optimistic UI updates, and zero-flicker background re-fetching.
* **📱 Responsive Motion UI**: Animated with **Framer Motion** transitions and **Swiper.js** touch-friendly carousels for mobile and desktop screens.

---

## 🛠️ Tech Stack

### **Frontend (`cineverse-frontend`)**
* **Core**: React.js (Vite), JavaScript (ES6+)
* **Styling & UI**: Tailwind CSS v4, Lucide React Icons
* **State & Data Handling**: TanStack Query v5, React Context API, Axios
* **Animations & Carousels**: Framer Motion, Swiper.js
* **Authentication**: `@react-oauth/google`

### **Backend (`cineverse-backend`)**
* **Runtime**: Node.js (v20+), Express.js (Feature-based Modular Architecture)
* **Database**: Neon Serverless PostgreSQL (`pg` driver with SSL Connection Pooling)
* **Security & Auth**: `jsonwebtoken` (JWT), `bcryptjs`, Google Auth Library
* **Media & Mail**: Cloudinary API, Multer (Memory Storage), Nodemailer (SMTP)
* **DevOps & Automation**: GitHub Actions Cron, CORS middleware

---

## 🏗️ Architecture Overview

```text
               +----------------------------------+
               |        React Frontend (Vercel)   |
               |  TanStack Query + Tailwind CSS   |
               +----------------+-----------------+
                                |
                                | REST API (CORS / SSL)
                                v
               +----------------+-----------------+
               |       Node.js / Express API      |
               |       (Render Web Service)       |
               +-------+------------------+-------+
                       |                  |
      +----------------+---+          +---+----------------+
      |  Neon PostgreSQL   |          |  Cloudinary CDN    |
      | (Serverless DB)    |          | (User Avatars)     |
      +--------------------+          +--------------------+
               ^
               | Daily ETL Cron Job
      +--------+-----------+
      |  GitHub Actions    | <--- TMDb API v3
      +--------------------+
```

---

## 🚀 Local Development Setup

### 1. Clone the Repositories
```bash
# Clone Frontend
git clone https://github.com/ongming/cineverse-frontend.git
cd cineverse-frontend
npm install

# Clone Backend
git clone https://github.com/ongming/cineverse-backend.git
cd cineverse-backend
npm install
```

### 2. Configure Environment Variables

**Backend (`backend/.env`)**:
```env
PORT=3000
DATABASE_URL=postgresql://neondb_owner:PASSWORD@ep-xxx.neon.tech/neondb?sslmode=require
JWT_SECRET=your_jwt_secret
TMDB_API_KEY=your_tmdb_api_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

**Frontend (`frontend/.env`)**:
```env
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

### 3. Run Locally
```bash
# In backend directory
npm run dev

# In frontend directory
npm run dev
```
Open `http://localhost:5173` in your browser!

---

## 👤 Author

* **Nguyen Dinh Quang Minh**
* **GitHub**: [@ongming](https://github.com/ongming)
* **Email**: minhdinh347@gmail.com

---

⭐ *If you like this project, feel free to give it a star on GitHub!* ⭐
