// components/layout/Header.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu } from 'lucide-react';
import { useDarkMode } from '@/shared/context/AppContext';
import { FeatureComingSoonModal } from '../modal/FeatureComingSoonModal';

export const Header: React.FC = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const location = useLocation();
  const [openFeatureModal, setOpenFeatureModal] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const getLinkClass = (path: string) => {
    const baseClass = 'hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors';
    const activeClass = 'text-indigo-600 dark:text-indigo-400 font-semibold';
    const inactiveClass = 'text-gray-600 dark:text-gray-300';

    return `${baseClass} ${isActive(path) ? activeClass : inactiveClass}`;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}

        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src="/logo.svg" alt="Logo" />

          <span className="text-xl font-bold text-gray-800 dark:text-white">DomiLaw</span>
        </Link>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className={getLinkClass('/')}>
            Inicio
          </Link>
          <Link to="/directorio" className={getLinkClass('/directorio')}>
            Directorio
          </Link>
        </div>
        <FeatureComingSoonModal open={openFeatureModal} onOpenChange={() => setOpenFeatureModal(false)} />
        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDarkMode}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Client Access Button */}
          <Button
            variant="outline"
            onClick={() => setOpenFeatureModal(true)}
            className="hidden md:flex cursor-pointer border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Acceso Clientes
          </Button>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden text-gray-600 dark:text-gray-300 cursor-pointer">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
};
