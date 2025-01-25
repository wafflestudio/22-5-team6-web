import axios from 'axios';
import { useEffect, useState } from 'react';

type Review = {
  content: string;
  rating: number;
  place: string;
  startDate: string;
  endDate: string;
};

type UserReviewsProps = {
  userId: number;
};

const UserReviews = ({ userId }: UserReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchReviews = async () => {
      const token = localStorage.getItem('token');
      if (token === null || (typeof token === 'string' && token === '')) {
        setError('로그인되지 않았습니다.');
        return;
      }

      try {
        const response = await axios.get<{ content: Review[] }>(
          `/api/v1/reviews/user/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setReviews(response.data.content);
      } catch {
        setError('후기 데이터를 가져오지 못했습니다.');
      }
    };

    void fetchReviews();
  }, [userId]);

  if (error !== '') return <p className="text-red-500">{error}</p>;
  if (reviews.length === 0)
    return <p className="text-gray-500 ml-2">아직 작성한 후기가 없습니다.</p>;

  return (
    <div>
      <p className="text-xl">내가 작성한 후기</p>
      <div className="flex w-full scrollbar-hidden overflow-x-auto gap-2 mt-8">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="p-6 min-w-80 min-h-[224px] bg-white rounded-2xl border border-gray-300"
          >
            <p className="text-base text-ellipsis">
              &quot;{review.content}&quot;
            </p>
            <p className="text-sm text-gray-500">{`${review.place} - ${review.startDate} ~ ${review.endDate}`}</p>
          </div>
        ))}
      </div>
      <button className="mt-6 p-[10px] text-md underline rounded-lg bg-white hover:bg-gray-100">
        후기 모두 보기
      </button>
    </div>
  );
};

export default UserReviews;
