// App.tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DirectoryPage } from './pages/DirectoryPage';
import HomePage from './pages/HomePage';
import LawyerDetailPage from './pages/LawyerDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import AppLayout from './shared/components/Layout/AppLayout';
import { AppProvider } from './shared/context/AppContext';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/directorio" element={<DirectoryPage />} />
            <Route path="/abogado/:id" element={<LawyerDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
