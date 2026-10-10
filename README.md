# বাজার দর

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম, দামের পরিবর্তন এবং বাজারভিত্তিক
তুলনা দেখানোর Next.js অ্যাপ।

## চালু করা

Node.js ইনস্টল করে dependency ইনস্টল করুন:

```bash
npm install
```

প্রজেক্টের root-এ `.env` ফাইলে প্রয়োজনীয় environment variable দিন:

```env
MONGODB_URL=
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

`MONGODB_URL`, `BETTER_AUTH_URL`, এবং `BETTER_AUTH_SECRET` আবশ্যক। Google/GitHub
OAuth চালু করতে প্রতিটি provider-এর Client ID ও Client Secret যোগ করুন এবং OAuth
console-এ `http://localhost:3000/api/auth/callback/google` অথবা
`http://localhost:3000/api/auth/callback/github` callback URL নিবন্ধন করুন।
Production deploy-এ Vercel-এর Project Settings → Environment Variables-এ একই
production values যোগ করতে হবে। Secret কখনও source control-এ commit করবেন না।

Development server চালান:

```bash
npm run dev
```

অ্যাপটি [http://localhost:3000](http://localhost:3000)-এ খুলুন।

## যাচাই

```bash
npm run lint
npm run build
```

পণ্যের তথ্য `https://openapi.programming-hero.com/api/bazardor` API থেকে আসে।
