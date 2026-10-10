<div align="center">

# 🛒 বাজার দর | BazarDor

> প্রতিদিনের বাজারদর এক নজরে — চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার
> আজকের দাম, দামের পরিবর্তন (▲/▼), আর বাজারভিত্তিক সর্বনিম্ন–সর্বাধিক–গড় দাম, সব এক জায়গায়।

**আজকের বাজারের দাম এক নজরে**

[![Live Demo](https://img.shields.io/badge/Live-Demo-05893e?style=for-the-badge&logo=vercel&logoColor=white)](https://bazar-dor-sam-e97c.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-1d271f?style=for-the-badge&logo=github&logoColor=white)](https://github.com/im-asam/assignment07)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-1.x-purple)](https://www.better-auth.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47a248?logo=mongodb)](https://www.mongodb.com/atlas)

</div>

Bazar Dor is a modern, Bangla-first daily market price tracking application
built for people who want to check today's bazar prices at a glance.

Browse daily prices of rice, lentils, oil, vegetables, fish, meat, eggs, and
spices — see price changes (▲/▼), top risers and fallers, and market-wise
minimum, maximum, and average prices, all in one place.

---

## 🚀 Live Demo

[View Live Project](https://bazar-dor-sam-e97c.vercel.app/)

## 📦 GitHub Repository

[View Source Code](https://github.com/im-asam/assignment07)

---

## ✨ Features

- 📢 **Live Price Ticker** — Infinite scrolling marquee under the navbar
  showing every product's price with ▲/▼ change percentage at a glance.
- 📈 **Top Price Risers** — Automatically computed top 6 products whose
  prices increased today.
- 📉 **Top Price Fallers** — Automatically computed top 6 products whose
  prices dropped today.
- 🗂️ **Category Pages + Smart Sorting** — Browse products by category with
  sorting: default, price low → high, price high → low. Bangla numerals
  are sorted numerically, not as strings.
- 🔒 **Protected Product Details** — Only signed-in users can view product
  details: price summary (minimum / maximum / average) plus a
  market-wise price table.
- 🔑 **Authentication** — Email/password sign-in plus Google and GitHub
  social login, powered by Better Auth.
- 👤 **Profile Management** — Signed-in users can view their profile and
  update their display name.
- 🇧🇩 **Full Bangla UI** — Complete Bangla interface with Bangla numerals
  (১২৩…), `bn-BD` date formatting, and translated units
  (প্রতি কেজি, প্রতি লিটার).
- 🎨 **Custom SVG Icons** — Hand-drawn SVG icons for ডাল (kidney beans),
  তেল (oil jar), and আদা (ginger) replace missing emoji glyphs on
  devices that don't render them.
- 🔔 **Toast Notifications** — Get feedback on sign-in, sign-up,
  sign-out, and profile updates.
- ⏳ **Skeleton Loaders** — Shows loading placeholders while price data
  is being fetched.
- 📱 **Responsive Design** — Optimized for desktop, tablet, and mobile
  devices.
- ❌ **Custom 404 Page** — Handles invalid and unknown routes gracefully.

---

## 🛠️ Technologies Used

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Next.js App Router**
- **Better Auth** (email/password + Google/GitHub OAuth, stateless JWT
  session via `cookieCache`)
- **MongoDB Atlas** (auth database — users and sessions persist across
  redeploys)
- **react-hot-toast**
- **REST API**

---

## 🔌 API

Bazar Dor uses the BazarDor Price API to load product and category data,
with automatic fallback if the primary base fails. The official base is
`https://openapi.programming-hero.com/api/bazardor` (per the
2026-10-10 Programming Hero update); the app falls back to the previous
bases if it is unreachable.

### All Products

`https://openapi.programming-hero.com/api/bazardor/products`

### Products by Category

`https://openapi.programming-hero.com/api/bazardor/products?category=<slug>`

### All Categories

`https://openapi.programming-hero.com/api/bazardor/categories`

Fallback bases: `https://api.api-store.workers.dev/api/bazardor`,
`https://api.abcz.workers.dev/api/bazardor`

The API provides product information such as:

- Product id and slug
- Bangla name (`nameBn`)
- Category and Bangla category name
- Unit (kg, litre, piece…)
- Image / icon
- Today's, yesterday's, last week's, and last month's prices
- Price change direction and percentage (`change.dir`, `change.pct`)
- Market-wise prices (`markets`: market, division, min, max)

---

## 📄 Main Pages

### 🏠 Home

`/`

Contains the navigation bar, live price ticker, hero section, top price
risers and fallers, all-products grid, and footer.

### 🗂️ Category

`/category/[slug]`

Displays products of one category with smart sorting
(default / price low → high / price high → low) and a category header
with icon.

### 🔒 Product Details

`/product/[slug]`

Protected route — requires sign-in. Shows the product's price summary
(minimum / maximum / average) and a market-wise price table with
division info.

### 🔑 Sign In

`/signin`

Email/password sign-in form plus Google and GitHub social login buttons.
Signed-in users are redirected away automatically.

### 📝 Sign Up

`/signup`

Email/password registration plus Google and GitHub social login.

### 👤 Profile

`/profile`

Protected route — requires sign-in. Shows the signed-in user's profile
information with the option to update the display name.

---

## 🔑 Authentication

Bazar Dor uses **Better Auth** for authentication:

- Email/password credentials with secure session cookies
- Google OAuth social login
- GitHub OAuth social login
- Stateless JWT session validation via `cookieCache` (`session_data`
  cookie) — no server-side session lookup, works across serverless
  isolates
- Users and sessions are stored in **MongoDB Atlas**, so accounts
  survive redeploys
- Protected routes (`/product/[slug]`, `/profile`) redirect guests to
  `/signin`; signed-in users are redirected away from `/signin` and
  `/signup`

---

## 💾 Data Persistence

- Auth data (users, sessions, accounts) persists in **MongoDB Atlas**
- Price data is fetched live from the BazarDor API on every request
  (`cache: "no-store"`) so prices are always fresh

---

## 📱 Responsive Design

The application is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile

The layout, navigation, price ticker, hero, product cards, price tables,
auth forms, and footer adapt to different screen sizes.

---

## 📁 Project Structure

```text
bazar-dor/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...all]/
│   │   │           └── route.ts
│   │   ├── category/
│   │   │   └── [slug]/
│   │   │       ├── CategoryClient.tsx
│   │   │       └── page.tsx
│   │   ├── product/
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── profile/
│   │   │   ├── ProfileClient.tsx
│   │   │   └── page.tsx
│   │   ├── signin/
│   │   │   ├── SigninForm.tsx
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   ├── SignupForm.tsx
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── icon.svg
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── BasketIllustration.tsx
│   │   ├── CategoryIcon.tsx
│   │   ├── ChangeBadge.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductIcon.tsx
│   │   ├── RequireAuth.tsx
│   │   ├── Skeletons.tsx
│   │   ├── SocialIcons.tsx
│   │   └── Ticker.tsx
│   │
│   ├── lib/
│   │   ├── api.ts
│   │   ├── auth-client.ts
│   │   ├── auth.ts
│   │   ├── bn.ts
│   │   └── db.ts
│   │
│   └── proxy.ts
│
├── public/
│   └── hero-basket.png
│
├── .env.example
├── next.config.ts
├── package.json
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/im-asam/assignment07.git
```

### 2. Open the project

```bash
cd assignment07
```

### 3. Install dependencies

```bash
npm install
```

### 4. Set up environment variables

```bash
cp .env.example .env.local
```

| Variable | Required? | Description |
|---|---|---|
| `BETTER_AUTH_SECRET` | ✅ | Random secret — generate with `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | ✅ | App URL (`http://localhost:3000` for local dev) |
| `MONGODB_URI` | ✅ | MongoDB Atlas connection string |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | ⭕ | Optional — without these, only email/password login is active |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | ⭕ | Optional — without these, only email/password login is active |

### 5. Start the development server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

## 🏗️ Build for Production

```bash
npm run build
```

To start the production server:

```bash
npm start
```

---

## 🎯 Assignment

This project was created for **Programming Hero — Assignment-007:
Bazar Dor (B14-A7-Bazar-Dor)**.

The project includes the required navbar with price ticker, hero section,
price risers/fallers, all-products grid, category pages with sorting,
protected product details, sign-in/sign-up with social login, profile
management, Bangla UI, responsive design, loading states, toast
notifications, and deployment.

---

## 👨‍💻 Author

**Asam Uddin**

Built as part of the **Programming Hero Full Stack Web Development** course.

---

## 📜 License

This project was created for educational purposes.
