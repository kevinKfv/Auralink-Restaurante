import { User, Table, Category, Product, Order, Rider, Ingredient, Recipe, SalesData, CategorySales, Notification } from '@/types';

export const mockUsers: User[] = [
  { id: '1', email: 'admin@restaurant.com', name: 'Admin User', role: 'admin' },
  { id: '2', email: 'cashier@restaurant.com', name: 'John Cashier', role: 'cashier' },
  { id: '3', email: 'chef@restaurant.com', name: 'Chef Maria', role: 'chef' },
  { id: '4', email: 'delivery@restaurant.com', name: 'Delivery Manager', role: 'delivery' },
];

export const mockTables: Table[] = [
  { id: 't1', number: 1, capacity: 2, status: 'available' },
  { id: 't2', number: 2, capacity: 4, status: 'occupied', currentOrder: 'o1' },
  { id: 't3', number: 3, capacity: 4, status: 'available' },
  { id: 't4', number: 4, capacity: 6, status: 'reserved' },
  { id: 't5', number: 5, capacity: 2, status: 'available' },
  { id: 't6', number: 6, capacity: 4, status: 'occupied', currentOrder: 'o2' },
  { id: 't7', number: 7, capacity: 8, status: 'available' },
  { id: 't8', number: 8, capacity: 2, status: 'available' },
  { id: 't9', number: 9, capacity: 4, status: 'available' },
  { id: 't10', number: 10, capacity: 6, status: 'available' },
];

export const mockCategories: Category[] = [
  { id: 'c1', name: 'Appetizers', icon: '🥗' },
  { id: 'c2', name: 'Main Course', icon: '🍽️' },
  { id: 'c3', name: 'Desserts', icon: '🍰' },
  { id: 'c4', name: 'Beverages', icon: '🥤' },
  { id: 'c5', name: 'Cocktails', icon: '🍹' },
  { id: 'c6', name: 'Pizza', icon: '🍕' },
];

export const mockProducts: Product[] = [
  { id: 'p1', name: 'Caesar Salad', description: 'Fresh romaine lettuce with caesar dressing', price: 12.99, categoryId: 'c1', available: true, ingredients: ['i1', 'i2', 'i3'] },
  { id: 'p2', name: 'Bruschetta', description: 'Toasted bread with tomatoes and basil', price: 9.99, categoryId: 'c1', available: true, ingredients: ['i4', 'i5'] },
  { id: 'p3', name: 'Grilled Salmon', description: 'Fresh salmon with vegetables', price: 24.99, categoryId: 'c2', available: true, ingredients: ['i6', 'i7'] },
  { id: 'p4', name: 'Ribeye Steak', description: 'Premium ribeye with mashed potatoes', price: 32.99, categoryId: 'c2', available: true, ingredients: ['i8', 'i9'] },
  { id: 'p5', name: 'Chicken Alfredo', description: 'Creamy pasta with grilled chicken', price: 18.99, categoryId: 'c2', available: true, ingredients: ['i10', 'i11', 'i12'] },
  { id: 'p6', name: 'Tiramisu', description: 'Classic Italian dessert', price: 8.99, categoryId: 'c3', available: true, ingredients: ['i13', 'i14'] },
  { id: 'p7', name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with ice cream', price: 9.99, categoryId: 'c3', available: true, ingredients: ['i15', 'i16'] },
  { id: 'p8', name: 'Coca Cola', description: 'Classic soft drink', price: 3.99, categoryId: 'c4', available: true },
  { id: 'p9', name: 'Fresh Orange Juice', description: 'Freshly squeezed orange juice', price: 5.99, categoryId: 'c4', available: true, ingredients: ['i17'] },
  { id: 'p10', name: 'Mojito', description: 'Classic Cuban cocktail', price: 11.99, categoryId: 'c5', available: true, ingredients: ['i18', 'i19', 'i20'] },
  { id: 'p11', name: 'Margarita', description: 'Tequila-based cocktail', price: 12.99, categoryId: 'c5', available: true, ingredients: ['i21', 'i22'] },
  { id: 'p12', name: 'Margherita Pizza', description: 'Classic tomato and mozzarella', price: 14.99, categoryId: 'c6', available: true, ingredients: ['i23', 'i24', 'i25'] },
  { id: 'p13', name: 'Pepperoni Pizza', description: 'Tomato, mozzarella, and pepperoni', price: 16.99, categoryId: 'c6', available: true, ingredients: ['i23', 'i24', 'i26'] },
];

export const mockOrders: Order[] = [
  {
    id: 'o1',
    tableId: 't2',
    tableNumber: 2,
    items: [
      { productId: 'p1', productName: 'Caesar Salad', quantity: 2, price: 12.99 },
      { productId: 'p3', productName: 'Grilled Salmon', quantity: 1, price: 24.99 },
    ],
    total: 50.97,
    status: 'preparing',
    createdAt: new Date(Date.now() - 1000 * 60 * 15),
    updatedAt: new Date(Date.now() - 1000 * 60 * 10),
  },
  {
    id: 'o2',
    tableId: 't6',
    tableNumber: 6,
    items: [
      { productId: 'p12', productName: 'Margherita Pizza', quantity: 1, price: 14.99 },
      { productId: 'p10', productName: 'Mojito', quantity: 2, price: 11.99 },
    ],
    total: 38.97,
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
    updatedAt: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: 'o3',
    isDelivery: true,
    deliveryAddress: '123 Main St, Apt 4B',
    items: [
      { productId: 'p13', productName: 'Pepperoni Pizza', quantity: 2, price: 16.99 },
      { productId: 'p8', productName: 'Coca Cola', quantity: 2, price: 3.99 },
    ],
    total: 41.96,
    status: 'ready',
    createdAt: new Date(Date.now() - 1000 * 60 * 20),
    updatedAt: new Date(Date.now() - 1000 * 60 * 2),
    riderId: 'r1',
  },
];

export const mockRiders: Rider[] = [
  { id: 'r1', name: 'Mike Rider', phone: '+1234567890', status: 'busy', currentOrders: ['o3'] },
  { id: 'r2', name: 'Sarah Driver', phone: '+1234567891', status: 'available', currentOrders: [] },
  { id: 'r3', name: 'Tom Delivery', phone: '+1234567892', status: 'available', currentOrders: [] },
];

export const mockIngredients: Ingredient[] = [
  { id: 'i1', name: 'Romaine Lettuce', unit: 'kg', currentStock: 15, minStock: 5, maxStock: 30, cost: 3.5, category: 'vegetables' },
  { id: 'i2', name: 'Caesar Dressing', unit: 'L', currentStock: 8, minStock: 3, maxStock: 15, cost: 12.0, category: 'other' },
  { id: 'i3', name: 'Parmesan Cheese', unit: 'kg', currentStock: 4, minStock: 2, maxStock: 10, cost: 18.0, category: 'dairy' },
  { id: 'i4', name: 'Tomatoes', unit: 'kg', currentStock: 20, minStock: 10, maxStock: 40, cost: 4.0, category: 'vegetables' },
  { id: 'i5', name: 'Basil', unit: 'bunch', currentStock: 12, minStock: 5, maxStock: 20, cost: 2.5, category: 'spices' },
  { id: 'i6', name: 'Salmon Fillet', unit: 'kg', currentStock: 8, minStock: 5, maxStock: 15, cost: 25.0, category: 'meats' },
  { id: 'i7', name: 'Mixed Vegetables', unit: 'kg', currentStock: 18, minStock: 8, maxStock: 30, cost: 5.5, category: 'vegetables' },
  { id: 'i8', name: 'Ribeye Steak', unit: 'kg', currentStock: 6, minStock: 4, maxStock: 12, cost: 35.0, category: 'meats' },
  { id: 'i9', name: 'Potatoes', unit: 'kg', currentStock: 25, minStock: 15, maxStock: 50, cost: 2.0, category: 'vegetables' },
  { id: 'i10', name: 'Chicken Breast', unit: 'kg', currentStock: 12, minStock: 8, maxStock: 25, cost: 8.0, category: 'meats' },
  { id: 'i11', name: 'Pasta', unit: 'kg', currentStock: 30, minStock: 15, maxStock: 50, cost: 3.0, category: 'grains' },
  { id: 'i12', name: 'Alfredo Sauce', unit: 'L', currentStock: 10, minStock: 5, maxStock: 20, cost: 8.5, category: 'other' },
  { id: 'i13', name: 'Mascarpone', unit: 'kg', currentStock: 3, minStock: 2, maxStock: 8, cost: 15.0, category: 'dairy' },
  { id: 'i14', name: 'Coffee', unit: 'kg', currentStock: 5, minStock: 3, maxStock: 10, cost: 12.0, category: 'beverages' },
  { id: 'i15', name: 'Chocolate', unit: 'kg', currentStock: 7, minStock: 4, maxStock: 15, cost: 10.0, category: 'other' },
  { id: 'i16', name: 'Vanilla Ice Cream', unit: 'L', currentStock: 8, minStock: 5, maxStock: 15, cost: 6.0, category: 'dairy' },
  { id: 'i17', name: 'Oranges', unit: 'kg', currentStock: 22, minStock: 10, maxStock: 40, cost: 3.5, category: 'vegetables' },
  { id: 'i18', name: 'White Rum', unit: 'L', currentStock: 12, minStock: 5, maxStock: 20, cost: 18.0, category: 'beverages' },
  { id: 'i19', name: 'Mint Leaves', unit: 'bunch', currentStock: 15, minStock: 8, maxStock: 25, cost: 2.0, category: 'spices' },
  { id: 'i20', name: 'Lime', unit: 'kg', currentStock: 10, minStock: 5, maxStock: 20, cost: 3.0, category: 'vegetables' },
  { id: 'i21', name: 'Tequila', unit: 'L', currentStock: 10, minStock: 5, maxStock: 18, cost: 22.0, category: 'beverages' },
  { id: 'i22', name: 'Triple Sec', unit: 'L', currentStock: 8, minStock: 4, maxStock: 15, cost: 16.0, category: 'beverages' },
  { id: 'i23', name: 'Pizza Dough', unit: 'kg', currentStock: 20, minStock: 10, maxStock: 40, cost: 2.5, category: 'grains' },
  { id: 'i24', name: 'Mozzarella', unit: 'kg', currentStock: 15, minStock: 8, maxStock: 30, cost: 12.0, category: 'dairy' },
  { id: 'i25', name: 'Tomato Sauce', unit: 'L', currentStock: 18, minStock: 10, maxStock: 35, cost: 4.5, category: 'other' },
  { id: 'i26', name: 'Pepperoni', unit: 'kg', currentStock: 8, minStock: 5, maxStock: 15, cost: 14.0, category: 'meats' },
];

export const mockSalesData: SalesData[] = [
  { date: '2024-01-15', sales: 1250, orders: 45 },
  { date: '2024-01-16', sales: 1580, orders: 52 },
  { date: '2024-01-17', sales: 1420, orders: 48 },
  { date: '2024-01-18', sales: 1890, orders: 61 },
  { date: '2024-01-19', sales: 2100, orders: 68 },
  { date: '2024-01-20', sales: 2350, orders: 75 },
  { date: '2024-01-21', sales: 1980, orders: 64 },
];

export const mockCategorySales: CategorySales[] = [
  { category: 'Main Course', sales: 8500, orders: 245 },
  { category: 'Pizza', sales: 6200, orders: 312 },
  { category: 'Cocktails', sales: 4800, orders: 398 },
  { category: 'Appetizers', sales: 3200, orders: 287 },
  { category: 'Desserts', sales: 2100, orders: 234 },
  { category: 'Beverages', sales: 1800, orders: 456 },
];

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'order',
    title: 'Nuevo pedido - Mesa 2',
    message: '2 items - Total: $50.97',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: 'n2',
    type: 'stock',
    title: 'Stock bajo: Mascarpone',
    message: 'Stock actual: 3 kg - Mínimo: 2 kg',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: 'n3',
    type: 'order',
    title: 'Pedido listo - Mesa 6',
    message: 'Pizza Margherita y 2 Mojitos',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 45),
  },
  {
    id: 'n4',
    type: 'reservation',
    title: 'Nueva reserva',
    message: 'Mesa para 4 personas - 20:00',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 120),
  },
];
