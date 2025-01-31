import React from 'react';

type DeleteReviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteReviewModal: React.FC<DeleteReviewModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;
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
          리뷰를 삭제하시겠습니까?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-airbnb text-white rounded hover:bg-airbnb-hover"
          >
            삭제하기
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

export default DeleteReviewModal;
