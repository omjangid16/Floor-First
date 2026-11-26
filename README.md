# Floor First - Full Stack Web Application

Premium Flooring Solutions - Web Application with React frontend and Node.js + Express + MongoDB backend.

## Architecture

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Framer Motion, React Router v6
- **Backend**: Node.js, Express 5, MongoDB (Mongoose), JWT Authentication, bcryptjs
- **Database**: MongoDB (Local or MongoDB Atlas)

---

## Project Setup

### Prerequisites
- Node.js (v18 or newer)
- MongoDB running locally on port 27017 or a MongoDB Atlas connection URI

### Installation
```sh
npm install
```

### Environment Configuration
Copy `.env.example` to `.env` (or use the pre-configured `.env`):
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/floor_first
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=30d
NODE_ENV=development
VITE_API_URL=http://localhost:5000/api
```

### Database Seeding (Optional)
Seed initial products and a demo user (`demo@floorfirst.ae` / `password123`):
```sh
npm run seed
```

---

## Running the Application

### Option 1: Run Both Frontend & Backend Concurrently (Recommended)
```sh
npm run dev:all
```

### Option 2: Run Separately in Two Terminals
- **Terminal 1 (Backend Server)**:
  ```sh
  npm run server:dev
  ```
  Runs Express on `http://localhost:5000`.

- **Terminal 2 (Frontend Client)**:
  ```sh
  npm run dev
  ```
  Runs Vite dev server on `http://localhost:8080`.

---

## Backend API Endpoints

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

### Products (`/api/products`)
- `GET /api/products` - List all products with optional filters
- `GET /api/products/:id` - Get single product details
