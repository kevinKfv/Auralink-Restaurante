# Restaurant ERP - Architecture Documentation

## 🏗️ System Architecture

### Frontend Architecture
```
┌─────────────────────────────────────────────────────────┐
│                     Browser (Client)                     │
├─────────────────────────────────────────────────────────┤
│                    React Application                     │
│  ┌────────────┬──────────────┬────────────────────────┐ │
│  │   Router   │  Components  │    State Management    │ │
│  │ (React     │  (UI Layer)  │      (Zustand)        │ │
│  │  Router)   │              │                        │ │
│  └────────────┴──────────────┴────────────────────────┘ │
│  ┌──────────────────────────────────────────────────┐   │
│  │              Mock Data Layer                      │   │
│  │         (Simulates Backend API)                   │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## 📦 Component Hierarchy

### Layout Structure
```
App
└── BrowserRouter
    ├── Login (Public Route)
    └── Layout (Protected Routes)
        ├── Sidebar
        │   ├── Logo
        │   ├── Navigation Menu
        │   └── User Profile
        ├── Header
        │   ├── Page Title
        │   ├── Notifications
        │   └── Theme Toggle
        └── Main Content
            ├── Dashboard
            ├── POS
            ├── Kitchen
            ├── Delivery
            ├── Inventory
            ├── Products
            └── Reports
```

### Component Categories

**1. Layout Components**
- `Layout.tsx` - Main layout wrapper with authentication check
- `Sidebar.tsx` - Navigation sidebar with role-based menu
- `Header.tsx` - Top header with theme toggle and notifications

**2. UI Components (Reusable)**
- `Button.tsx` - Multi-variant button component
- `Card.tsx` - Card container with sub-components
- `Modal.tsx` - Animated modal with backdrop
- `Input.tsx` - Form input with label and error states
- `Badge.tsx` - Status badge with variants
- `Table.tsx` - Data table with sub-components

**3. Page Components**
- `Login.tsx` - Authentication page
- `Dashboard.tsx` - Overview and metrics
- `POS.tsx` - Point of sale interface
- `Kitchen.tsx` - Kitchen display system
- `Delivery.tsx` - Delivery management
- `Inventory.tsx` - Stock management
- `Products.tsx` - Menu management
- `Reports.tsx` - Analytics and reports

## 🔄 Data Flow

### State Management Flow (Zustand)
```
┌──────────────┐
│  Component   │
└──────┬───────┘
       │ useAppStore()
       ↓
┌──────────────┐
│  Zustand     │
│  Store       │
└──────┬───────┘
       │ State + Actions
       ↓
┌──────────────┐
│  Mock Data   │
│  Layer       │
└──────────────┘
```

### Order Creation Flow
```
User Action → Add to Cart → Update State → Display Cart
                                ↓
                         Confirm Order
                                ↓
                    Create Order in Store
                                ↓
                    Update Table Status
                                ↓
                    Show in Kitchen Display
```

### Authentication Flow
```
Login Page → Enter Credentials → Validate User
                                      ↓
                                Set User State
                                      ↓
                                Redirect to Dashboard
                                      ↓
                            Role-Based Menu Display
```

## 🗂️ File Organization

### Directory Structure
```
src/
├── components/          # Reusable components
│   ├── ui/             # UI primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   └── Table.tsx
│   └── layout/         # Layout components
│       ├── Layout.tsx
│       ├── Sidebar.tsx
│       └── Header.tsx
├── pages/              # Page components
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── POS.tsx
│   ├── Kitchen.tsx
│   ├── Delivery.tsx
│   ├── Inventory.tsx
│   ├── Products.tsx
│   └── Reports.tsx
├── store/              # State management
│   └── useAppStore.ts
├── types/              # TypeScript types
│   └── index.ts
├── data/               # Mock data
│   └── mockData.ts
├── lib/                # Utilities
│   └── utils.ts
├── App.tsx             # Root component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 🎯 Design Patterns

### 1. Component Composition
Components are built using composition pattern for flexibility:
```typescript
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content
  </CardContent>
</Card>
```

### 2. Custom Hooks
State management through custom Zustand hooks:
```typescript
const { orders, createOrder } = useAppStore();
```

### 3. Prop Drilling Prevention
Using Zustand to avoid prop drilling:
```typescript
// Instead of passing props through multiple levels
// Access state directly in any component
const theme = useAppStore(state => state.theme);
```

### 4. Compound Components
UI components with related sub-components:
```typescript
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Header</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Data</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## 🔐 Security Architecture

### Authentication
- Session-based authentication
- Role-based access control (RBAC)
- Protected routes with redirect
- User state persistence

### Authorization
```typescript
// Route protection
if (!isAuthenticated) return <Navigate to="/login" />

// Role-based menu filtering
const filteredNavigation = navigation.filter(item =>
  item.roles.includes(currentUser?.role)
);
```

## 🎨 Styling Architecture

### Tailwind CSS Approach
- Utility-first CSS
- Dark mode support via `dark:` prefix
- Custom color palette in config
- Responsive design with breakpoints

### Theme System
```typescript
// Light/Dark mode toggle
const toggleTheme = () => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  document.documentElement.classList.toggle('dark');
};
```

## 📊 Data Models

### Core Entities

**User**
```typescript
{
  id: string
  email: string
  name: string
  role: 'admin' | 'cashier' | 'chef' | 'delivery'
}
```

**Table**
```typescript
{
  id: string
  number: number
  capacity: number
  status: 'available' | 'occupied' | 'reserved'
  currentOrder?: string
}
```

**Product**
```typescript
{
  id: string
  name: string
  description: string
  price: number
  categoryId: string
  available: boolean
  ingredients?: string[]
}
```

**Order**
```typescript
{
  id: string
  tableId?: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'preparing' | 'ready' | 'delivered'
  createdAt: Date
  updatedAt: Date
  isDelivery?: boolean
}
```

**Ingredient**
```typescript
{
  id: string
  name: string
  unit: string
  currentStock: number
  minStock: number
  maxStock: number
  cost: number
}
```

## 🔄 State Management

### Zustand Store Structure
```typescript
interface AppState {
  // Auth
  currentUser: User | null
  isAuthenticated: boolean
  login: (email, password) => boolean
  logout: () => void
  
  // Theme
  theme: 'light' | 'dark'
  toggleTheme: () => void
  
  // Business Logic
  tables: Table[]
  products: Product[]
  orders: Order[]
  ingredients: Ingredient[]
  
  // Actions
  createOrder: (...) => void
  updateOrderStatus: (...) => void
  addProduct: (...) => void
  updateIngredientStock: (...) => void
}
```

## 🚀 Performance Considerations

### Optimization Strategies
1. **Code Splitting** - Ready for route-based splitting
2. **Lazy Loading** - Can implement for heavy components
3. **Memoization** - Use React.memo for expensive renders
4. **Virtual Scrolling** - Can add for large lists
5. **Debouncing** - Implemented in search inputs

### Bundle Size
- Vite optimizes bundle automatically
- Tree-shaking removes unused code
- Production build is minified

## 🧪 Testing Strategy (Future)

### Recommended Testing Approach
```
Unit Tests (Jest + React Testing Library)
├── Component tests
├── Hook tests
└── Utility function tests

Integration Tests
├── User flow tests
├── State management tests
└── Route navigation tests

E2E Tests (Playwright/Cypress)
├── Login flow
├── Order creation flow
└── Complete user journeys
```

## 🔌 API Integration (Future)

### Backend Integration Points
```typescript
// Replace mock data with API calls
const createOrder = async (orderData) => {
  const response = await fetch('/api/orders', {
    method: 'POST',
    body: JSON.stringify(orderData)
  });
  return response.json();
};
```

### Suggested Backend Structure
```
REST API Endpoints:
- POST   /api/auth/login
- POST   /api/auth/logout
- GET    /api/tables
- GET    /api/products
- POST   /api/orders
- PATCH  /api/orders/:id
- GET    /api/inventory
- PATCH  /api/inventory/:id
- GET    /api/reports/sales
```

## 📱 Responsive Design Strategy

### Breakpoints
- Mobile: < 768px (limited support)
- Tablet: 768px - 1024px (optimized)
- Desktop: > 1024px (primary target)

### Responsive Patterns
```typescript
// Grid adjustments
grid-cols-1 md:grid-cols-2 lg:grid-cols-4

// Flex direction changes
flex-col md:flex-row

// Conditional rendering
{isMobile ? <MobileView /> : <DesktopView />}
```

## 🔧 Development Workflow

### Local Development
1. Start dev server: `npm run dev`
2. Hot reload on file changes
3. TypeScript type checking
4. ESLint for code quality

### Build Process
1. TypeScript compilation
2. Vite bundling
3. CSS optimization
4. Asset optimization
5. Output to `dist/`

## 📈 Scalability Considerations

### Current Limitations
- In-memory state (resets on refresh)
- No data persistence
- No real-time updates
- Single-user session

### Scalability Path
1. Add backend API
2. Implement database
3. Add WebSocket for real-time
4. Implement caching strategy
5. Add CDN for assets
6. Implement load balancing

## 🎓 Learning Resources

### Key Concepts Used
- React Hooks (useState, useEffect)
- TypeScript interfaces and types
- Zustand state management
- React Router navigation
- Tailwind CSS utilities
- Framer Motion animations
- Recharts data visualization

### Best Practices Implemented
- Component composition
- Single responsibility principle
- DRY (Don't Repeat Yourself)
- Separation of concerns
- Type safety with TypeScript
- Consistent naming conventions
- Modular file structure
