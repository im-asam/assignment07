# 🧺 বাজার দর <sub>`BazarDor`</sub>

> প্রতিদিনের বাজারদর এক নজরে — চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার
> আজকের দাম, দামের পরিবর্তন (▲/▼), আর বাজারভিত্তিক সর্বনিম্ন–সর্বাধিক–গড় দাম, সব এক জায়গায়।

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-1.x-purple)](https://www.better-auth.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47a248?logo=mongodb)](https://www.mongodb.com/atlas)

🌐 **Live:** https://bazar-dor-sam-e97c.vercel.app

Programming Hero **Assignment 7 (B14-A7-Bazar-Dor)**-এর জন্য তৈরি — ৭টি Figma ডিজাইন থেকে বানানো বাংলা-ফার্স্ট মার্কেট-প্রাইস অ্যাপ।

## ✨ Key Features

1. **📢 লাইভ প্রাইস টিকার** — নেভবারের নিচে অসীম স্ক্রলিং মার্কি; প্রতিটি পণ্যের দাম ও ▲/▼ শতাংশ এক নজরে।
2. **📈📉 দাম বাড়া / কমা সেকশন** — "আজ দাম বেড়েছে" (টপ ৬) ও "আজ দাম কমেছে" (টপ ৬) স্বয়ংক্রিয়ভাবে হিসাব করা।
3. **🗂️ ক্যাটাগরি পেজ + স্মার্ট সর্ট** — ডিফল্ট / দাম: কম→বেশি / দাম: বেশি→কম সর্ট; বাংলা সংখ্যা নিউমেরিকভাবে সঠিকভাবে সাজে।
4. **🔒 প্রোটেক্টেড প্রোডাক্ট ডিটেইল** — শুধু লগইন করা ইউজার দেখতে পারে; দামের সারসংক্ষেপ (সর্বনিম্ন / সর্বাধিক / গড়) + বাজারভিত্তিক দামের টেবিল।
5. **🔑 Better Auth অথেনটিকেশন** — ইমেইল/পাসওয়ার্ড + Google + GitHub সোশ্যাল লগইন; সেশন MongoDB Atlas-এ persist করে, তাই রিডিপ্লয়েও ইউজার ডাটা মুছে না।

> আরও আছে: প্রোফাইলে নাম আপডেট (Challenge C2/C3) • সম্পূর্ণ বাংলা UI — বাংলা সংখ্যা (১২৩…), `bn-BD` তারিখ • টোস্ট নোটিফিকেশন • স্কেলিটন লোডার • সম্পূর্ণ রেসপন্সিভ ডিজাইন।

## 🛠️ Technologies Used

| Technology | ব্যবহার |
|---|---|
| **Next.js 16** (App Router) + **TypeScript** | ফ্রেমওয়ার্ক ও টাইপ-সেফটি |
| **Tailwind CSS v4** | স্টাইলিং |
| **Better Auth** | ইমেইল/পাসওয়ার্ড + Google/GitHub OAuth, stateless JWT session (`cookieCache`) |
| **MongoDB Atlas** | Auth ডাটাবেজ (`mongodb` driver + `@better-auth/mongo-adapter`) |
| **react-hot-toast** | টোস্ট নোটিফিকেশন |
| Price Data API | `https://api.api-store.workers.dev/api/bazardor` (fallback: `https://api.abcz.workers.dev/api/bazardor`) |

## 🚀 Setup

```bash
npm install
cp .env.example .env.local   # নিচের env var-গুলো বসান
npm run dev
```

| Variable | আবশ্যক? | বিবরণ |
|---|---|---|
| `BETTER_AUTH_SECRET` | ✅ | র‍্যান্ডম সিক্রেট (`openssl rand -base64 32`) |
| `BETTER_AUTH_URL` | ✅ | অ্যাপের URL (`http://localhost:3000`) |
| `MONGODB_URI` | ✅ | MongoDB Atlas connection string |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | ⭕ | না দিলে শুধু ইমেইল/পাসওয়ার্ড চালু থাকে |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | ⭕ | না দিলে শুধু ইমেইল/পাসওয়ার্ড চালু থাকে |

## 🌐 Deploy (Vercel)

1. GitHub-এ পুশ করে Vercel-এ ইমপোর্ট করুন।
2. **Settings → Environment Variables**-এ উপরের টেবিলের variable-গুলো সেট করুন (production)।
3. Deploy করুন — Auth ডাটা MongoDB-তে থাকে, তাই রিডিপ্লয়েও ইউজার ডাটা মুছবে না।

## 📁 Routes

| Route | বিবরণ |
|---|---|
| `/` | হোম — হিরো, টিকার, দাম বাড়া/কমা, সব পণ্য |
| `/category/[slug]` | ক্যাটাগরি + সর্ট |
| `/product/[slug]` | ডিটেইল (🔒 লগইন আবশ্যক) |
| `/signin`, `/signup` | অথেনটিকেশন |
| `/profile` | প্রোফাইল + নাম আপডেট (🔒) |
