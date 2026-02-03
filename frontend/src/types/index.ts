export type UserRole = 'admin' | 'cashier' | 'chef' | 'delivery';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface Table {
  id: string;
  number: number;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved';
  currentOrder?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  image?: string;
  available: boolean;
  ingredients?: string[];
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  notes?: string;
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
export type PaymentMethod = 'cash' | 'card' | 'transfer';

export interface Order {
  id: string;
  tableId?: string;
  tableNumber?: number;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  paymentMethod?: PaymentMethod;
  isDelivery?: boolean;
  deliveryAddress?: string;
  riderId?: string;
}

export interface Rider {
  id: string;
  name: string;
  phone: string;
  status: 'available' | 'busy' | 'offline';
  currentOrders: string[];
}

export interface DeliveryOrder extends Order {
  riderId?: string;
  riderName?: string;
  deliveryAddress: string;
  customerPhone: string;
  estimatedTime: number;
  deliveryStatus: 'pending' | 'assigned' | 'picked_up' | 'in_transit' | 'delivered';
}

export interface Ingredient {
  id: string;
  name: string;
  unit: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  cost: number;
  category?: string;
}

export interface Recipe {
  productId: string;
  ingredients: {
    ingredientId: string;
    quantity: number;
  }[];
}

export interface SalesData {
  date: string;
  sales: number;
  orders: number;
}

export interface CategorySales {
  category: string;
  sales: number;
  orders: number;
}

export interface DashboardMetrics {
  todaySales: number;
  todayOrders: number;
  activeOrders: number;
  lowStockItems: number;
  salesGrowth: number;
  ordersGrowth: number;
}

export type NotificationType = 'order' | 'stock' | 'reservation' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}
