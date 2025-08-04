// pages/DirectoryPage.tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { mockLawyers, useLawyer } from '@/shared/context/AppContext';
import { Badge, MapPin, Search, Star } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const DirectoryPage: React.FC = () => {
  const { setSelectedLawyer } = useLawyer();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [filteredLawyers, setFilteredLawyers] = useState(mockLawyers);

  const specialties = [...new Set(mockLawyers.map((lawyer: any) => lawyer.specialty))];
  const locations = [...new Set(mockLawyers.map((lawyer: any) => lawyer.location))];

  useEffect(() => {
    let filtered = mockLawyers;

    if (searchTerm) {
      filtered = filtered.filter(
        (lawyer: any) =>
          lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lawyer.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lawyer.services.some((service: any) => service.toLowerCase().includes(searchTerm.toLowerCase())),
      );
    }

    if (selectedSpecialty) {
      filtered = filtered.filter((lawyer: any) => lawyer.specialty === selectedSpecialty);
    }

    if (selectedLocation) {
      filtered = filtered.filter((lawyer: any) => lawyer.location === selectedLocation);
    }

    setFilteredLawyers(filtered);
  }, [searchTerm, selectedSpecialty, selectedLocation]);

  const handleLawyerClick = (lawyer: any) => {
    setSelectedLawyer(lawyer);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Directorio de Abogados</h1>

          {/* Search and Filters */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por nombre, especialidad o servicio..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
              </div>

              {/* Specialty Filter */}
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Todas las especialidades</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>

              {/* Location Filter */}
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Todas las ubicaciones</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              {filteredLawyers.length} abogado
              {filteredLawyers.length !== 1 ? 's' : ''} encontrado
              {filteredLawyers.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Lawyers Grid */}
        {filteredLawyers.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLawyers.map((lawyer) => (
              <Link
                key={lawyer.id}
                to={`/abogado/${lawyer.id}`}
                onClick={() => handleLawyerClick(lawyer)}
              >
                <Card
                  className="hover:shadow-lg transition-all cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-full"
                >
                  <CardHeader className="text-center pb-4">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={lawyer.avatar} />
                      <AvatarFallback className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 text-xl">
                        {lawyer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-gray-900 dark:text-white text-lg">{lawyer.name}</CardTitle>
                    <CardDescription className="text-indigo-600 dark:text-indigo-400 font-medium">{lawyer.specialty}</CardDescription>
                  </CardHeader>

                  <CardContent className="text-center space-y-3">
                    {/* Location */}
                    <Badge className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      <MapPin className="h-3 w-3 mr-1" />
                      {lawyer.location}
                    </Badge>

                    {/* Rating */}
                    <div className="flex items-center justify-center gap-1">
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-medium">{lawyer.rating}</span>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">({lawyer.reviews} reseñas)</span>
                    </div>

                    {/* Price and Experience */}
                    <div className="space-y-1">
                      <p className="font-semibold text-indigo-600 dark:text-indigo-400 text-lg">{lawyer.price}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{lawyer.experience} de experiencia</p>
                    </div>

                    {/* Services Preview */}
                    <div className="pt-2">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Servicios:</p>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {lawyer.services.slice(0, 2).map((service, index) => (
                          <Badge key={index} className="text-xs border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400">
                            {service}
                          </Badge>
                        ))}
                        {lawyer.services.length > 2 && (
                          <Badge className="text-xs border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400">
                            +{lawyer.services.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          /* No Results */
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Search className="h-16 w-16 mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No se encontraron abogados</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Intenta ajustar tus filtros de búsqueda</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSpecialty('');
                  setSelectedLocation('');
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
