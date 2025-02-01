import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import React, { useEffect, useState } from 'react';

import axiosInstance from '@/axiosInstance';

type EditReviewModalProps = {
  reviewId: number;
  initialContent: string;
  initialRating: number;
  isOpen: boolean;
  onClose: () => void;
  onUpdateSuccess: (updatedReview: { content: string; rating: number }) => void;
};

const EditReviewModal: React.FC<EditReviewModalProps> = ({
  reviewId,
  initialContent,
  initialRating,
  isOpen,
  onClose,
  onUpdateSuccess,
}) => {
  const [content, setContent] = useState(initialContent);
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setContent(initialContent);
      setRating(initialRating);
    }
  }, [isOpen, initialContent, initialRating]);

  const handleUpdateReview = async () => {
    if (content.trim() === '') {
      setError('리뷰 내용을 입력해주세요.');
      return;
    }

    if (rating < 1 || rating > 5) {
      setError('평점은 1~5 사이여야 합니다.');
      return;
    }

    const token = localStorage.getItem('token');
    if (token === null || (typeof token === 'string' && token === '')) {
      setError('로그인되지 않았습니다.');
      return;
    }

    try {
      await axiosInstance.put(`/api/v1/reviews/${reviewId}`, {
        content,
        rating,
      });

      alert('리뷰가 성공적으로 수정되었습니다.');
      onUpdateSuccess({ content, rating });
      onClose();
    } catch (err) {
      console.error(err);
      setError('리뷰 수정 중 오류가 발생했습니다.');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="p-6 bg-white w-96 rounded-lg shadow-lg"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl">리뷰 수정</h1>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200"
          >
            <ClearOutlinedIcon />
          </button>
        </div>
        <p className="text-gray-600 mb-6">숙소에서의 경험을 평가해주세요.</p>
        {error !== null && <p className="text-red-500 mb-4">{error}</p>}

        {/* 별점 선택 */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">평점</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                onMouseEnter={() => {
                  setHoverRating(star);
                }}
                onMouseLeave={() => {
                  setHoverRating(0);
                }}
                onClick={() => {
                  setRating(star);
                }}
                className="cursor-pointer"
              >
                {star <= rating ? (
                  <StarIcon fontSize="large" className="text-yellow-400" />
                ) : star <= hoverRating ? (
                  <StarIcon fontSize="large" className="text-yellow-300/75" />
                ) : (
                  <StarBorderIcon fontSize="large" className="text-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 리뷰 내용 입력 */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">리뷰 내용</label>
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
            required
          />
        </div>

        {/* 수정 버튼 */}
        <button
          onClick={() => {
            void handleUpdateReview();
          }}
          className="w-full py-3 bg-airbnb text-white font-semibold rounded hover:bg-airbnb-hover"
        >
          리뷰 수정하기
        </button>
      </div>
    </div>
  );
};

export default EditReviewModal;
