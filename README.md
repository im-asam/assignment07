<div align="center">

# 🧺 বাজার দর | BazarDor

> Daily market prices at a glance — rice, lentils, oil, vegetables, fish, meat, eggs & spices:
> today's prices, price changes (▲/▼), and market-wise minimum–maximum–average prices, all in one place.

[![Live Demo](https://img.shields.io/badge/Live-Demo-05893e?style=for-the-badge&logo=vercel&logoColor=white)](https://assignment07-bazardor.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-1d271f?style=for-the-badge&logo=github&logoColor=white)](https://github.com/im-asam/assignment07)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-1.x-purple)](https://www.better-auth.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47a248?logo=mongodb)](https://www.mongodb.com/atlas)

</div>

## 📖 Short Description

**BazarDor (বাজার দর)** is a Bangla-first daily market-price web app. Check today's prices of rice, lentils, oil, vegetables, fish, meat, eggs and spices at a glance — with price change indicators (▲/▼), top risers & fallers, category browsing with smart sorting, and market-wise minimum / maximum / average prices.

🌐 **Live:** https://assignment07-bazardor.vercel.app

---

## ✨ 5 Key Features

1. **📢 Live Price Ticker** — Infinite scrolling marquee under the navbar; every product's price with ▲/▼ change percentage at a glance.
2. **📈📉 Price Risers / Fallers** — "Prices up today" (top 6) and "prices down today" (top 6), computed automatically.
3. **🗂️ Category Pages + Smart Sorting** — Default / price low→high / price high→low sorting; Bangla numerals sort numerically, not as strings.
4. **🔒 Protected Product Details** — Only signed-in users can view details; price summary (minimum / maximum / average) plus a market-wise price table.
5. **🔑 Better Auth Authentication** — Email/password + Google + GitHub social login; sessions persist in MongoDB Atlas, so user data survives redeploys.

> Also included: profile name update • full Bangla UI — Bangla numerals (১২৩…), `bn-BD` dates • toast notifications • skeleton loaders • custom SVG icons • fully responsive design.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **Next.js 16** (App Router) + **TypeScript** | Framework & type safety |
| **Tailwind CSS v4** | Styling |
| **Better Auth** | Email/password + Google/GitHub OAuth, stateless JWT session (`cookieCache`) |
| **MongoDB Atlas** | Auth database (`mongodb` driver + `@better-auth/mongo-adapter`) |
| **react-hot-toast** | Toast notifications |
| **Price Data API** | `https://openapi.programming-hero.com/api/bazardor` (official PH API, with fallbacks) |

---

## 📄 Routes

| Route | Description |
|---|---|
| `/` | Home — hero, ticker, risers/fallers, all products |
| `/category/[slug]` | Category browsing + sorting |
| `/product/[slug]` | Details (🔒 sign-in required) |
| `/signin`, `/signup` | Authentication |
| `/profile` | Profile + name update (🔒) |

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── (auth)/
│   │   ├── signin/          # SigninForm + page
│   │   └── signup/          # SignupForm + page
│   ├── api/auth/[...all]/   # Better Auth handler
│   ├── category/[slug]/     # CategoryClient + page
│   ├── product/[slug]/      # page (protected)
│   ├── profile/             # ProfileClient + page (protected)
│   ├── layout.tsx           # Navbar + Ticker + Footer
│   ├── page.tsx             # Home
│   ├── globals.css
│   └── not-found.tsx
├── components/
│   ├── ui/                  # ChangeBadge, Skeletons, SocialIcons
│   ├── layout/              # Navbar, Footer, Ticker
│   ├── home/                # Hero
│   ├── product/             # ProductCard, ProductIcon, CategoryIcon
│   └── auth/                # RequireAuth
├── lib/                     # api, auth, auth-client, bn, db
└── proxy.ts                 # auth gating
```

---

## ⚙️ Getting Started

```bash
npm install
cp .env.example .env.local   # fill in your own env vars
npm run dev
```

| Variable | Required? | Description |
|---|---|---|
| `BETTER_AUTH_SECRET` | ✅ | Random secret (`openssl rand -base64 32`) |
| `BETTER_AUTH_URL` | ✅ | App URL (`http://localhost:3000`) |
| `MONGODB_URI` | ✅ | MongoDB Atlas connection string |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | ⭕ | Optional — without these, only email/password login works |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | ⭕ | Optional — without these, only email/password login works |

---

## 👨‍💻 Author

**Asam Uddin** — built as part of the Programming Hero Full Stack Web Development course (Assignment 7: Bazar Dor).
