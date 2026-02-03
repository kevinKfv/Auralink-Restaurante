# Restaurant & Bar ERP System - Frontend

A modern, full-featured ERP system for restaurants and bars built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **POS System** - Table service management and order creation
- **Kitchen Display (KDS)** - Real-time order tracking for kitchen staff
- **Delivery Management** - Order tracking, rider assignment, and ETA monitoring
- **Inventory Control** - Stock management, ingredient tracking, and low-stock alerts
- **Products & Recipes** - Menu management with ingredient relationships
- **Dashboard & Reports** - Sales analytics and business insights
- **Dark Mode** - Full dark/light theme support
- **Responsive Design** - Optimized for desktop and tablet devices

## 🛠️ Tech Stack

- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Routing:** React Router v6
- **Charts:** Recharts
- **Icons:** Lucide React
- **Animations:** Framer Motion

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Design System

- **Color Palette:** Green/Teal accent with neutral backgrounds
- **Typography:** Inter font family
- **Components:** Custom UI library with consistent styling
- **Theme:** Dark/Light mode toggle

## 👥 User Roles

- **Admin** - Full system access
- **Cashier** - POS and order management
- **Chef** - Kitchen display access
- **Delivery** - Delivery management interface

## 📱 Default Login Credentials

- **Admin:** admin@restaurant.com / admin123
- **Cashier:** cashier@restaurant.com / cashier123
- **Chef:** chef@restaurant.com / chef123
- **Delivery:** delivery@restaurant.com / delivery123

## 📂 Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── layout/       # Layout components (Sidebar, Header)
│   ├── charts/       # Chart components
│   └── forms/        # Form components
├── pages/            # Page components
├── store/            # Zustand state management
├── types/            # TypeScript type definitions
├── data/             # Mock data
└── lib/              # Utility functions
```

## 🎯 Mock Data

This is a frontend-only implementation using mock data. All data is stored in memory and resets on page refresh.

## 📄 License

MIT
