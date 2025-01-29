import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ReviewForm = () => {
  const { reservationId } = useParams<{ reservationId: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (reservationId === '' || reservationId === undefined) {
      setError('예약 ID가 유효하지 않습니다.');
      return;
    }

    if (rating < 1 || rating > 5) {
      setError('평점을 선택해주세요.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (token === null || (typeof token === 'string' && token === '')) {
        setError('로그인되지 않았습니다.');
        return;
      }

      await axios.post(
        '/api/v1/reviews',
        {
          reservationId: Number(reservationId),
          content,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert('리뷰가 성공적으로 등록되었습니다.');
      void navigate('/profile');
    } catch (err) {
      console.error(err);
      setError('리뷰 작성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex justify-center items-center h-full bg-white">
      <form
        onSubmit={(e) => {
          void handleSubmit(e);
        }}
        className="p-6 bg-white w-96"
      >
        <h1 className="text-2xl mb-2">리뷰 작성</h1>
        <p className="text-gray-600 mb-6">숙소에서의 경험을 평가해주세요.</p>
        {error !== null && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">평점</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                onMouseEnter={() => {
                  if (star > rating) setHoverRating(star);
                }}
                onMouseLeave={() => {
                  if (star > rating) setHoverRating(0);
                }}
                onMouseDown={() => {
                  setRating(star);
                }}
                onMouseUp={() => {
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
        <button
          type="submit"
          className="w-full py-3 bg-airbnb text-white font-semibold rounded hover:bg-airbnb-hover"
        >
          리뷰 등록하기
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
