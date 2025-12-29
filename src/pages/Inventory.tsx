import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { useAppStore } from '@/store/useAppStore';
import { useTranslation } from '@/i18n/useTranslation';
import { formatCurrency } from '@/lib/utils';
import { Ingredient } from '@/types';

const Inventory = () => {
  const { ingredients, updateIngredientStock, addIngredient, updateIngredient } = useAppStore();
  const { t } = useTranslation();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    unit: '',
    currentStock: 0,
    minStock: 0,
    maxStock: 0,
    cost: 0,
    category: 'vegetables',
  });

  const lowStockItems = ingredients.filter(i => i.currentStock <= i.minStock);
  const totalValue = ingredients.reduce((sum, i) => sum + (i.currentStock * i.cost), 0);
  
  const filteredIngredients = selectedCategoryFilter
    ? ingredients.filter(i => i.category === selectedCategoryFilter)
    : ingredients;
  
  const ingredientCategories = [
    { id: 'vegetables', name: t('ingredientCategories.vegetables'), icon: '🥬' },
    { id: 'meats', name: t('ingredientCategories.meats'), icon: '🥩' },
    { id: 'dairy', name: t('ingredientCategories.dairy'), icon: '🥛' },
    { id: 'grains', name: t('ingredientCategories.grains'), icon: '🌾' },
    { id: 'spices', name: t('ingredientCategories.spices'), icon: '🌶️' },
    { id: 'beverages', name: t('ingredientCategories.beverages'), icon: '🥤' },
    { id: 'other', name: t('ingredientCategories.other'), icon: '📦' },
  ];

  const handleAdd = () => {
    addIngredient(formData);
    setShowAddModal(false);
    setFormData({ name: '', unit: '', currentStock: 0, minStock: 0, maxStock: 0, cost: 0, category: 'vegetables' });
  };

  const handleEdit = () => {
    if (selectedIngredient) {
      updateIngredient(selectedIngredient.id, formData);
      setShowEditModal(false);
      setSelectedIngredient(null);
      setFormData({ name: '', unit: '', currentStock: 0, minStock: 0, maxStock: 0, cost: 0, category: 'vegetables' });
    }
  };

  const openEditModal = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
    setFormData({
      name: ingredient.name,
      unit: ingredient.unit,
      currentStock: ingredient.currentStock,
      minStock: ingredient.minStock,
      maxStock: ingredient.maxStock,
      cost: ingredient.cost,
      category: ingredient.category || 'vegetables',
    });
    setShowEditModal(true);
  };

  const getStockStatus = (ingredient: Ingredient) => {
    const percentage = (ingredient.currentStock / ingredient.maxStock) * 100;
    if (ingredient.currentStock <= ingredient.minStock) return 'critical';
    if (percentage < 30) return 'low';
    if (percentage > 80) return 'high';
    return 'normal';
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('inventory.title')}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t('inventory.subtitle')}
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus size={20} className="mr-2" />
          {t('inventory.addIngredient')}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {ingredients.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('inventory.totalItems')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {lowStockItems.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('inventory.lowStock')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <TrendingDown className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(totalValue)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('inventory.totalValue')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <AlertTriangle className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {ingredients.filter(i => getStockStatus(i) === 'high').length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('inventory.overstocked')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button
          variant={selectedCategoryFilter === null ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategoryFilter(null)}
        >
          {t('common.all')}
        </Button>
        {ingredientCategories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategoryFilter === category.id ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategoryFilter(category.id)}
          >
            {category.icon} {category.name}
          </Button>
        ))}
      </div>

      {/* Low Stock Alerts */}
      {lowStockItems.length > 0 && (
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
              <AlertTriangle size={20} />
              {t('inventory.lowStockAlerts')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {lowStockItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t('dashboard.current')}: {item.currentStock} {item.unit}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t('dashboard.min')}: {item.minStock} {item.unit}
                      </p>
                    </div>
                    <Badge variant="danger">{t('inventory.critical')}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t('inventory.allIngredients')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('inventory.name')}</TableHead>
                <TableHead>{t('inventory.currentStock')}</TableHead>
                <TableHead>{t('inventory.minStock')}</TableHead>
                <TableHead>{t('inventory.maxStock')}</TableHead>
                <TableHead>{t('inventory.unitCost')}</TableHead>
                <TableHead>{t('inventory.itemValue')}</TableHead>
                <TableHead>{t('common.status')}</TableHead>
                <TableHead>{t('common.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIngredients.map((ingredient) => {
                const status = getStockStatus(ingredient);
                return (
                  <TableRow key={ingredient.id}>
                    <TableCell className="font-medium">{ingredient.name}</TableCell>
                    <TableCell>
                      {ingredient.currentStock} {ingredient.unit}
                    </TableCell>
                    <TableCell>
                      {ingredient.minStock} {ingredient.unit}
                    </TableCell>
                    <TableCell>
                      {ingredient.maxStock} {ingredient.unit}
                    </TableCell>
                    <TableCell>{formatCurrency(ingredient.cost)}</TableCell>
                    <TableCell className="font-semibold">
                      {formatCurrency(ingredient.currentStock * ingredient.cost)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          status === 'critical' ? 'danger' :
                          status === 'low' ? 'warning' :
                          status === 'high' ? 'info' : 'success'
                        }
                      >
                        {t(`inventory.${status}`)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditModal(ingredient)}
                      >
                        <Edit size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={t('inventory.addNew')}
        size="md"
      >
        <div className="space-y-4">
          <Input
            label={t('inventory.name')}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Tomatoes"
          />
          <Input
            label={t('inventory.unit')}
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            placeholder={t('inventory.unitPlaceholder')}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('inventory.category')}
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {ingredientCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t('inventory.currentStock')}
              type="number"
              value={formData.currentStock}
              onChange={(e) => setFormData({ ...formData, currentStock: parseFloat(e.target.value) })}
            />
            <Input
              label={t('inventory.unitCost')}
              type="number"
              step="0.01"
              value={formData.cost}
              onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t('inventory.minStock')}
              type="number"
              value={formData.minStock}
              onChange={(e) => setFormData({ ...formData, minStock: parseFloat(e.target.value) })}
            />
            <Input
              label={t('inventory.maxStock')}
              type="number"
              value={formData.maxStock}
              onChange={(e) => setFormData({ ...formData, maxStock: parseFloat(e.target.value) })}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowAddModal(false)} className="flex-1">
              {t('common.cancel')}
            </Button>
            <Button onClick={handleAdd} className="flex-1">
              {t('inventory.addIngredient')}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title={t('inventory.editIngredient')}
        size="md"
      >
        <div className="space-y-4">
          <Input
            label={t('inventory.name')}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            label={t('inventory.unit')}
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('inventory.category')}
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {ingredientCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t('inventory.currentStock')}
              type="number"
              value={formData.currentStock}
              onChange={(e) => setFormData({ ...formData, currentStock: parseFloat(e.target.value) })}
            />
            <Input
              label={t('inventory.unitCost')}
              type="number"
              step="0.01"
              value={formData.cost}
              onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t('inventory.minStock')}
              type="number"
              value={formData.minStock}
              onChange={(e) => setFormData({ ...formData, minStock: parseFloat(e.target.value) })}
            />
            <Input
              label={t('inventory.maxStock')}
              type="number"
              value={formData.maxStock}
              onChange={(e) => setFormData({ ...formData, maxStock: parseFloat(e.target.value) })}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowEditModal(false)} className="flex-1">
              {t('common.cancel')}
            </Button>
            <Button onClick={handleEdit} className="flex-1">
              {t('common.saveChanges')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Inventory;
