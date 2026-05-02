# 🌕 MOON — Stellar x402 API Monetization Protocol

[![Stellar Network](https://img.shields.io/badge/Network-Stellar-black?style=flat&logo=stellar)](https://stellar.org)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

**MOON** is an open-source protocol built on Stellar that enables developers to instantly monetize any API endpoint using the **x402** machine-to-machine payment standard.

> This project is currently a foundational scaffold for the **Drips Wave** hackathon/contribution program. We've implemented the core flow and are actively looking for contributors to help build out the full vision!

---

## 🌟 Why MOON Matters

Currently, API monetization is broken:
- Developers must set up complex Stripe integrations, recurring billing, and user dashboards.
- API Consumers have to commit to monthly subscriptions even if they only need a few requests.

**MOON changes everything.**
By utilizing the x402 protocol with the low fees and high speed of the Stellar Network, MOON allows developers to charge *per request*. Consumers only pay for exactly what they use.

## ⚙️ How x402 + Stellar Works (The Simple Version)

1. **The Request:** A client tries to access a protected API endpoint (e.g., `/api/demo`).
2. **The Challenge (402):** The server rejects the request with a `402 Payment Required` status, returning a challenge header specifying the required price (e.g., 1 USDC) and the destination Stellar address.
3. **The Payment:** The client uses their Stellar wallet (like Freighter) to generate and sign a micro-transaction meeting the requirements.
4. **The Fulfillment:** The client re-sends the request, this time including the signed transaction in the `Authorization` header. The server verifies and executes the transaction on Stellar, then serves the premium content!

---

## 🏗 Architecture Overview

The scaffold uses a clean separation of concerns:

- **Backend (Express in `server/`)**: Uses `@x402/express` and `@x402/stellar` to protect API endpoints and handle the x402 challenge/verification loop automatically.
- **Frontend (Next.js in Root)**: Uses `@x402/fetch` to automatically handle `402 Payment Required` responses, interact with the user's Stellar wallet (via `StellarSigner`), and seamlessly complete the payment flow.

---

## 📂 Folder Structure

```
moon_Stellar/
├── server/
│   ├── index.js                 # Express Backend + x402 Middleware
│   └── package.json             # Backend dependencies
├── src/
│   ├── app/
│   │   ├── globals.css          # Tailwind Styles
│   │   ├── layout.tsx           # Root Layout
│   │   └── page.tsx             # Interactive UI & Demo (uses @x402/fetch)
│   └── lib/
│       └── supabase.ts          # Supabase client (can be moved to server if needed)
├── public/                      # Static assets
├── package.json                 # Frontend dependencies
└── README.md
```

---

## 🚀 Setup Instructions

You need to run both the frontend and the backend.

### 1. Setup the Backend
```bash
cd server
npm install
npm run dev
```
*(The Express server will start on `http://localhost:3001`)*

### 2. Setup the Frontend
Open a new terminal in the root directory:
```bash
npm install
npm run dev
```
*(The Next.js frontend will start on `http://localhost:3000`)*

4. **Experience the Demo:**
   Open [http://localhost:3000](http://localhost:3000) and click the "Call Protected Endpoint" button to see the mocked x402 flow in your browser console / UI.

---

## 🤝 Contribution Guide (Drips Wave)

Welcome, contributors! This repository has been explicitly designed with clear "hooks" and `TODO:` comments where your expertise is needed. 

To contribute:
1. Find an issue below or search the codebase for `TODO:` comments.
2. Fork the repo and create a new branch.
3. Submit a PR with a clear description of your implementation.

### 💡 Suggested Issues & Good First Issues

- **[Wave Issue] Full Transaction Settlement:** Update `StellarPaymentScheme.verifyAuthorization` to properly submit the client's XDR transaction to the Stellar network using the SDK, rather than just mocking the signature check.
- **[Wave Issue] Freighter Wallet Integration:** Update the frontend demo (`src/app/page.tsx`) to connect to the user's Freighter wallet instead of using a hardcoded dummy secret.
- **[Good First Issue] Dynamic Pricing Database:** Connect `middleware.ts` to a basic database (e.g., Supabase or SQLite) so the `requiredPrice` and `destination` are fetched dynamically based on the requested endpoint path.
- **[Enhancement] Dashboard UI:** Create a `/dashboard` route where developers can "register" a new endpoint and specify its price.
- **[Good First Issue] Multi-token Support:** Add support for charging in different Stellar assets (e.g., XLM, USDC, EURC).

---

Let's build the future of API monetization together! 🚀🌕
