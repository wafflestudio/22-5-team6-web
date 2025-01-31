import React, { useEffect, useRef } from 'react';

type SearchModalProps = {
  type: 'location' | 'calendar' | 'guests';
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const SearchModal = ({ type, isOpen, onClose, children }: SearchModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current !== null &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getModalStyles = () => {
    const baseStyles =
      'absolute bg-white rounded-3xl shadow-2xl ring-1 ring-black ring-opacity-5 z-30 mt-3';

    switch (type) {
      case 'location':
      case 'calendar':
        return `${baseStyles} left-1/2 -translate-x-1/2 w-full max-w-3xl`;
      case 'guests':
        return `${baseStyles} right-0 w-[400px]`;
      default:
        return baseStyles;
    }
  };

  return (
    <div ref={modalRef} className={getModalStyles()}>
      {children}
    </div>
  );
};

export default SearchModal;
