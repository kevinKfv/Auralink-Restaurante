import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { useTranslation } from '@/i18n/useTranslation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, language, setLanguage } = useAppStore();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const success = login(email, password);
    
    if (success) {
      navigate('/dashboard');
    } else {
      setError(t('login.invalidCredentials'));
    }
    
    setIsLoading(false);
  };

  const quickLogin = (role: string) => {
    const credentials = {
      admin: { email: 'admin@restaurant.com', password: 'admin123' },
      cashier: { email: 'cashier@restaurant.com', password: 'cashier123' },
      chef: { email: 'chef@restaurant.com', password: 'chef123' },
      delivery: { email: 'delivery@restaurant.com', password: 'delivery123' },
    }[role];

    if (credentials) {
      setEmail(credentials.email);
      setPassword(credentials.password);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-8">
          {/* Language Selector */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setLanguage('es')}
              className={`p-2 rounded-lg transition-colors ${
                language === 'es'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                  : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              title="Español"
            >
              🇪🇸
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`p-2 rounded-lg transition-colors ${
                language === 'en'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                  : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              title="English"
            >
              🇺🇸
            </button>
          </div>

          {/* Logo & Title */}
          <div className="text-center mb-8">
            <img 
              src="/assets/Imagenes Empresa/Logo-AuraLink-sinFondo.png" 
              alt="Aura Link Restaurant" 
              className="h-20 w-auto mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t('login.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t('login.subtitle')}
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label={t('login.email')}
              type="email"
              placeholder={t('login.email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label={t('login.password')}
              type="password"
              placeholder={t('login.password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isLoading}
            >
              {t('login.signIn')}
            </Button>
          </form>

          {/* Quick Login */}
          <div className="mt-6">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-3">
              {t('login.quickLogin')}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => quickLogin('admin')}
              >
                {t('login.admin')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => quickLogin('cashier')}
              >
                {t('login.cashier')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => quickLogin('chef')}
              >
                {t('login.chef')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => quickLogin('delivery')}
              >
                {t('login.delivery')}
              </Button>
            </div>
          </div>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-xs text-blue-800 dark:text-blue-300">
              <strong>{t('login.demoInfo')}</strong>
              <br />
              Email: admin@restaurant.com
              <br />
              Password: admin123
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
