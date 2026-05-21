# Fullstack E-Commerce Platform

A modern fullstack e-commerce platform with a powerful CMS, built using **Next.js**, **NestJS**, **Prisma**, and **PostgreSQL**.

The project includes store management, social authentication, analytics, and online payments integration.

---

## ✨ Features

- 🛍️ Full-featured online store
- 🛠️ Admin CMS for store management
- 🔑 Authentication with Google
- 📊 Store statistics and analytics dashboard
- 🛒 Product, category, and order management
- 💳 Payments integration with Stripe
- 📱 Responsive and modern UI
- ⚡ High-performance and scalable architecture

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- Redux Toolkit
- Tailwind CSS
- Shadcn UI
- TypeScript

### Backend

- NestJS
- Prisma
- PostgreSQL
- TypeScript

### Authentication & Payments

- Google OAuth
- Strapi

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <project-folder>
```

---

### 2. Install dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd server
npm install
```

---

### 3. Configure environment variables

Create `.env` files for both frontend and backend.

Example backend `.env`:

```env
DATABASE_URL=

JWT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

CLIENT_URL="http://localhost:3000"
SERVER_URL="http://localhost:5000"
SERVER_DOMAIN="localhost"
```

---

### 4. Run database migrations

```bash
npx prisma migrate dev
```

---

### 5. Start development servers

#### Frontend

```bash
npm run dev
```

#### Backend

```bash
npm run start:dev
```

---

## 📦 Main Functionality

- User authentication and authorization
- Store creation and management
- Product and category management
- Order management system
- Analytics and sales statistics
- Payment processing
- Responsive admin dashboard
