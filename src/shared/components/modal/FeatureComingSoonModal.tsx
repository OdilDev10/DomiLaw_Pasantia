import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

interface FeatureComingSoonModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  featureName?: string;
}

export function FeatureComingSoonModal({ open, onOpenChange, featureName = 'esta funcionalidad' }: FeatureComingSoonModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-indigo-600"
            >
              <path d="M12 2v4" />
              <path d="m16 4-2 2" />
              <path d="M18 12h4" />
              <path d="m20 16-2-2" />
              <path d="M12 22v-4" />
              <path d="m8 20 2-2" />
              <path d="M6 12H2" />
              <path d="m4 8 2 2" />
              <circle cx="12" cy="12" r="4" />
            </svg>
          </div>
          <DialogTitle className="text-center">¡Estamos trabajando en {featureName}!</DialogTitle>
          <DialogDescription className="text-center">
            Esta característica estará disponible pronto. Te notificaremos cuando esté lista.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button type="button" onClick={() => onOpenChange(false)} className="w-full">
            Entendido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
