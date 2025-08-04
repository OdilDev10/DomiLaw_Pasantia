// components/DetailsServiceLawyerModal.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Check, Clock, User } from 'lucide-react';

interface Service {
  name: string;
  description?: string;
}

interface DetailsServiceLawyerModalProps {
  showServiceModal: boolean;
  setShowServiceModal: (open: boolean) => void;
  lawyer: {
    name: string;
    specialty: string;
  };
  service: Service;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  renderStepContent: () => React.ReactNode;
  canProceed: () => string | false;
  handleSubmitRequest: () => void;
  formData: {
    name: string;
    email: string;
    phone: string;
    description: string;
    preferredDate: string;
    preferredTime: string;
  };
  handleInputChange: (field: string, value: string) => void;
}

const DetailsServiceLawyerModal = ({
  showServiceModal,
  setShowServiceModal,
  lawyer,
  service,
  currentStep,
  setCurrentStep,
  canProceed,
  handleSubmitRequest,
  formData,
  handleInputChange,
}: DetailsServiceLawyerModalProps) => {
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-indigo-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Información de contacto:</h3>
            </div>
            <Input placeholder="Nombre completo" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
            <Input placeholder="Email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
            <Input placeholder="Teléfono" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} />
          </div>
        );
      case 2:
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
              className="w-full p-3 border rounded-md"
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Fecha preferida</label>
                <Input type="date" value={formData.preferredDate} onChange={(e) => handleInputChange('preferredDate', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Hora preferida</label>
                <Input type="time" value={formData.preferredTime} onChange={(e) => handleInputChange('preferredTime', e.target.value)} />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Resumen de tu solicitud</h4>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-500">Servicio:</span> {service.name}
                </p>
                <p>
                  <span className="text-gray-500">Abogado:</span> {lawyer.name}
                </p>
                <p>
                  <span className="text-gray-500">Fecha:</span> {formData.preferredDate} a las {formData.preferredTime}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-500">El abogado se pondrá en contacto contigo para confirmar la cita.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={showServiceModal} onOpenChange={setShowServiceModal}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{currentStep === 3 ? 'Confirmar solicitud' : `Solicitar consulta - Paso ${currentStep} de 3`}</DialogTitle>
          <DialogDescription>
            <div className="flex justify-between items-center">
              <span>
                {lawyer.name} - {lawyer.specialty}
              </span>
              <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">{service.name}</span>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {/* Progress Indicator */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step <= currentStep ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step < currentStep ? <Check className="h-4 w-4" /> : step}
                  </div>
                  {step < 3 && <div className={`w-8 h-1 mx-2 ${step < currentStep ? 'bg-indigo-600' : 'bg-gray-200'}`} />}
                </div>
              ))}
            </div>
          </div>

          {renderStepContent()}
        </div>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={() => setCurrentStep(Math.max(1, currentStep - 1))} disabled={currentStep === 1}>
            Anterior
          </Button>

          {currentStep < 3 ? (
            <Button onClick={() => setCurrentStep(currentStep + 1)} disabled={!canProceed()}>
              Siguiente
            </Button>
          ) : (
            <Button onClick={handleSubmitRequest} className="bg-green-600 hover:bg-green-700">
              <Check className="h-4 w-4 mr-2" />
              Confirmar solicitud
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsServiceLawyerModal;
