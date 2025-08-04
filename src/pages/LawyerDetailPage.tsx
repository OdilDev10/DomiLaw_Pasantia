// pages/LawyerDetailPage.tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LawyerInfo from '@/shared/components/business/LawyerInfo';
import ServiceSelectionStep, { type LawyerService } from '@/shared/components/business/ServiceSelectionStep';
import DetailsServiceLawyerModal from '@/shared/components/modal/DetailsServiceLawyerModal';
import { mockLawyers, useServiceRequests } from '@/shared/context/AppContext';
import { lawyerServicesData } from '@/shared/mock/enchatedMockLawyers';

import { ArrowLeft, Clock, FileText, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

interface FormData {
  service: string;
  name: string;
  email: string;
  phone: string;
  description: string;
  preferredDate: string;
  preferredTime: string;
}

export interface LawyerDetail {
  id: number;
  avatar: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  location: string;
  bio: string;
  services: string[];
  phone: string;
  email: string;
  price: string;
  experience: string;
}
const LawyerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addServiceRequest } = useServiceRequests();

  const [lawyer, setLawyer] = useState<LawyerDetail>(mockLawyers[id ? parseInt(id) : 0]);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    service: '',
    name: '',
    email: '',
    phone: '',
    description: '',
    preferredDate: '',
    preferredTime: '',
  });

  useEffect(() => {
    if (id) {
      const foundLawyer = mockLawyers.find((l) => l.id === parseInt(id));
      if (foundLawyer) {
        setLawyer(foundLawyer);
      } else {
        navigate('/directorio');
      }
    }
  }, [id, navigate]);

  if (!lawyer) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitRequest = () => {
    addServiceRequest({
      lawyerId: lawyer.id,
      lawyerName: lawyer.name,
      ...formData,
      status: 'pending',
    });

    setShowServiceModal(false);
    setCurrentStep(1);
    setFormData({
      service: '',
      name: '',
      email: '',
      phone: '',
      description: '',
      preferredDate: '',
      preferredTime: '',
    });

    alert('¡Solicitud enviada exitosamente! El abogado se pondrá en contacto contigo pronto.');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-indigo-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Selecciona el servicio que necesitas:</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {lawyer.services.map((service: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleInputChange('service', service)}
                  className={`p-4 text-left border rounded-lg transition-all ${
                    formData.service === service
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                  }`}
                >
                  <div className="font-medium">{service}</div>
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-indigo-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Información de contacto:</h3>
            </div>
            <Input
              placeholder="Nombre completo"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
            <Input
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
            <Input
              placeholder="Teléfono"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-indigo-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Detalles de la consulta:</h3>
            </div>
            <textarea
              placeholder="Describe tu caso o consulta..."
              rows={4}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha preferida</label>
                <Input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hora preferida</label>
                <Input
                  type="time"
                  value={formData.preferredTime}
                  onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.service;
      case 2:
        return formData.name && formData.email && formData.phone;
      case 3:
        return formData.description;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 flex items-center justify-center flex-col gap-8">
      <div className="container mx-auto px-4">
        <Link to="/directorio">
          <Button variant="ghost" className="mb-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al directorio
          </Button>
        </Link>

        <LawyerInfo
          setShowServiceModal={setShowServiceModal}
          lawyer={lawyer}
          handleServiceSelection={(serviceName: string) => {
            setShowServiceModal(true);
            handleInputChange('service', serviceName || '');
          }}
        />
      </div>

      {/* Service Request Modal */}
      <DetailsServiceLawyerModal
        showServiceModal={showServiceModal}
        setShowServiceModal={setShowServiceModal}
        lawyer={{
          name: lawyer.name,
          specialty: lawyer.specialty,
        }}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        renderStepContent={renderStepContent}
        canProceed={canProceed}
        handleSubmitRequest={handleSubmitRequest}
        service={
          lawyerServicesData[lawyer.id]?.find((service: LawyerService) => service.name === formData.service) ?? {
            name: formData.service,
            description: '',
          }
        }
        formData={formData}
        handleInputChange={handleInputChange}
      />
      <ServiceSelectionStep
        services={lawyerServicesData[lawyer.id] || []}
        selectedService={null}
        onServiceSelect={function (service: LawyerService): void {
          setShowServiceModal(true);
          handleInputChange('service', service.name || '');
        }}
        lawyerName={lawyer.name}
      />
    </div>
  );
};

export default LawyerDetailPage;
