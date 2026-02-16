# TEC Website - Technical Excellence Challenge

A complete full-stack web application for the Technical Excellence Challenge (TEC) competition platform built with Node.js, Express.js, and MongoDB.

## 🚀 Features

- **8 Connected Pages**: Home, About, Leaderboard, Register, Login, Dashboard, Team Management, Tasks, and Submissions
- **Dark Theme Design**: Professional dark theme with F1 Red (#FF1801) accent color
- **Fully Responsive**: Mobile-first design that works on all devices
- **Secure Backend**: Express server with robust security practices
- **Database Integration**: MongoDB with Mongoose for data modeling
- **Authentication**: JWT-based auth with secure HttpOnly cookies and password hashing
- **File Uploads**: Validated PDF uploads for task submissions
- **Role-Based Access**: Granular permissions for Leaders, Members, and Admins

## 📁 Project Structure

```
TEC-ECellMET/
├── config/                 # Configuration files
├── controllers/            # API Route logic
├── middleware/             # Express middleware (Auth, Error, Upload)
├── models/                 # Mongoose Data Models
├── public/                 # Frontend files
│   ├── index.html         # Home page with Hero section
│   ├── css/
│   │   └── style.css      # Global styles & design system
│   ├── js/                # Frontend Scripts
│   └── uploads/           # User uploads (Submissions)
├── routes/                 # API Routes Definition
├── utils/                  # Utility helpers (AppError, catchAsync)
├── server.js              # Entry point
└── package.json           # Dependencies
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB Connection URI

### Installation Steps

1. **Install Dependencies**

```bash
npm install
```

2. **Environment Setup**

Create a `.env` file in the root directory using `.env.example` as a template:

```bash
PORT=8080
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
```

3. **Start the Server**

```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

4. **Access the Website**
   Open your browser and navigate to:

```
http://localhost:8080
```

## 🔐 Security Features

- **Helmet**: Secures HTTP headers
- **Rate Limiting**: Prevents brute-force and DoS attacks
- **Data Sanitization**: Prevents NoSQL injection and XSS
- **HPP**: Prevents HTTP Parameter Pollution
- **Secure Cookies**: HttpOnly cookies for authentication

## 🚢 Deployment

### 1. Build & Prepare
Ensure `NODE_ENV` is set to `production`.

### 2. Verify Environment Variables
Make sure all secrets from `.env.example` are set in your hosting provider's dashboard.

### 3. Deploy
- **Heroku**: Push code, set env vars, and Heroku will detect `Node.js` and run `npm start`.
- **Render/Railway**: Connect GitHub repo, set build command `npm install`, start command `npm start`.

## 🎨 Design System

### Colors

- **Primary**: `#FF1801` (F1 Red)
- **Background**: `#050505` (Deep Black)
- **Grays**: `#0a0a0a`, `#1a1a1a`, `#2a2a2a`

### Typography

- **Headings**: Orbitron (700, 900)
- **Body**: Inter (300-700)
- **Accents**: Montserrat (500, 600)

## 📞 Support

For any issues or questions:

- Email: tec@ecell.com
- Phone: +91 98765 43210

## 📝 License

© 2026 TEC - Technical Excellence Challenge. All rights reserved.

---

**Built with ❤️ by E-Cell Team**

# TEC-2026

