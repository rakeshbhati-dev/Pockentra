<div align="center">

# Pockentra

**A modern, full-stack expense tracker built to simplify personal finance.**

Track income and expenses, manage spending categories, and visualize your financial habits — all from one clean, responsive dashboard.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)

</div>

---

## What is Pockentra?

Pockentra is a personal finance web application designed to give users full visibility into their money. Whether you're tracking daily spending, categorizing monthly bills, or reviewing income trends — Pockentra keeps everything organized in one place.

The app is built around a clean, distraction-free interface that makes logging transactions fast and reviewing your finances intuitive. No spreadsheets, no clutter — just your financial data, clearly presented.

---

## Core Features

### 🔐 Secure User Accounts
Every user gets a private, authenticated account. Your financial data is protected with industry-standard security — register once and access your dashboard from any device.

### 📊 Analytical Dashboard
The dashboard gives you an instant snapshot of your financial health. See your total income, total expenses, and current balance at a glance, with visual breakdowns that update in real time as you log transactions.

### 💸 Transaction Management
Add income or expense entries in seconds. Every transaction includes an amount, date, category, and optional note. You can edit or delete any entry at any time, keeping your records accurate and up to date.

### 🗂️ Category System
Organize transactions with fully customizable categories — each with its own icon and color. Whether it's groceries, freelance income, rent, or entertainment, categories make it easy to understand exactly where your money is going.

### 📈 Charts & Reports
Pockentra visualizes your data through interactive charts:
- **Pie/donut charts** for spending breakdown by category

### 🔍 Search, Filter & Sort
Quickly find any transaction using keyword search, or narrow results by category, date range, or transaction type. Sort by date or amount to surface what matters most.

### 📱 Responsive Design
Pockentra is fully responsive and works seamlessly across desktop, tablet, and mobile — so your finances are always accessible, wherever you are.

---

## User Experience

The Pockentra workflow is intentionally simple:

1. **Sign up** and land directly on your personal dashboard
2. **Add a transaction** — choose income or expense, pick a category, enter an amount
3. **Review your dashboard** — watch your balance, charts, and summaries update instantly
4. **Explore your history** — search, filter, and sort past transactions with ease
5. **Analyze patterns** — use charts and category breakdowns to understand spending trends

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Auth | JWT, bcrypt |
| Charts | Recharts |
| HTTP Client | Axios |

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or [Atlas](https://mongodb.com/atlas))

### Installation

```bash
# Clone the repository
git clone https://github.com/rakeshbhati-dev/pockentra.git
cd pockentra

# Install dependencies for both client and server
cd server && npm install
cd client && npm install
```

### Environment Setup

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Run the App

```bash
# Start the backend (from /server)
npm run dev

# Start the frontend (from /client)
npm run dev
```

Frontend runs on `http://localhost:5173` · Backend runs on `http://localhost:5000`

---

## Roadmap

Future improvements planned for Pockentra:

- [ ] Export transactions to CSV or PDF
- [ ] Recurring transactions (subscriptions, salaries)
- [ ] Monthly budget limits with overspend alerts
- [ ] Multi-currency support
- [ ] Google OAuth login
- [ ] Email summaries and spending reports

---


<div align="center">

Designed and built by **[Rakesh Bhati](https://github.com/rakeshbhati-dev)**

[GitHub](https://github.com/rakeshbhati-dev) · [LinkedIn](https://linkedin.com/in/rakesh-bhati) · [Portfolio](https://rakeshbhati.netlify.app/)

</div>
