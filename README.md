# বাজার দর (BazarDor)

**বাজার দর** — প্রতিদিনের বাজারদর এক নজরে। চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার
আজকের দাম, দামের পরিবর্তন (▲/▼), বাজারভিত্তিক সর্বনিম্ন–সর্বাধিক–গড় দাম — সব এক জায়গায়।

Programming Hero **Assignment 7 (B14-A7-Bazar-Dor)**-এর জন্য তৈরি।

## ✨ Features

1. **লাইভ প্রাইস টিকার** — নেভবারের নিচে অসীম স্ক্রলিং মার্কি: প্রতিটি পণ্যের দাম ও ▲/▼ শতাংশ।
2. **দাম বাড়া/কমা সেকশন** — "আজ দাম বেড়েছে" (টপ ৬) ও "আজ দাম কমেছে" (টপ ৬) অটো-ক্যালকুলেটেড।
3. **ক্যাটাগরি পেজ + সর্ট** — প্রতিটি ক্যাটাগরিতে ডিফল্ট / দাম: কম থেকে বেশি / দাম: বেশি থেকে কম সর্ট (নিউমেরিক, বাংলা সংখ্যা সঠিকভাবে)।
4. **প্রোডাক্ট ডিটেইল (প্রোটেক্টেড)** — শুধু লগইন করা ইউজার দেখতে পারে; দামের সারসংক্ষেপ (সর্বনিম্ন/সর্বাধিক/গড়) + বাজারভিত্তিক দামের টেবিল।
5. **BetterAuth অথেনটিকেশন** — ইমেইল/পাসওয়ার্ড + Google + GitHub সোশ্যাল লগইন, টোস্ট নোটিফিকেশন, স্কেলিটন লোডার।
6. **প্রোফাইল + তথ্য আপডেট (C3)** — নাম আপডেট করার ফর্ম।
7. **বাংলা-ফার্স্ট UI** — বাংলা সংখ্যা (১২৩…), `bn-BD` তারিখ, সম্পূর্ণ রেসপন্সিভ ডিজাইন।

## 🛠️ Technologies

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **Better Auth** — SQLite (`better-sqlite3` + Kysely) ডাটাবেজ
- **react-hot-toast** — টোস্ট নোটিফিকেশন
- Data API: `https://api.api-store.workers.dev/api/bazardor` (fallback: `https://api.abcz.workers.dev/api/bazardor`)

## 🚀 Setup

```bash
npm install
cp .env.example .env.local   # BETTER_AUTH_SECRET জেনারেট করে বসান
npm run dev
```

`.env.local`-এ `BETTER_AUTH_SECRET` (র‍্যান্ডম স্ট্রিং) আবশ্যক। Google/GitHub লগইন
ঐচ্ছিক — সংশ্লিষ্ট `*_CLIENT_ID` / `*_CLIENT_SECRET` না দিলে শুধু ইমেইল/পাসওয়ার্ড চালু থাকে।

## 🌐 Deploy (Vercel)

1. GitHub-এ পুশ করে Vercel-এ ইমপোর্ট করুন।
2. Environment variables সেট করুন:
   - `BETTER_AUTH_SECRET` — র‍্যান্ডম সিক্রেট
   - `BETTER_AUTH_URL` — প্রোডাকশন URL (যেমন `https://bazar-dor.vercel.app`)
   - `BETTER_AUTH_DATABASE_URL=/tmp/bazar-dor.db` — serverless-এ শুধু `/tmp` writable
   - (ঐচ্ছিক) `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`
3. ⚠️ নোট: serverless SQLite ephemeral — রিডিপ্লয়ে ইউজার ডাটা মুছে যাবে (অ্যাসাইনমেন্ট ডেমোর জন্য ঠিক আছে)।

## 📁 Routes

| Route | বিবরণ |
|---|---|
| `/` | হোম — হিরো, টিকার, দাম বাড়া/কমা, সব পণ্য |
| `/category/[slug]` | ক্যাটাগরি + সর্ট |
| `/product/[slug]` | ডিটেইল (🔒 লগইন আবশ্যক) |
| `/signin`, `/signup` | অথেনটিকেশন |
| `/profile` | প্রোফাইল + নাম আপডেট (🔒) |
