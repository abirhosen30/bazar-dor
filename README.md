<div align="center">

# 🛒 Bazar Dor

**Bangladesh's daily market prices — all in one place, at a glance.**

Browse products, compare market-wise prices, and see which items are going up or down in price.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-success?style=for-the-badge)](https://bazar-dor-lime-nine.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Deployed-000?style=for-the-badge&logo=vercel)](https://vercel.com/)

🔗 **Live Site:** [bazar-dor-lime-nine.vercel.app](https://bazar-dor-lime-nine.vercel.app)

</div>

---

## 📖 About

**Bazar Dor** is a modern, responsive web application for browsing market products, comparing prices, and tracking price changes. It was built as part of the Programming Hero assignment **B14-A7**.

---

## ✨ Key Features

- 📅 **Bangla date**, category navigation, and a live market price **ticker**
- 🖼️ Hero banner linking to all products, plus a **responsive product grid**
- 📈 Lists of products with the **biggest price increases and decreases**
- 🔢 Bangla numerals, units, and price-change **badges**
- 🔃 **Category sorting** by price
- 🔒 Login-protected **product details** page with market-wise prices
- 🔐 **Authentication** with email/password, Google, and GitHub
- 👤 Profile name update
- ⏳ Loading skeletons and a friendly **404 page**
- 📱 Fully responsive on mobile, tablet, and desktop

---

## 🧰 Tech Stack

| Category       | Technology                                   |
| -------------- | -------------------------------------------- |
| Framework      | Next.js 16 (App Router)                      |
| UI Library     | React 19                                     |
| Language       | TypeScript                                   |
| Styling        | Tailwind CSS 4, DaisyUI                      |
| Authentication | Better Auth (Email/Password, Google, GitHub) |
| Database       | MongoDB                                      |
| Data Source    | Programming Hero Bazar Dor API               |
| Deployment     | Vercel                                       |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- npm or yarn
- A MongoDB database (local or Atlas)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/abirhosen30/bazar-dor.git

# 2. Go to the project folder
cd bazar-dor

# 3. Install dependencies
npm install
```

### 🔑 Environment Variables

Create a `.env` file in the project root and add the following variables:

```env
MONGODB_URL=
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

> **Required:** `MONGODB_URL`, `BETTER_AUTH_URL`, and `BETTER_AUTH_SECRET`

**To enable Google / GitHub OAuth:**

1. Add each provider's **Client ID** and **Client Secret** to `.env`.
2. Register the following callback URLs in the provider's OAuth console:
   - Google → `http://localhost:3000/api/auth/callback/google`
   - GitHub → `http://localhost:3000/api/auth/callback/github`

### ▶️ Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 📦 Build for production

```bash
npm run build
npm run start
```

---

## 🌐 Deployment (Vercel)

This project is deployed on **Vercel**. Every push to the `main` branch triggers an automatic redeploy.

When deploying to production:

- Add all the production values above in Vercel under **Project Settings → Environment Variables**.
- Set `BETTER_AUTH_URL` to your production site's canonical origin (for example, `https://example.com`).
- Vercel's deployment and production URLs are automatically added to Better Auth's trusted origins.
- After changing any environment variable, trigger a **new deployment**.

> ⚠️ **Warning:** Never commit secrets or your `.env` file to source control.

---

## 🤝 Contributing

Suggestions and improvements are welcome!

1. **Fork** the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a **Pull Request**

---

## 👨‍💻 Author

**Abir Hosen**

[![GitHub](https://img.shields.io/badge/GitHub-@abirhosen30-181717?style=flat-square&logo=github)](https://github.com/abirhosen30)

---

<div align="center">

⭐ If you like this project, give it a star!

</div>
