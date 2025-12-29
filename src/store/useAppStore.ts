import { create } from 'zustand';
import { User, Table, Product, Order, Ingredient, OrderItem, PaymentMethod, Notification } from '@/types';
import { mockUsers, mockTables, mockProducts, mockOrders, mockIngredients, mockNotifications } from '@/data/mockData';
import { generateId } from '@/lib/utils';
import { Language } from '@/i18n/translations';

interface AppState {
  // Auth
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;

  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Language
  language: Language;
  setLanguage: (lang: Language) => void;

  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotifications: () => void;

  // Tables
  tables: Table[];
  updateTableStatus: (tableId: string, status: Table['status']) => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Orders
  orders: Order[];
  currentOrder: OrderItem[];
  selectedTable: string | null;
  addToCurrentOrder: (item: OrderItem) => void;
  removeFromCurrentOrder: (productId: string) => void;
  updateOrderItemQuantity: (productId: string, quantity: number) => void;
  clearCurrentOrder: () => void;
  setSelectedTable: (tableId: string | null) => void;
  createOrder: (tableId?: string, isDelivery?: boolean, deliveryAddress?: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  completeOrder: (orderId: string, paymentMethod: PaymentMethod) => void;

  // Inventory
  ingredients: Ingredient[];
  updateIngredientStock: (id: string, quantity: number) => void;
  addIngredient: (ingredient: Omit<Ingredient, 'id'>) => void;
  updateIngredient: (id: string, ingredient: Partial<Ingredient>) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Auth
  currentUser: null,
  isAuthenticated: false,
  login: (email: string, password: string) => {
    // Simple mock authentication
    const user = mockUsers.find(u => u.email === email);
    if (user) {
      set({ currentUser: user, isAuthenticated: true });
      return true;
    }
    return false;
  },
  logout: () => {
    set({ currentUser: null, isAuthenticated: false });
  },

  // Theme
  theme: 'light',
  toggleTheme: () => {
    const newTheme = get().theme === 'light' ? 'dark' : 'light';
    set({ theme: newTheme });
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  // Language
  language: 'es',
  setLanguage: (lang: Language) => {
    set({ language: lang });
  },

  // Notifications
  notifications: mockNotifications,
  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: generateId(),
      createdAt: new Date(),
    };
    set(state => ({
      notifications: [newNotification, ...state.notifications],
    }));
  },
  markNotificationAsRead: (id) => {
    set(state => ({
      notifications: state.notifications.map(n =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  },
  markAllNotificationsAsRead: () => {
    set(state => ({
      notifications: state.notifications.map(n => ({ ...n, read: true })),
    }));
  },
  clearNotifications: () => {
    set({ notifications: [] });
  },

  // Tables
  tables: mockTables,
  updateTableStatus: (tableId: string, status: Table['status']) => {
    set(state => ({
      tables: state.tables.map(table =>
        table.id === tableId ? { ...table, status } : table
      ),
    }));
  },

  // Products
  products: mockProducts,
  addProduct: (product) => {
    const newProduct = { ...product, id: generateId() };
    set(state => ({ products: [...state.products, newProduct] }));
  },
  updateProduct: (id, product) => {
    set(state => ({
      products: state.products.map(p =>
        p.id === id ? { ...p, ...product } : p
      ),
    }));
  },
  deleteProduct: (id) => {
    set(state => ({
      products: state.products.filter(p => p.id !== id),
    }));
  },

  // Orders
  orders: mockOrders,
  currentOrder: [],
  selectedTable: null,
  addToCurrentOrder: (item) => {
    set(state => {
      const existingItem = state.currentOrder.find(i => i.productId === item.productId);
      if (existingItem) {
        return {
          currentOrder: state.currentOrder.map(i =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return { currentOrder: [...state.currentOrder, item] };
    });
  },
  removeFromCurrentOrder: (productId) => {
    set(state => ({
      currentOrder: state.currentOrder.filter(item => item.productId !== productId),
    }));
  },
  updateOrderItemQuantity: (productId, quantity) => {
    set(state => ({
      currentOrder: state.currentOrder.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    }));
  },
  clearCurrentOrder: () => {
    set({ currentOrder: [], selectedTable: null });
  },
  setSelectedTable: (tableId) => {
    set({ selectedTable: tableId });
  },
  createOrder: (tableId, isDelivery = false, deliveryAddress) => {
    const state = get();
    const total = state.currentOrder.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const table = tableId ? state.tables.find(t => t.id === tableId) : undefined;

    const newOrder: Order = {
      id: generateId(),
      tableId,
      tableNumber: table?.number,
      items: state.currentOrder,
      total,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      isDelivery,
      deliveryAddress,
    };

    set(state => ({
      orders: [...state.orders, newOrder],
      currentOrder: [],
      selectedTable: null,
      tables: tableId
        ? state.tables.map(t =>
            t.id === tableId ? { ...t, status: 'occupied', currentOrder: newOrder.id } : t
          )
        : state.tables,
    }));

    // Add notification for new order
    get().addNotification({
      type: 'order',
      title: isDelivery ? 'Nuevo pedido de delivery' : `Nuevo pedido - Mesa ${table?.number}`,
      message: `${state.currentOrder.length} items - Total: $${total.toFixed(2)}`,
      read: false,
    });
  },
  updateOrderStatus: (orderId, status) => {
    const state = get();
    const order = state.orders.find(o => o.id === orderId);
    
    set(state => ({
      orders: state.orders.map(order =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date() }
          : order
      ),
    }));

    // Add notification when order is ready
    if (status === 'ready' && order) {
      get().addNotification({
        type: 'order',
        title: 'Pedido listo',
        message: order.tableNumber ? `Mesa ${order.tableNumber}` : 'Pedido de delivery',
        read: false,
      });
    }
  },
  completeOrder: (orderId, paymentMethod) => {
    set(state => {
      const order = state.orders.find(o => o.id === orderId);
      return {
        orders: state.orders.map(o =>
          o.id === orderId
            ? { ...o, status: 'delivered', paymentMethod, updatedAt: new Date() }
            : o
        ),
        tables: order?.tableId
          ? state.tables.map(t =>
              t.id === order.tableId
                ? { ...t, status: 'available', currentOrder: undefined }
                : t
            )
          : state.tables,
      };
    });
  },

  // Inventory
  ingredients: mockIngredients,
  updateIngredientStock: (id, quantity) => {
    set(state => ({
      ingredients: state.ingredients.map(ing =>
        ing.id === id ? { ...ing, currentStock: quantity } : ing
      ),
    }));
  },
  addIngredient: (ingredient) => {
    const newIngredient = { ...ingredient, id: generateId() };
    set(state => ({ ingredients: [...state.ingredients, newIngredient] }));
  },
  updateIngredient: (id, ingredient) => {
    set(state => ({
      ingredients: state.ingredients.map(ing =>
        ing.id === id ? { ...ing, ...ingredient } : ing
      ),
    }));
  },
}));
