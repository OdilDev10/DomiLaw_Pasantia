import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { LawyerDetail } from '@/pages/LawyerDetailPage';
import { Calendar, Mail, MapPin, Phone, Star } from 'lucide-react';

// Simulación de datos de abogado (puedes reemplazarlo por props o datos reales)

const LawyerInfo = ({
  lawyer,
  handleServiceSelection,
}: {
  setShowServiceModal: (open: boolean) => void;
  lawyer: LawyerDetail;
  handleServiceSelection: (service: string) => void;
}) => {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Lawyer Info */}
      <div className="lg:col-span-2">
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-start gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={lawyer.avatar} />
                <AvatarFallback className="text-2xl bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400">
                  {lawyer.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{lawyer.name}</h1>
                <p className="text-lg text-indigo-600 dark:text-indigo-400 font-medium">{lawyer.specialty}</p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-medium">{lawyer.rating}</span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400">({lawyer.reviews} reseñas)</span>
                  </div>
                  <Badge variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400">
                    <MapPin className="h-3 w-3 mr-1" />
                    {lawyer.location}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Acerca de</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{lawyer.bio}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Servicios</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {lawyer.services.map((service: string, index: number) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="justify-start p-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Contacto</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <Phone className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    <span>{lawyer.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <Mail className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    <span>{lawyer.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div>
        <Card className="sticky top-24 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-center text-gray-900 dark:text-white">Consulta</CardTitle>
            <div className="text-center">
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{lawyer.price}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">por consulta</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => handleServiceSelection('Consulta')}>
              <Calendar className="h-4 w-4 mr-2" />
              Solicitar Consulta
            </Button>
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <strong>{lawyer.experience}</strong> de experiencia
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Respuesta en menos de 24 horas</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LawyerInfo;
