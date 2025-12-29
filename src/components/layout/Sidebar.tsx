import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  ChefHat, 
  Truck, 
  Package, 
  UtensilsCrossed,
  BarChart3,
  LogOut
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useTranslation } from '@/i18n/useTranslation';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const { currentUser, logout } = useAppStore();
  const { t } = useTranslation();

  const navigation = [
    { name: t('nav.dashboard'), href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'cashier', 'chef', 'delivery'] },
    { name: t('nav.pos'), href: '/pos', icon: ShoppingCart, roles: ['admin', 'cashier'] },
    { name: t('nav.kitchen'), href: '/kitchen', icon: ChefHat, roles: ['admin', 'chef'] },
    { name: t('nav.delivery'), href: '/delivery', icon: Truck, roles: ['admin', 'delivery'] },
    { name: t('nav.inventory'), href: '/inventory', icon: Package, roles: ['admin'] },
    { name: t('nav.products'), href: '/products', icon: UtensilsCrossed, roles: ['admin'] },
    { name: t('nav.reports'), href: '/reports', icon: BarChart3, roles: ['admin'] },
  ];

  const filteredNavigation = navigation.filter(item =>
    item.roles.includes(currentUser?.role || '')
  );

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
        <img 
          src="/assets/Imagenes Empresa/Logo-AuraLink-sinFondo.png" 
          alt="Aura Link Restaurant" 
          className="h-10 w-auto"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {filteredNavigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              )
            }
          >
            <item.icon size={20} />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
            <span className="text-primary-700 dark:text-primary-300 font-semibold">
              {currentUser?.name.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {currentUser?.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
              {currentUser?.role}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut size={20} />
          {t('common.logout')}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
