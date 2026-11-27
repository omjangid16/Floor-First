# Floor First - Full Stack Web Application

Premium Flooring Solutions - Modern full-stack architecture organized cleanly into dedicated **Frontend** and **Backend** directories.

## Architecture

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Framer Motion, React Router v6
- **Backend**: Node.js (ES Modules), Express 5, MongoDB (Mongoose), JWT Authentication, bcryptjs
- **Database**: MongoDB (Local or MongoDB Atlas)

---

## Project Structure

```text
Floor First/
├── frontend/                  # React + Vite frontend client
│   ├── public/                # Static assets, logos, favicon, robots.txt
│   ├── src/                   # Source code
│   │   ├── assets/            # Images, banners, graphics
│   │   ├── components/        # UI components, layout, sections
│   │   ├── contexts/          # React contexts (AuthContext, CartContext)
│   │   ├── data/              # Static content & catalog data
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # Utility functions & API client
│   │   ├── pages/             # Route pages (Products, Cart, Profile, etc.)
│   │   ├── test/              # Frontend unit tests
│   │   ├── App.jsx            # Main app component & routes
│   │   └── main.jsx           # Entry point
│   ├── .env                   # Frontend env vars (e.g. VITE_API_URL)
│   ├── .env.example           # Example frontend env vars
│   ├── index.html             # Vite HTML entry
│   ├── package.json           # Frontend dependencies & scripts
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   └── vite.config.js         # Vite configuration & proxy settings
│
├── backend/                   # Node.js + Express + MongoDB backend
│   ├── config/                # Database connection & configurations
│   ├── controllers/           # Request handlers for auth, products, cart, etc.
│   ├── data/                  # Seed dataset for standalone backend seeding
│   ├── middleware/            # Auth and error handling middlewares
│   ├── models/                # Mongoose data models
│   ├── routes/                # Express API routes
│   ├── utils/                 # Utility helpers (e.g. JWT generator)
│   ├── .env                   # Backend env vars (PORT, MONGO_URI, JWT_SECRET)
│   ├── .env.example           # Example backend env vars
│   ├── index.js               # Express server entry point
│   ├── package.json           # Backend dependencies & scripts
│   ├── seed.js                # Database seeding script
│   └── test-api.js            # Automated API integration test suite
│
├── package.json               # Root orchestrator (npm workspaces)
├── .gitignore                 # Git ignore rules
└── README.md                  # Project documentation
```

---

## Project Setup

### Prerequisites
- Node.js (v18 or newer)
- MongoDB running locally on port 27017 or a MongoDB Atlas connection URI

### Installation
Install all dependencies across the entire monorepo from the root directory:
```sh
npm install
```

### Environment Configuration
Both `frontend/` and `backend/` have their own environment configuration files:

- **Frontend (`frontend/.env`)**:
  ```env
  VITE_API_URL=http://localhost:5000/api
  ```

- **Backend (`backend/.env`)**:
  ```env
  PORT=5000
  NODE_ENV=development
  CLIENT_ORIGIN=http://localhost:8080
  MONGO_URI=mongodb://127.0.0.1:27017/floor_first
  JWT_SECRET=your_jwt_secret_here
  JWT_EXPIRES_IN=30d
  DEMO_USER_EMAIL=demo@floorfirst.ae
  DEMO_USER_PASSWORD=password123
  ```

---

## Running the Application

### 1. Run Full Stack Concurrently (Frontend + Backend)
From the root directory:
```sh
npm run dev
```
- **Frontend** runs on: `http://localhost:8080`
- **Backend API** runs on: `http://localhost:5000`

### 2. Run Individually from Root
- **Frontend only**:
  ```sh
  npm run dev:frontend
  # or: npm run frontend
  ```
- **Backend only**:
  ```sh
  npm run dev:backend
  # or: npm run backend
  ```

### 3. Run from Subdirectories
You can also navigate directly into either folder:
- **Frontend**:
  ```sh
  cd frontend
  npm run dev
  ```
- **Backend**:
  ```sh
  cd backend
  npm run dev
  ```

---

## Database Seeding (Optional)
Populate MongoDB with demo user credentials (`demo@floorfirst.ae` / `password123`) and initial flooring products:
```sh
npm run seed
```

---

## Testing & Building

- **Frontend Build**:
  ```sh
  npm run build
  ```
- **Run Frontend Tests**:
  ```sh
  npm test
  ```
- **Run Backend API Integration Test**:
  ```sh
  npm run test:api
  ```

---

## Backend API Endpoints Summary

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with email and password
- `GET /api/auth/me` - Get currently authenticated user
- `PUT /api/auth/profile` - Update user profile information
- `POST /api/auth/forgot-password` - Request password reset

### Delivery Addresses (`/api/addresses`)
- `GET /api/addresses` - List user's delivery addresses
- `POST /api/addresses` - Create a new address
- `PUT /api/addresses/:id` - Update an address
- `PATCH /api/addresses/:id/default` - Set address as default
- `DELETE /api/addresses/:id` - Delete an address

### Shopping Cart (`/api/cart`)
- `GET /api/cart` - Get user's cart items
- `PUT /api/cart` - Sync/replace user's cart items
- `POST /api/cart` - Add or update item in cart
- `DELETE /api/cart/:productId` - Remove single item from cart
- `DELETE /api/cart` - Clear user's cart

### Wishlist (`/api/wishlist`)
- `GET /api/wishlist` - Get saved product IDs
- `POST /api/wishlist/toggle` - Toggle product in wishlist
- `DELETE /api/wishlist/:productId` - Remove item from wishlist

### Orders (`/api/orders`)
- `GET /api/orders` - Get user's order history
- `POST /api/orders` - Place a new order
- `GET /api/orders/:id` - Get order details

### Quotes (`/api/quotes`)
- `POST /api/quotes` - Submit a free quote consultation request
- `GET /api/quotes` - View all quote requests

---

## AWS Deployment Guide

This project includes multi-stage Docker support, reverse proxy trust headers, and graceful shutdown handling for production AWS deployments.

### Recommended AWS Options:

#### 1. AWS App Runner (Fastest & Simplest Managed Containers)
1. Push this repository to GitHub or Amazon ECR.
2. In the AWS App Runner console, create a new service:
   - **Source**: Select your GitHub repo or ECR image.
   - **Configuration**: Use `Dockerfile` (already configured at repo root).
   - **Port**: `5000`
3. Add Environment Variables:
   - `NODE_ENV=production`
   - `PORT=5000`
   - `MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/floor_first`
   - `JWT_SECRET=your_production_secret`
4. App Runner automatically provisions SSL, auto-scaling, and health monitoring on `/api/health`.

#### 2. AWS Elastic Beanstalk
1. Choose the **Docker** platform or **Node.js 20** platform.
2. The root [Procfile](file:///d:/Projects/Floor%20Fusion/Floor%20First/Procfile) (`web: npm start`) and [Dockerfile](file:///d:/Projects/Floor%20Fusion/Floor%20First/Dockerfile) are pre-configured.
3. In Software Configuration, set your environment variables (`PORT=5000`, `MONGO_URI`, `JWT_SECRET`).

#### 3. AWS ECS Fargate
1. Build and push the image to Amazon ECR:
   ```bash
   aws ecr get-login-password --region <your-region> | docker login --username AWS --password-stdin <your-account-id>.dkr.ecr.<your-region>.amazonaws.com
   docker build -t floor-first .
   docker tag floor-first:latest <your-account-id>.dkr.ecr.<your-region>.amazonaws.com/floor-first:latest
   docker push <your-account-id>.dkr.ecr.<your-region>.amazonaws.com/floor-first:latest
   ```
2. Create an ECS Task Definition mapping container port `5000` to your Application Load Balancer (ALB).
3. Set the ALB health check path to `/api/health`.

#### 4. AWS EC2 / Lightsail (PM2 or Docker)
- **Using Docker**:
  ```bash
  docker build -t floor-first .
  docker run -d -p 80:5000 --env-file backend/.env floor-first
  ```
- **Using PM2**:
  ```bash
  npm run build
  pm2 start ecosystem.config.cjs --env production
  pm2 save
  ```

