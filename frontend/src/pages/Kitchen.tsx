import { motion } from 'framer-motion';
import { Clock, ChefHat, CheckCircle } from 'lucide-react';
import Card, { CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { useAppStore } from '@/store/useAppStore';
import { useTranslation } from '@/i18n/useTranslation';
// import { formatCurrency, formatTime } from '@/lib/utils';
import { Order, OrderStatus } from '@/types';

const Kitchen = () => {
  const { orders, updateOrderStatus } = useAppStore();
  const { t } = useTranslation();

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const preparingOrders = orders.filter(o => o.status === 'preparing');
  const readyOrders = orders.filter(o => o.status === 'ready');

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const getTimeSinceOrder = (order: Order) => {
    const minutes = Math.floor((Date.now() - order.createdAt.getTime()) / 60000);
    return minutes;
  };

  const OrderCard = ({ order }: { order: Order }) => {
    const minutesAgo = getTimeSinceOrder(order);
    const isUrgent = minutesAgo > 15;

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <Card className={isUrgent ? 'border-2 border-red-500' : ''}>
          <CardContent className="p-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {order.tableNumber ? `${t('kitchen.table')} ${order.tableNumber}` : t('kitchen.delivery')}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Clock size={14} className={isUrgent ? 'text-red-600' : 'text-gray-500'} />
                  <span className={`text-sm ${isUrgent ? 'text-red-600 font-semibold' : 'text-gray-600 dark:text-gray-400'}`}>
                    {minutesAgo} {t('kitchen.minAgo')}
                  </span>
                </div>
              </div>
              <Badge
                variant={
                  order.status === 'pending' ? 'warning' :
                    order.status === 'preparing' ? 'info' : 'success'
                }
              >
                {order.status}
              </Badge>
            </div>

            {/* Items */}
            <div className="space-y-2 mb-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded"
                >
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {item.quantity}x {item.productName}
                    </span>
                    {item.notes && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                        {t('kitchen.note')}: {item.notes}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {order.status === 'pending' && (
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleStatusChange(order.id, 'preparing')}
                >
                  <ChefHat size={16} className="mr-1" />
                  {t('kitchen.startPreparing')}
                </Button>
              )}
              {order.status === 'preparing' && (
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleStatusChange(order.id, 'ready')}
                >
                  <CheckCircle size={16} className="mr-1" />
                  {t('kitchen.markAsReady')}
                </Button>
              )}
              {order.status === 'ready' && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleStatusChange(order.id, 'delivered')}
                >
                  {t('kitchen.complete')}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('kitchen.title')}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t('kitchen.subtitle')}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{pendingOrders.length}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('kitchen.pending')}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{preparingOrders.length}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('kitchen.preparing')}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{readyOrders.length}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('kitchen.ready')}</p>
          </div>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pending Column */}
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              {t('kitchen.pending')} ({pendingOrders.length})
            </h2>
          </div>
          <div className="space-y-4">
            {pendingOrders.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-gray-400">
                  {t('kitchen.noPending')}
                </CardContent>
              </Card>
            ) : (
              pendingOrders.map(order => <OrderCard key={order.id} order={order} />)
            )}
          </div>
        </div>

        {/* Preparing Column */}
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              {t('kitchen.preparing')} ({preparingOrders.length})
            </h2>
          </div>
          <div className="space-y-4">
            {preparingOrders.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-gray-400">
                  {t('kitchen.noPreparing')}
                </CardContent>
              </Card>
            ) : (
              preparingOrders.map(order => <OrderCard key={order.id} order={order} />)
            )}
          </div>
        </div>

        {/* Ready Column */}
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              {t('kitchen.ready')} ({readyOrders.length})
            </h2>
          </div>
          <div className="space-y-4">
            {readyOrders.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-gray-400">
                  {t('kitchen.noReady')}
                </CardContent>
              </Card>
            ) : (
              readyOrders.map(order => <OrderCard key={order.id} order={order} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kitchen;
