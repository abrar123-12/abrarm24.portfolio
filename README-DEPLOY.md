# Portfolio Deploy Guide — Abrar Mahmud

এই app টা তোমার আগের static portfolio-র
নতুন রূপ। একটাই নতুন জিনিস:
তুমি যেকোনো সময় **/admin** পেজে লগইন করে
নিজের **intro video, intro voice আর profile photo**
upload / replace করতে পারবা।
সাইট নিজে নিজেই নতুনটা দেখাবে।

Intro আপাতত **খালি** আছে।
তুমি নিজে deploy-এর পর upload করবা।

গুরুত্বপূর্ণ: অ্যাকাউন্টের কাজগুলো
(Supabase, GitHub, Vercel লগইন)
**তুমি নিজে নিজের ফোন থেকে করবা।**
Assistant কখনো তোমার অ্যাকাউন্টের
access নেয় না, নিবেও না।

---

## ধাপ 1 — Supabase project বানাও

1. supabase.com খোলো
2. নিজের account দিয়ে লগইন করো
3. **New project** চাপো
4. নাম দাও: `abrarm24-portfolio`
5. একটা শক্ত Database Password দাও
   (কোথাও লিখে রাখো, পরে লাগতে পারে)
6. Region: কাছের একটা বেছে নাও
7. **Create new project** — 1-2 মিনিট অপেক্ষা করো

## ধাপ 2 — SQL চালাও (bucket + table)

1. Supabase project খোলো
2. বামের মেনুতে **SQL Editor**
3. **New query** চাপো
4. এই repo-র ফাইলটা খোলো:
   `supabase/migration-001.sql`
5. পুরা লেখা কপি করে SQL Editor-এ বসাও
6. **Run** চাপো
7. "Success" দেখলেই এই ধাপ শেষ

## ধাপ 3 — নিজের Admin user বানাও

এই user দিয়েই তুমি /admin এ লগইন করবা।

1. Supabase এ **Authentication** মেনু
2. **Users** ট্যাব
3. **Add user** → **Create new user**
4. নিজের email দাও: abrarmahamud0@gmail.com
5. নিজের পছন্দের একটা password দাও
   (এটা তুমি নিজে ঠিক করবা —
   assistant কে পাঠাতে হবে না)
6. **Auto Confirm User** অন থাকলে ভালো
7. **Create user** চাপো

## ধাপ 4 — Supabase keys কপি করো

1. Supabase এ **Project Settings**
2. **API** অংশে যাও
3. দুইটা জিনিস লাগবে:
   - **Project URL**
   - **anon public** key
4. এগুলো ধাপ 6 এ Vercel এ বসাতে হবে
   (কাউকে পাঠিও না, শুধু Vercel এ দিবা)

## ধাপ 5 — GitHub এ push করো (Termux)

আগে এই folder টা ফোনে নাও
(assistant যেভাবে লিংক/ফাইল দেয় সেভাবে),
তারপর Termux এ একটা একটা করে লাইন চালাও।
**সব লাইন আলাদা আলাদা — একসাথে জোড়া দিও না।**

```
cd portfolio-app
```

```
git init
```

```
git add .
```

```
git commit -m "portfolio app"
```

```
git branch -M main
```

এরপর GitHub ওয়েবসাইটে যাও:
নতুন repository বানাও,
নাম ঠিক এটাই দাও:

```
abrarm24.portfolio
```

Public রাখো, কোনো ফাইল add করো না
(README / .gitignore কিছুই না)।

তারপর Termux এ (নিজের GitHub username বসাও):

```
git remote add origin https://github.com/TOMAR-USERNAME/abrarm24.portfolio.git
```

```
git push -u origin main
```

মনে রাখবা: `git add` মাঝে মাঝে ফোনের
storage এ চুপচাপ ফাইল বাদ দেয়।
push এর পর GitHub ওয়েবসাইটে গিয়ে
চেক করো সব ফোল্ডার
(src, supabase, public) এসেছে কিনা।

## ধাপ 6 — Vercel এ deploy করো

1. vercel.com খোলো, GitHub দিয়ে লগইন
2. **Add New** → **Project**
3. `abrarm24.portfolio` repo টা **Import** করো
4. Framework নিজে থেকেই **Next.js** আসবে
5. **Environment Variables** অংশে
   দুইটা variable যোগ করো।
   Type হিসেবে **Config / Plain** বেছে নিও
   (Secret type দিলে ফোনে Save আটকে যায় —
   Mess Khojo-র সময় এই সমস্যা হয়েছিল)

   Name 1:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   ```
   Value 1: ধাপ 4 এর Project URL

   Name 2:
   ```
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```
   Value 2: ধাপ 4 এর anon public key

6. **Deploy** চাপো
7. 2-3 মিনিটে তোমার লিংক রেডি, যেমন:
   `abrarm24-portfolio.vercel.app`

Env vars ছাড়া deploy করলেও সাইট খুলবে —
শুধু intro অংশে "Intro coming soon"
দেখাবে আর /admin এ setup বাকি আছে বলবে।
পরে env vars যোগ করে **Redeploy** করলেই
সব চালু হয়ে যাবে।

⚠️ পুরনো mess-kujo প্রজেক্টটা
**delete করো না** — এটা আলাদা প্রজেক্ট।

## ধাপ 7 — Intro upload করো

1. নিজের সাইটের লিংকের শেষে `/admin` যোগ করো
   যেমন: `abrarm24-portfolio.vercel.app/admin`
2. ধাপ 3 এর email + password দিয়ে **Log in**
3. তিনটা বাক্স পাবা:
   - **Intro Video** — mp4 / webm
     (50MB এর বেশি হলে সাইট স্লো হতে পারে)
   - **Intro Voice Audio** — mp3 / m4a / wav
   - **Profile Photo** — jpg / png / webp
4. ফাইল বেছে **Upload** চাপো
5. হয়ে গেলে সাইটের প্রথম পেজে যাও —
   নতুন intro / ছবি দেখা যাবে
6. বদলাতে চাইলে আবার নতুন ফাইল upload করো —
   পুরনোটা নিজে নিজে বদলে যাবে
7. মুছতে চাইলে ওই বাক্সের **Delete** চাপো

কাজ শেষে /admin পেজে **Log out** করে নিও।

---

## সমস্যা হলে

- **/admin এ "Setup not finished"**:
  Vercel এ env vars নাই।
  ধাপ 6 এর মতো যোগ করে Redeploy করো।
- **Login হচ্ছে না**:
  Supabase → Authentication → Users এ
  user টা আছে কিনা আর email confirm
  হয়েছে কিনা চেক করো।
- **Upload failed**:
  ধাপ 2 এর SQL টা Run হয়েছে কিনা চেক করো।
  SQL না চললে bucket/table তৈরি হয়নি।
- **সাইটে পুরনো intro দেখাচ্ছে**:
  1 মিনিট অপেক্ষা করে পেজটা আবার খোলো।
  তবু না হলে Vercel এ Redeploy করো না —
  আগে ব্রাউজারে পেজটা refresh করে দেখো।

শুভকামনা! কোনো ধাপে আটকালে
স্ক্রিনশট পাঠাও, ওখান থেকে গাইড পাবা।
