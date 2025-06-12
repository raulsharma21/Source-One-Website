import { useEffect } from 'react';
import ProjectBriefWizard from './ProjectBriefWizard';

interface WizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (answers: Record<string, any>, contactData: any) => void;
}

export default function WizardModal({ isOpen, onClose, onSubmit }: WizardModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto"
      onClick={(e) => {
        // Close if clicking on backdrop
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="min-h-full flex items-center justify-center p-4">
        <div 
          className="relative w-full max-w-lg"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          <ProjectBriefWizard 
            isOpen={true} 
            onClose={onClose} 
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}