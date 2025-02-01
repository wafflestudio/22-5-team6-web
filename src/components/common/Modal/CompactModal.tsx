import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

type CompactModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

const CompactModal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}: CompactModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-0 top-8 mx-auto w-full max-w-xl max-h-[90vh] bg-white rounded-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-center py-4 border-b shrink-0">
          <button
            onClick={onClose}
            className="absolute left-4 p-2 rounded-full hover:bg-gray-100"
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </button>

          {title != null && <h2 className="text-lg font-semibold">{title}</h2>}
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">{children}</div>
        </div>

        {/* Footer - Fixed */}
        {footer != null && (
          <div className="border-t p-4 shrink-0">{footer}</div>
        )}
      </div>
    </>
  );
};

export default CompactModal;
