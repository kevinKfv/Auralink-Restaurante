# 🚀 Quick Start Guide

## Installation & Running

### Step 1: Install Dependencies
Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages (~2-3 minutes).

### Step 2: Start Development Server
```bash
npm run dev
```

The application will start at `http://localhost:5173`

### Step 3: Login
Use any of these credentials:

**Admin Access (Full System)**
- Email: `admin@restaurant.com`
- Password: `admin123`

**Cashier Access (POS Only)**
- Email: `cashier@restaurant.com`
- Password: `cashier123`

**Chef Access (Kitchen Display)**
- Email: `chef@restaurant.com`
- Password: `chef123`

**Delivery Access (Delivery Management)**
- Email: `delivery@restaurant.com`
- Password: `delivery123`

## 🎯 What to Try First

### 1. Dashboard (All Roles)
- View sales metrics
- Check low stock alerts
- See recent orders
- Explore charts

### 2. POS System (Admin/Cashier)
1. Select a table (click on any available table)
2. Add products by clicking on them
3. Adjust quantities with +/- buttons
4. Click "Confirm Order"
5. Select payment method (Cash or Card)

### 3. Kitchen Display (Admin/Chef)
1. See pending orders
2. Click "Start Preparing" to move to preparing column
3. Click "Mark as Ready" when done
4. Orders move through the workflow

### 4. Products Management (Admin)
1. Search or filter products
2. Click "Add Product" to create new items
3. Edit existing products
4. Toggle availability

### 5. Inventory (Admin)
1. View all ingredients
2. Check low stock alerts
3. Click "Add Ingredient" to add new items
4. Edit stock levels

## 🎨 Theme Toggle

Click the moon/sun icon in the header to switch between light and dark mode.

## 📱 Recommended Screen Size

- **Best Experience:** 1920x1080 or larger (Desktop)
- **Good Experience:** 1366x768 or larger (Laptop)
- **Acceptable:** 768px width or larger (Tablet)

## 🔄 Data Persistence

**Important:** All data is stored in memory and will reset when you refresh the page. This is a frontend-only demo with mock data.

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📚 Documentation

- **README.md** - Project overview
- **SETUP.md** - Detailed setup instructions
- **FEATURES.md** - Complete feature list
- **ARCHITECTURE.md** - Technical documentation
- **PROJECT_SUMMARY.md** - Project statistics

## 🐛 Troubleshooting

**Port 5173 already in use?**
```bash
# Kill the process or change port in vite.config.ts
```

**Dependencies not installing?**
```bash
# Clear cache and try again
npm cache clean --force
npm install
```

**TypeScript errors?**
```bash
# Check your Node.js version (needs 18+)
node --version
```

## 💡 Tips

1. **Use Quick Login Buttons** - On the login page, click role buttons to auto-fill credentials
2. **Explore All Roles** - Each role sees different menu items
3. **Try Dark Mode** - Toggle in the header for a different experience
4. **Check Animations** - Notice smooth transitions and modal animations
5. **Test Responsive** - Resize browser to see responsive design

## 🎓 Learning Path

If you're learning from this project:

1. **Start with:** Login.tsx and App.tsx (routing)
2. **Then explore:** UI components in components/ui/
3. **Understand state:** store/useAppStore.ts
4. **Study pages:** Start with Dashboard.tsx
5. **Learn patterns:** Check ARCHITECTURE.md

## 🔗 Key Files to Explore

```
src/
├── App.tsx              # Routing setup
├── store/useAppStore.ts # State management
├── components/ui/       # Reusable components
├── pages/Dashboard.tsx  # Good starting point
└── data/mockData.ts     # Sample data structure
```

## ✅ Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] Dev server running (`npm run dev`)
- [ ] Opened http://localhost:5173
- [ ] Logged in successfully
- [ ] Explored at least 3 modules
- [ ] Tried dark mode toggle
- [ ] Created a test order in POS
- [ ] Checked kitchen display

## 🎉 You're Ready!

The application is fully functional with mock data. Explore all modules and enjoy the demo!

---

**Need Help?** Check the other documentation files or review the code comments.
