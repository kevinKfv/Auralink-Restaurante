import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, User, Package } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { useAppStore } from '@/store/useAppStore';
import { useTranslation } from '@/i18n/useTranslation';
import { mockRiders } from '@/data/mockData';
import { formatCurrency, formatTime } from '@/lib/utils';
import DeliveryMap from '@/components/maps/DeliveryMap';

const Delivery = () => {
  const { orders } = useAppStore();
  const { t } = useTranslation();
  const [riders] = useState(mockRiders);

  const deliveryOrders = orders.filter(o => o.isDelivery);

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('delivery.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {t('delivery.subtitle')}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Package className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {deliveryOrders.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('delivery.totalOrders')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <User className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {riders.filter(r => r.status === 'available').length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('delivery.availableRiders')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <Clock className="text-yellow-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {deliveryOrders.filter(o => o.status === 'preparing' || o.status === 'ready').length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('delivery.inProgress')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <MapPin className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {deliveryOrders.filter(o => o.status === 'delivered').length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('delivery.delivered')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Riders Status */}
      <Card>
        <CardHeader>
          <CardTitle>{t('delivery.ridersStatus')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {riders.map((rider) => (
              <motion.div
                key={rider.id}
                whileHover={{ scale: 1.02 }}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {rider.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mt-1">
                      <Phone size={14} />
                      {rider.phone}
                    </div>
                  </div>
                  <Badge
                    variant={
                      rider.status === 'available' ? 'success' :
                      rider.status === 'busy' ? 'warning' : 'default'
                    }
                  >
                    {t(`orderStatus.${rider.status}`)}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('delivery.activeOrders')}: <span className="font-semibold">{rider.currentOrders.length}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Delivery Orders */}
      <Card>
        <CardHeader>
          <CardTitle>{t('delivery.deliveryOrders')}</CardTitle>
        </CardHeader>
        <CardContent>
          {deliveryOrders.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              {t('delivery.noOrders')}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('delivery.orderId')}</TableHead>
                  <TableHead>{t('delivery.address')}</TableHead>
                  <TableHead>{t('common.items')}</TableHead>
                  <TableHead>{t('common.total')}</TableHead>
                  <TableHead>{t('delivery.rider')}</TableHead>
                  <TableHead>{t('common.status')}</TableHead>
                  <TableHead>{t('delivery.time')}</TableHead>
                  <TableHead>{t('common.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deliveryOrders.map((order) => {
                  const rider = riders.find(r => r.id === order.riderId);
                  return (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-sm">
                        #{order.id.slice(0, 8)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-start gap-2">
                          <MapPin size={16} className="text-gray-400 mt-0.5" />
                          <span className="text-sm">{order.deliveryAddress || 'N/A'}</span>
                        </div>
                      </TableCell>
                      <TableCell>{order.items.length} {t('dashboard.items')}</TableCell>
                      <TableCell className="font-semibold">
                        {formatCurrency(order.total)}
                      </TableCell>
                      <TableCell>
                        {rider ? (
                          <div>
                            <p className="font-medium">{rider.name}</p>
                            <p className="text-xs text-gray-500">{rider.phone}</p>
                          </div>
                        ) : (
                          <Badge variant="warning">{t('delivery.unassigned')}</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === 'delivered' ? 'success' :
                            order.status === 'ready' ? 'info' :
                            order.status === 'preparing' ? 'warning' : 'default'
                          }
                        >
                          {t(`orderStatus.${order.status}`)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                        {formatTime(order.createdAt)}
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          {t('common.viewDetails')}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Delivery Map */}
      <Card>
        <CardHeader>
          <CardTitle>{t('common.map')}</CardTitle>
        </CardHeader>
        <CardContent>
          <DeliveryMap 
            height="500px"
            showDeliveryZones={true}
            showOrders={true}
            className="w-full"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Delivery;
