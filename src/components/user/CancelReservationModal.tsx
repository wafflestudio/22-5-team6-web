import React from 'react';

type CancelModalProps = {
  onClose: () => void;
  onConfirm: () => void;
};

const CancelModal: React.FC<CancelModalProps> = ({ onClose, onConfirm }) => {
  const handleBackdropClick = () => {
    onClose();
  };

  const handleModalClick = (_: React.MouseEvent<HTMLDivElement>) => {
    _.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-lg p-8 w-[400px]"
        onClick={handleModalClick}
      >
        <p className="justify-self-center text-lg mb-6">
          예약을 취소하시겠습니까?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-airbnb text-white rounded hover:bg-airbnb-hover"
          >
            취소하기
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;
