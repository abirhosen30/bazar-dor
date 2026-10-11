# 🛒 Bazar Dor

**Bazar Dor** is a modern, responsive web application for browsing market products, comparing prices, and managing a shopping cart — built as part of the Programming Hero assignment **B14-A7**.

<<<<<<< HEAD
🔗 **Live Site:** [https://bazar-dor-lime-nine.vercel.app](https://bazar-dor-lime-nine.vercel.app)
=======
## প্রযুক্তি

- Next.js 16 App Router, React 19 ও TypeScript
- Tailwind CSS 4 ও DaisyUI
- Better Auth (ইমেইল/পাসওয়ার্ড, Google ও GitHub)
- MongoDB
- Programming Hero Bazar Dor API

## প্রধান ফিচার

1. বাংলা তারিখ, ক্যাটাগরি নেভিগেশন এবং চলমান বাজারদরের ticker।
2. Hero banner থেকে সব পণ্যে যাওয়ার লিংক ও responsive product grid।
3. সবচেয়ে বেশি দাম বাড়া/কমা পণ্যের তালিকা এবং বাংলা সংখ্যা, একক ও পরিবর্তনের badge।
4. দাম অনুযায়ী category sorting এবং login-protected product details-এ বাজারভিত্তিক দাম।
5. ইমেইল/সোশ্যাল authentication, profile name update, loading skeleton ও friendly 404 page।

## চালু করা
>>>>>>> 0ed24f1 (fixed error)

---

## ✨ Features

- 🛍️ Browse products with name, image, price and category
- 💰 Clear price display for quick comparison
- ➕ Add / remove products from the cart
- 🧮 Real-time total price calculation
- 🔔 Toast notifications for user actions
- 📱 Fully responsive design (mobile, tablet, desktop)
- ⚡ Fast loading and smooth user experience

> Update this list to match the exact features you implemented.

---

## 🧰 Tech Stack

| Category   | Technology                    |
| ---------- | ----------------------------- |
| Library    | React                         |
| Build Tool | Vite                          |
| Styling    | Tailwind CSS                  |
| Deployment | Vercel                        |

> Change this table if your project uses different tools (e.g. DaisyUI, React Router, React Toastify).

---

## 📁 Project Structure

```
bazar-dor/
├── public/
├── src/
│   ├── components/
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/abirhosen30/bazar-dor.git

# 2. Go to the project folder
cd bazar-dor

# 3. Install dependencies
npm install

<<<<<<< HEAD
# 4. Start the development server
=======
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
production values যোগ করতে হবে। `BETTER_AUTH_URL`-এ production site-এর canonical
origin (যেমন `https://example.com`) দিন; Vercel-এর deployment ও production URL
গুলো auth-এর trusted origins-এ স্বয়ংক্রিয়ভাবে যোগ হয়। Environment variable
পরিবর্তনের পর নতুন deployment দিন। Secret কখনও source control-এ commit করবেন না।

Development server চালান:

```bash
>>>>>>> 0ed24f1 (fixed error)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

---

## 🌐 Deployment

This project is deployed on **Vercel**. Every push to the `main` branch triggers an automatic redeploy.

---

## 🤝 Contributing

Suggestions and improvements are welcome!

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Abir Hosen**
- GitHub: [@abirhosen30](https://github.com/abirhosen30)

---

⭐ If you like this project, give it a star!
