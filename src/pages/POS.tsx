import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Trash2, CreditCard, Banknote } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Badge from '@/components/ui/Badge';
import { useAppStore } from '@/store/useAppStore';
import { useTranslation } from '@/i18n/useTranslation';
import { mockCategories } from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';
import { getTranslatedCategories } from '@/lib/categoryHelper';
import { getProductThumbnail } from '@/lib/productImageHelper';
import { PaymentMethod } from '@/types';

const POS = () => {
  const {
    tables,
    products,
    currentOrder,
    selectedTable,
    setSelectedTable,
    addToCurrentOrder,
    removeFromCurrentOrder,
    updateOrderItemQuantity,
    createOrder,
    clearCurrentOrder,
  } = useAppStore();
  const { t } = useTranslation();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const translatedCategories = getTranslatedCategories(mockCategories, t);

  const filteredProducts = selectedCategory
    ? products.filter(p => p.categoryId === selectedCategory && p.available)
    : products.filter(p => p.available);

  const orderTotal = currentOrder.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleAddProduct = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCurrentOrder({
        productId: product.id,
        productName: product.name,
        quantity: 1,
        price: product.price,
      });
    }
  };

  const handlePayment = (method: PaymentMethod) => {
    if (selectedTable) {
      createOrder(selectedTable);
      setShowPaymentModal(false);
    }
  };

  return (
    <div className="h-full flex gap-6">
      {/* Left Side - Tables & Products */}
      <div className="flex-1 space-y-6 overflow-y-auto">
        {/* Tables Grid */}
        <Card>
          <CardHeader>
            <CardTitle>{t('pos.selectTable')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-3">
              {tables.map((table) => (
                <motion.button
                  key={table.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTable(table.id)}
                  disabled={table.status === 'occupied'}
                  className={`
                    aspect-square rounded-lg p-4 flex flex-col items-center justify-center gap-2
                    transition-all border-2
                    ${selectedTable === table.id
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                      : table.status === 'available'
                      ? 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary-300'
                      : table.status === 'occupied'
                      ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 cursor-not-allowed'
                      : 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20'
                    }
                  `}
                >
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {table.number}
                  </span>
                  <Badge
                    variant={
                      table.status === 'available' ? 'success' :
                      table.status === 'occupied' ? 'danger' : 'warning'
                    }
                  >
                    {t(`pos.${table.status}`)}
                  </Badge>
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={selectedCategory === null ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            {t('pos.all')}
          </Button>
          {translatedCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.icon} {category.name}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                hover
                className="cursor-pointer h-full"
                onClick={() => handleAddProduct(product.id)}
              >
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg mb-3 overflow-hidden">
                    <img 
                      src={getProductThumbnail(product.id)} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    {formatCurrency(product.price)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Side - Current Order */}
      <div className="w-96 flex flex-col">
        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <CardTitle>{t('pos.currentOrder')}</CardTitle>
            {selectedTable && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('pos.table')} {tables.find(t => t.id === selectedTable)?.number}
              </p>
            )}
          </CardHeader>

          <CardContent className="flex-1 flex flex-col">
            {currentOrder.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                <p>{t('pos.noItems')}</p>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto mb-4">
                  {currentOrder.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {item.productName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateOrderItemQuantity(item.productId, Math.max(1, item.quantity - 1))}
                        >
                          <Minus size={16} />
                        </Button>
                        <span className="w-8 text-center font-medium text-gray-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateOrderItemQuantity(item.productId, item.quantity + 1)}
                        >
                          <Plus size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => removeFromCurrentOrder(item.productId)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {t('common.total')}
                    </span>
                    <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {formatCurrency(orderTotal)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      onClick={clearCurrentOrder}
                    >
                      {t('pos.clear')}
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => setShowPaymentModal(true)}
                      disabled={!selectedTable || currentOrder.length === 0}
                    >
                      {t('pos.confirmOrder')}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Payment Modal */}
      <Modal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        title={t('pos.paymentMethod')}
        size="sm"
      >
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('pos.totalAmount')}</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(orderTotal)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-24 flex-col gap-2"
              onClick={() => handlePayment('cash')}
            >
              <Banknote size={32} />
              <span>{t('pos.cash')}</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col gap-2"
              onClick={() => handlePayment('card')}
            >
              <CreditCard size={32} />
              <span>{t('pos.card')}</span>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default POS;
