// pages/NotFoundPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">404</div>
          <div className="text-gray-400 dark:text-gray-500">
            <Search className="h-16 w-16 mx-auto opacity-50" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Página no encontrada</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Lo sentimos, no pudimos encontrar la página que estás buscando. Es posible que haya sido movida o eliminada.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Home className="h-4 w-4 mr-2" />
              Ir al Inicio
            </Button>
          </Link>
          <Link to="/directorio">
            <Button
              variant="outline"
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <Search className="h-4 w-4 mr-2" />
              Ver Directorio
            </Button>
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          <p>¿Necesitas ayuda? Contáctanos en:</p>
          <p className="mt-2">
            <a href="mailto:odildmartinezcuello@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              odildmartinezcuello@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
