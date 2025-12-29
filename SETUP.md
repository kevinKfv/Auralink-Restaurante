# Restaurant ERP - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - Navigate to `http://localhost:5173`
   - The login page will appear

### Default Login Credentials

| Role     | Email                      | Password    |
|----------|----------------------------|-------------|
| Admin    | admin@restaurant.com       | admin123    |
| Cashier  | cashier@restaurant.com     | cashier123  |
| Chef     | chef@restaurant.com        | chef123     |
| Delivery | delivery@restaurant.com    | delivery123 |

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   └── Table.tsx
│   └── layout/          # Layout components
│       ├── Layout.tsx
│       ├── Sidebar.tsx
│       └── Header.tsx
├── pages/               # Page components
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── POS.tsx
│   ├── Kitchen.tsx
│   ├── Delivery.tsx
│   ├── Inventory.tsx
│   ├── Products.tsx
│   └── Reports.tsx
├── store/               # Zustand state management
│   └── useAppStore.ts
├── types/               # TypeScript definitions
│   └── index.ts
├── data/                # Mock data
│   └── mockData.ts
├── lib/                 # Utilities
│   └── utils.ts
├── App.tsx              # Main app component
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## 🎯 Features by Module

### 1. Dashboard
- Real-time sales metrics
- Sales trend charts (7 days)
- Category performance pie chart
- Recent orders list
- Low stock alerts

### 2. POS / Table Service
- Visual table grid with status indicators
- Product catalog with category filters
- Shopping cart with quantity management
- Payment processing (Cash/Card)
- Order creation and table assignment

### 3. Kitchen Display System (KDS)
- Three-column kanban board (Pending, Preparing, Ready)
- Order time tracking with urgency indicators
- One-click status updates
- Real-time order details

### 4. Delivery Management
- Delivery orders table
- Rider status tracking
- Map placeholder for route visualization
- Order assignment to riders
- ETA tracking

### 5. Inventory Management
- Complete ingredient list with stock levels
- Low stock alerts
- Add/Edit ingredient functionality
- Stock status indicators (Critical, Low, Normal, High)
- Total inventory value calculation

### 6. Products & Menu
- Product catalog with category filtering
- Add/Edit/Delete products
- Availability toggle
- Price management
- Category assignment

### 7. Reports & Analytics
- Revenue and order trends
- Category sales distribution
- Cost vs Profit analysis
- Top performing categories
- Detailed performance tables

## 🎨 Theme System

The app supports both light and dark modes:
- Toggle via the moon/sun icon in the header
- Persists across page navigation
- All components are theme-aware

## 🔐 Role-Based Access

Different user roles see different menu items:

- **Admin**: Full access to all modules
- **Cashier**: Dashboard, POS
- **Chef**: Dashboard, Kitchen Display
- **Delivery**: Dashboard, Delivery Management

## 🛠️ Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Router v6** - Routing
- **Recharts** - Data visualization
- **Framer Motion** - Animations
- **Lucide React** - Icons

## 📝 Mock Data

All data is stored in memory using Zustand. Changes persist during the session but reset on page refresh.

Mock data includes:
- 4 users (one per role)
- 10 tables
- 6 product categories
- 13 products
- 3 sample orders
- 3 delivery riders
- 26 ingredients
- 7 days of sales data

## 🚀 Build for Production

```bash
npm run build
```

The production build will be in the `dist/` folder.

## 🔧 Development Tips

1. **Hot Module Replacement (HMR)** is enabled - changes reflect instantly
2. **TypeScript** provides autocomplete and type checking
3. **ESLint** is configured for code quality
4. Use the browser's React DevTools for debugging

## 📦 Adding New Features

### Adding a New Page
1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation item in `src/components/layout/Sidebar.tsx`

### Adding New State
1. Add state and actions to `src/store/useAppStore.ts`
2. Use the hook in your components: `const { state, action } = useAppStore()`

### Adding New Mock Data
1. Define types in `src/types/index.ts`
2. Add data in `src/data/mockData.ts`
3. Initialize in the store

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Change port in vite.config.ts or kill the process
npx kill-port 5173
```

**Dependencies issues:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors:**
```bash
# Check types
npm run build
```

## 📄 License

MIT License - Feel free to use this project for learning or commercial purposes.
