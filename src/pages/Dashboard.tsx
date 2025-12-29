import { motion } from 'framer-motion';
import { DollarSign, ShoppingBag, Clock, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { useAppStore } from '@/store/useAppStore';
import { useTranslation } from '@/i18n/useTranslation';
import { mockSalesData, mockCategorySales } from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';

const Dashboard = () => {
  const { orders, ingredients } = useAppStore();
  const { t, language } = useTranslation();

  const activeOrders = orders.filter(o => o.status === 'pending' || o.status === 'preparing');
  const todayOrders = orders.filter(o => {
    const today = new Date();
    return o.createdAt.toDateString() === today.toDateString();
  });
  const todaySales = todayOrders.reduce((sum, order) => sum + order.total, 0);
  const lowStockItems = ingredients.filter(i => i.currentStock <= i.minStock);

  const metrics = [
    {
      title: t('dashboard.todaySales'),
      value: formatCurrency(todaySales),
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
    },
    {
      title: t('dashboard.todayOrders'),
      value: todayOrders.length.toString(),
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      title: t('dashboard.activeOrders'),
      value: activeOrders.length.toString(),
      change: '-3.1%',
      trend: 'down',
      icon: Clock,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
    },
    {
      title: t('dashboard.lowStockItems'),
      value: lowStockItems.length.toString(),
      change: '+2',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/20',
    },
  ];

  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('dashboard.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {t('dashboard.subtitle')}
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {metric.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {metric.value}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      {metric.trend === 'up' ? (
                        <TrendingUp size={16} className="text-green-600" />
                      ) : (
                        <TrendingDown size={16} className="text-red-600" />
                      )}
                      <span className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                    <metric.icon className={metric.color} size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.salesTrend')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockSalesData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { month: 'short', day: 'numeric' })}
                  className="text-gray-600 dark:text-gray-400"
                />
                <YAxis className="text-gray-600 dark:text-gray-400" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid #e5e7eb' }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#22c55e" strokeWidth={2} name={t('dashboard.sales')} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Sales */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.salesByCategory')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockCategorySales}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="sales"
                >
                  {mockCategorySales.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.recentOrders')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {order.tableNumber ? `${t('dashboard.table')} ${order.tableNumber}` : t('dashboard.delivery')}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {order.items.length} {t('dashboard.items')} • {formatCurrency(order.total)}
                    </p>
                  </div>
                  <Badge
                    variant={
                      order.status === 'delivered' ? 'success' :
                      order.status === 'preparing' ? 'warning' :
                      order.status === 'ready' ? 'info' : 'default'
                    }
                  >
                    {t(`orderStatus.${order.status}`)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.lowStockAlerts')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStockItems.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400 text-center py-4">
                  {t('dashboard.allStocked')}
                </p>
              ) : (
                lowStockItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t('dashboard.current')}: {item.currentStock} {item.unit} • {t('dashboard.min')}: {item.minStock} {item.unit}
                      </p>
                    </div>
                    <Badge variant="danger">{t('dashboard.low')}</Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
