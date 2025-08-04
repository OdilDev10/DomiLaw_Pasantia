// contexts/AppContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Lawyer {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  avatar: string;
  location: string;
  experience: string;
  price: string;
  phone: string;
  email: string;
  bio: string;
  services: string[];
}

interface ServiceRequest {
  id: number;
  lawyerId: number;
  lawyerName: string;
  service: string;
  name: string;
  email: string;
  phone: string;
  description: string;
  preferredDate: string;
  preferredTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

interface AppContextType {
  // Theme
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  toggleDarkMode: () => void;

  // Selected Lawyer
  selectedLawyer: Lawyer | null;
  setSelectedLawyer: (lawyer: Lawyer | null) => void;

  // Service Requests
  serviceRequests: ServiceRequest[];
  addServiceRequest: (request: Omit<ServiceRequest, 'id' | 'createdAt'>) => void;
  getServiceRequests: () => ServiceRequest[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Dark Mode State
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('domilaw-darkMode');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  // Selected Lawyer State
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);

  // Service Requests State
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('domilaw-serviceRequests');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Dark Mode Effects
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('domilaw-darkMode', JSON.stringify(darkMode));

      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [darkMode]);

  // Service Requests Effects
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('domilaw-serviceRequests', JSON.stringify(serviceRequests));
    }
  }, [serviceRequests]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const addServiceRequest = (request: Omit<ServiceRequest, 'id' | 'createdAt'>) => {
    const newRequest: ServiceRequest = {
      ...request,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    setServiceRequests((prev) => [...prev, newRequest]);
  };

  const getServiceRequests = () => serviceRequests;

  const value: AppContextType = {
    darkMode,
    setDarkMode,
    toggleDarkMode,
    selectedLawyer,
    setSelectedLawyer,
    serviceRequests,
    addServiceRequest,
    getServiceRequests,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// hooks/useApp.ts
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// hooks/useDarkMode.ts
export const useDarkMode = () => {
  const { darkMode, setDarkMode, toggleDarkMode } = useApp();
  return { darkMode, setDarkMode, toggleDarkMode };
};

// hooks/useLawyer.ts
export const useLawyer = () => {
  const { selectedLawyer, setSelectedLawyer } = useApp();
  return { selectedLawyer, setSelectedLawyer };
};

// hooks/useServiceRequests.ts
export const useServiceRequests = () => {
  const { serviceRequests, addServiceRequest, getServiceRequests } = useApp();
  return { serviceRequests, addServiceRequest, getServiceRequests };
};

// data/mockData.ts
export const mockLawyers: Lawyer[] = [
  {
    id: 1,
    name: 'Dra. María Fernández',
    specialty: 'Derecho Laboral',
    rating: 4.9,
    reviews: 124,
    avatar: '/avatar1.jpg',
    location: 'Santo Domingo',
    experience: '15 años',
    price: 'RD$ 3,500',
    phone: '(809) 555-0101',
    email: 'maria.fernandez@domilaw.com',
    bio: 'Especialista en derecho laboral con más de 15 años de experiencia. Egresada de la PUCMM con maestría en Derecho del Trabajo.',
    services: ['Despidos injustificados', 'Contratos laborales', 'Negociación colectiva', 'Seguridad social'],
  },
  {
    id: 2,
    name: 'Lic. Carlos Rodríguez',
    specialty: 'Propiedad Intelectual',
    rating: 4.7,
    reviews: 89,
    avatar: '/avatar2.jpg',
    location: 'Santiago',
    experience: '12 años',
    price: 'RD$ 4,000',
    phone: '(809) 555-0102',
    email: 'carlos.rodriguez@domilaw.com',
    bio: 'Experto en propiedad intelectual y derecho tecnológico. Asesor de startups y empresas tecnológicas.',
    services: ['Registro de marcas', 'Patentes', 'Derechos de autor', 'Contratos tecnológicos'],
  },
  {
    id: 3,
    name: 'Dra. Laura Jiménez',
    specialty: 'Derecho de Familia',
    rating: 5.0,
    reviews: 156,
    avatar: '/avatar3.jpg',
    location: 'Santo Domingo',
    experience: '18 años',
    price: 'RD$ 3,000',
    phone: '(809) 555-0103',
    email: 'laura.jimenez@domilaw.com',
    bio: 'Especialista en derecho de familia con enfoque en mediación familiar. Certificada en resolución de conflictos.',
    services: ['Divorcios', 'Custodia de menores', 'Adopciones', 'Pensiones alimentarias'],
  },
  {
    id: 4,
    name: 'Lic. Roberto Sánchez',
    specialty: 'Derecho Penal',
    rating: 4.8,
    reviews: 203,
    avatar: '/avatar4.jpg',
    location: 'Santo Domingo',
    experience: '20 años',
    price: 'RD$ 5,000',
    phone: '(809) 555-0104',
    email: 'roberto.sanchez@domilaw.com',
    bio: 'Criminalista con amplia experiencia en casos complejos. Ex-fiscal con más de 20 años en el sistema judicial.',
    services: ['Defensa penal', 'Delitos económicos', 'Violencia doméstica', 'Tráfico de drogas'],
  },
  {
    id: 5,
    name: 'Dra. Ana González',
    specialty: 'Derecho Corporativo',
    rating: 4.6,
    reviews: 78,
    avatar: '/avatar5.jpg',
    location: 'Santo Domingo',
    experience: '10 años',
    price: 'RD$ 4,500',
    phone: '(809) 555-0105',
    email: 'ana.gonzalez@domilaw.com',
    bio: 'Especialista en derecho corporativo y fusiones y adquisiciones. Asesora legal de múltiples empresas multinacionales.',
    services: ['Constitución de empresas', 'Contratos comerciales', 'Fusiones y adquisiciones', 'Compliance corporativo'],
  },
  {
    id: 6,
    name: 'Lic. Pedro Martínez',
    specialty: 'Derecho Inmobiliario',
    rating: 4.8,
    reviews: 145,
    avatar: '/avatar6.jpg',
    location: 'Santiago',
    experience: '14 años',
    price: 'RD$ 3,800',
    phone: '(809) 555-0106',
    email: 'pedro.martinez@domilaw.com',
    bio: 'Experto en derecho inmobiliario y urbanístico. Especializado en transacciones inmobiliarias complejas.',
    services: ['Compraventa inmobiliaria', 'Titulación de terrenos', 'Desarrollo inmobiliario', 'Derecho urbanístico'],
  },
];
