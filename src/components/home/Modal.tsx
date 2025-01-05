import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 클릭한 영역이 배경인 경우에만 onClose 호출
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-lg relative w-auto inline-block">
        <div className="flex w-full min-h-16 px-6 justify-center items-center border-b">
          <button
            onClick={onClose}
            className="flex absolute left-5 w-7 h-7 rounded-full justify-center items-center text-2xl text-black hover:bg-slate-100"
          >
            <CloseIcon fontSize="small" />
          </button>
          <p className="mx-4 font-semibold">{title}</p>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
