import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, ShoppingBag, Users } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { useTranslation } from '@/i18n/useTranslation';
import { mockSalesData, mockCategorySales } from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';

const Reports = () => {
  const { t } = useTranslation();
  const totalSales = mockSalesData.reduce((sum, day) => sum + day.sales, 0);
  const totalOrders = mockSalesData.reduce((sum, day) => sum + day.orders, 0);
  const avgOrderValue = totalSales / totalOrders;

  const topCategories = [...mockCategorySales].sort((a, b) => b.sales - a.sales).slice(0, 3);

  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  const profitData = mockSalesData.map(day => ({
    ...day,
    cost: day.sales * 0.35, // 35% cost estimate
    profit: day.sales * 0.65, // 65% profit estimate
  }));

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('reports.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {t('reports.subtitle')}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('reports.totalSales')}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(totalSales)}
                  </p>
                  <p className="text-sm text-green-600 mt-1">+15.3%</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <DollarSign className="text-green-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('reports.totalOrders')}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {totalOrders}
                  </p>
                  <p className="text-sm text-green-600 mt-1">+8.7%</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <ShoppingBag className="text-blue-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('reports.avgOrderValue')}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(avgOrderValue)}
                  </p>
                  <p className="text-sm text-green-600 mt-1">+5.2%</p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <TrendingUp className="text-purple-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('reports.dailyAvgOrders')}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {Math.round(totalOrders / 7)}
                  </p>
                  <p className="text-sm text-green-600 mt-1">+12.1%</p>
                </div>
                <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                  <Users className="text-orange-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>{t('reports.revenueTrend')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockSalesData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  className="text-gray-600 dark:text-gray-400"
                />
                <YAxis className="text-gray-600 dark:text-gray-400" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid #e5e7eb' }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#22c55e" strokeWidth={3} name={t('dashboard.sales')} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Orders Trend */}
        <Card>
          <CardHeader>
            <CardTitle>{t('reports.ordersTrend')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockSalesData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  className="text-gray-600 dark:text-gray-400"
                />
                <YAxis className="text-gray-600 dark:text-gray-400" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid #e5e7eb' }} />
                <Legend />
                <Bar dataKey="orders" fill="#3b82f6" name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
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

        {/* Profit Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Cost vs Profit Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={profitData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  className="text-gray-600 dark:text-gray-400"
                />
                <YAxis className="text-gray-600 dark:text-gray-400" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid #e5e7eb' }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend />
                <Bar dataKey="cost" stackId="a" fill="#ef4444" name="Cost" />
                <Bar dataKey="profit" stackId="a" fill="#22c55e" name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topCategories.map((category, index) => (
              <div key={category.category} className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {category.category}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {category.orders} orders
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${(category.sales / topCategories[0].sales) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white min-w-[80px] text-right">
                      {formatCurrency(category.sales)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Category Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Category</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Sales</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Orders</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Avg Order</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">% of Total</th>
                </tr>
              </thead>
              <tbody>
                {mockCategorySales.map((category, index) => {
                  const totalCategorySales = mockCategorySales.reduce((sum, c) => sum + c.sales, 0);
                  const percentage = (category.sales / totalCategorySales) * 100;
                  const avgOrder = category.sales / category.orders;

                  return (
                    <tr key={category.category} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">
                        {category.category}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-900 dark:text-white font-semibold">
                        {formatCurrency(category.sales)}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-600 dark:text-gray-400">
                        {category.orders}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-600 dark:text-gray-400">
                        {formatCurrency(avgOrder)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400">
                          {percentage.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
