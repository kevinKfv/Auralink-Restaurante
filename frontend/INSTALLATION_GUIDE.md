# 📦 Complete Installation Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** version 18.0.0 or higher
- **npm** version 9.0.0 or higher (comes with Node.js)

### Check Your Versions
```bash
node --version   # Should show v18.x.x or higher
npm --version    # Should show 9.x.x or higher
```

### Install Node.js (if needed)
Download from: https://nodejs.org/

## 📥 Installation Steps

### Step 1: Navigate to Project Directory
```bash
cd c:/Users/sebal/Desktop/Demo-Restaurante
```

### Step 2: Install Dependencies
```bash
npm install
```

**What this does:**
- Installs React, TypeScript, and all dependencies
- Sets up Vite build tool
- Installs Tailwind CSS and plugins
- Downloads UI libraries (Recharts, Framer Motion, etc.)
- Total download size: ~200MB
- Time required: 2-3 minutes

**Expected Output:**
```
added 300+ packages in 2m
```

### Step 3: Verify Installation
```bash
npm list --depth=0
```

You should see all dependencies listed without errors.

## 🚀 Running the Application

### Development Mode (Recommended)
```bash
npm run dev
```

**What happens:**
- Vite starts development server
- Application available at `http://localhost:5173`
- Hot Module Replacement (HMR) enabled
- Changes reflect instantly in browser

**Expected Output:**
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### Production Build
```bash
npm run build
```

**What this does:**
- Compiles TypeScript to JavaScript
- Bundles all files with Vite
- Optimizes and minifies code
- Outputs to `dist/` folder
- Time required: ~30 seconds

### Preview Production Build
```bash
npm run preview
```

Serves the production build locally for testing.

## 🌐 Accessing the Application

1. **Open Browser**
   - Navigate to `http://localhost:5173`
   - Or click the link in terminal (Ctrl+Click)

2. **Login Page Appears**
   - You'll see the login screen
   - Use quick login buttons or enter credentials

3. **Default Credentials**
   ```
   Admin:    admin@restaurant.com / admin123
   Cashier:  cashier@restaurant.com / cashier123
   Chef:     chef@restaurant.com / chef123
   Delivery: delivery@restaurant.com / delivery123
   ```

## 📁 Project Structure After Installation

```
Demo-Restaurante/
├── node_modules/          # Dependencies (created after npm install)
├── dist/                  # Production build (created after npm run build)
├── src/                   # Source code
│   ├── components/
│   ├── pages/
│   ├── store/
│   ├── types/
│   ├── data/
│   └── lib/
├── public/                # Static assets
├── package.json           # Dependencies list
├── package-lock.json      # Locked versions (created after npm install)
├── tsconfig.json          # TypeScript config
├── vite.config.ts         # Vite config
├── tailwind.config.js     # Tailwind config
└── Documentation files
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server with HMR
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Utility
npm list             # List installed packages
npm outdated         # Check for updates
npm audit            # Security audit
```

## 🐛 Common Issues & Solutions

### Issue 1: Port 5173 Already in Use
**Error:** `Port 5173 is already in use`

**Solution:**
```bash
# Option 1: Kill the process
npx kill-port 5173

# Option 2: Use different port
# Edit vite.config.ts and add:
server: { port: 3000 }
```

### Issue 2: Dependencies Installation Fails
**Error:** `npm ERR! code ERESOLVE`

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue 3: TypeScript Errors
**Error:** `Cannot find module '@/...'`

**Solution:**
- Ensure you're in the correct directory
- Check tsconfig.json has correct paths
- Restart your IDE/editor

### Issue 4: Vite Not Starting
**Error:** `Command not found: vite`

**Solution:**
```bash
# Reinstall dependencies
npm install

# Or run directly
npx vite
```

### Issue 5: Module Not Found
**Error:** `Cannot find module 'react'`

**Solution:**
```bash
# Install missing dependency
npm install react react-dom

# Or reinstall all
npm install
```

## 🔍 Verifying Installation

### Checklist
- [ ] Node.js 18+ installed
- [ ] npm install completed without errors
- [ ] Dev server starts successfully
- [ ] Browser opens to login page
- [ ] No console errors in browser
- [ ] Can login and navigate

### Test Commands
```bash
# Check if all files exist
ls src/pages/        # Should show 8 page files
ls src/components/   # Should show ui/ and layout/

# Verify TypeScript compilation
npx tsc --noEmit     # Should complete without errors

# Check for missing dependencies
npm ls               # Should show tree without errors
```

## 📊 Installation Success Indicators

✅ **Successful Installation:**
```
✓ Dependencies installed
✓ No vulnerability warnings
✓ Dev server starts
✓ Application loads in browser
✓ No console errors
✓ Login works
```

❌ **Failed Installation:**
```
✗ npm install errors
✗ Missing dependencies
✗ Server won't start
✗ Blank page in browser
✗ Console errors
```

## 🎯 Next Steps After Installation

1. **Read Documentation**
   - Start with README.md
   - Check QUICKSTART.md for usage
   - Review FEATURES.md for capabilities

2. **Explore the Application**
   - Login as different roles
   - Try creating orders in POS
   - Check kitchen display
   - View reports

3. **Customize (Optional)**
   - Modify colors in tailwind.config.js
   - Add your own mock data
   - Customize components

## 💻 Development Environment Setup

### Recommended IDE
**Visual Studio Code** with extensions:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)

### VS Code Settings
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## 🔐 Security Notes

- No sensitive data in code
- All credentials are for demo only
- No backend connections
- Safe to use on any network
- No data leaves your machine

## 📈 Performance Tips

1. **Development:**
   - Use `npm run dev` for fast HMR
   - Keep dev tools open for debugging
   - Use React DevTools extension

2. **Production:**
   - Run `npm run build` before deploying
   - Serve from `dist/` folder
   - Use CDN for static assets (future)

## 🆘 Getting Help

If you encounter issues:

1. **Check Documentation**
   - SETUP.md
   - QUICKSTART.md
   - This file

2. **Common Solutions**
   - Clear cache: `npm cache clean --force`
   - Reinstall: `rm -rf node_modules && npm install`
   - Update Node.js to latest LTS

3. **Debug Steps**
   - Check browser console for errors
   - Check terminal for build errors
   - Verify all files are present
   - Check Node.js version

## ✅ Installation Complete!

If you've reached this point successfully:
- ✅ All dependencies installed
- ✅ Application running
- ✅ Ready to explore

**Next:** Open QUICKSTART.md to learn how to use the application!

---

**Installation Time:** ~5 minutes total
**Disk Space Required:** ~300MB (including node_modules)
**Internet Required:** Only for initial npm install
