import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import { Header } from './Header';

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      <Outlet />

      <Footer />
    </div>
  );
};

export default AppLayout;
