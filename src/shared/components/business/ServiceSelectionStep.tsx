// components/business/ServiceSelectionStep.tsx
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight, Clock, FileText, Search, Star } from 'lucide-react';
import React, { useMemo, useState } from 'react';

export interface LawyerService {
  id: number;
  name: string;
  description: string;
  price: string;
  priceNumeric: number;
  duration: string;
  category: string;
  popularity: number; // 1-5 stars
  isPopular?: boolean;
}

interface ServiceSelectionStepProps {
  services: LawyerService[];
  selectedService: LawyerService | null;
  onServiceSelect: (service: LawyerService) => void;
  lawyerName: string;
}

const ServiceSelectionStep: React.FC<ServiceSelectionStepProps> = ({ services, selectedService, onServiceSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'popularity'>('popularity');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const ITEMS_PER_PAGE = 6;

  // Get unique categories
  const categories = useMemo(() => {
    return [...new Set(services.map((service) => service.category))];
  }, [services]);

  // Filter and sort services
  const filteredAndSortedServices = useMemo(() => {
    let filtered = services;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (service) =>
          service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.category.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter((service) => service.category === selectedCategory);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.priceNumeric - b.priceNumeric;
          break;
        case 'popularity':
          comparison = a.popularity - b.popularity;
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [services, searchTerm, selectedCategory, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedServices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedServices = filteredAndSortedServices.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy, sortOrder]);

  const handleSortChange = (newSortBy: 'name' | 'price' | 'popularity') => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="space-y-6">
        {/* Search and Filters */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar servicios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white dark:bg-gray-800"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm"
            >
              <option value="">Todas las categorías</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Ordenar por:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSortChange('popularity')}
                className={`text-xs ${sortBy === 'popularity' ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300' : ''}`}
              >
                Popularidad {sortBy === 'popularity' && (sortOrder === 'asc' ? '↑' : '↓')}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSortChange('price')}
                className={`text-xs ${sortBy === 'price' ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300' : ''}`}
              >
                Precio {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSortChange('name')}
                className={`text-xs ${sortBy === 'name' ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300' : ''}`}
              >
                Nombre {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </Button>
            </div>
          </div>

          {/* Results info */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {filteredAndSortedServices.length} servicio
            {filteredAndSortedServices.length !== 1 ? 's' : ''} encontrado
            {filteredAndSortedServices.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paginatedServices.map((service) => (
            <div
              key={service.id}
              onClick={() => onServiceSelect(service)}
              className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                selectedService?.id === service.id
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
              }`}
            >
              {/* Popular Badge */}
              {service.isPopular && <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs">Popular</Badge>}

              {/* Service Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4
                    className={`font-semibold text-lg ${
                      selectedService?.id === service.id ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {service.name}
                  </h4>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {service.category}
                  </Badge>
                </div>
                <div className="text-right">
                  <div
                    className={`text-xl font-bold ${
                      selectedService?.id === service.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {service.price}
                  </div>
                </div>
              </div>

              {/* Service Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{service.description}</p>

              {/* Service Details */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < service.popularity ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`}
                      />
                    ))}
                  </div>
                </div>

                {selectedService?.id === service.id && <Badge className="bg-indigo-600 text-white">Seleccionado</Badge>}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {paginatedServices.length === 0 && (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No se encontraron servicios</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Intenta ajustar tus filtros de búsqueda</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
            >
              Limpiar filtros
            </Button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Mostrando {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredAndSortedServices.length)} de{' '}
              {filteredAndSortedServices.length} servicios
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))} disabled={currentPage === 1}>
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-8 h-8 p-0"
                      >
                        {page}
                      </Button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <span key={page} className="px-1">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceSelectionStep;
