import { X } from 'lucide-react';
import React from 'react';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const BaseModal = ({ isOpen, onClose, title, children }: BaseModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-0 top-8 mx-auto max-w-2xl bg-white rounded-xl z-50">
        {/* Header */}
        <div className="relative flex items-center justify-center py-4 border-b">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute left-4 p-2 rounded-full hover:bg-gray-100"
          >
            <X size={18} />
          </button>

          {/* Title */}
          {title != null && <h2 className="text-lg font-semibold">{title}</h2>}
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </>
  );
};

export default BaseModal;
