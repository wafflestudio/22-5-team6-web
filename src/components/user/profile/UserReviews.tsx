import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Review = {
  content: string;
  rating: number;
  place: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
};

type UserReviewsProps = {
  userId: number;
};

const UserReviews = ({ userId }: UserReviewsProps) => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string>('');
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      const token = localStorage.getItem('token');
      if (token === null || (typeof token === 'string' && token === '')) {
        setError('로그인되지 않았습니다.');
        return;
      }

      try {
        const profileResponse = await axios.get<{ userId: number }>(
          '/api/v1/profile',
          { headers: { Authorization: `Bearer ${token}` } },
        );

        setIsCurrentUser(profileResponse.data.userId === userId);

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
    return (
      <div>
        <p className="text-gray-500 ml-2">아직 작성한 후기가 없습니다.</p>
        {isCurrentUser && (
          <button
            onClick={() => void navigate('/MyReviews')}
            className="mt-6 p-[10px] text-md underline rounded-lg bg-white hover:bg-gray-100"
          >
            후기 작성하기
          </button>
        )}
      </div>
    );

  return (
    <div>
      <div className="flex w-full scrollbar-hidden overflow-x-auto gap-2 mt-8">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="grid p-4 bg-white content-between rounded-2xl min-w-80 max-w-80 h-[200px] border border-gray-300 cursor-pointer"
          >
            <p className="text-base line-clamp-4">
              &quot;{review.content}&quot;
            </p>
            <div className="flex items-center">
              <img
                src={review.imageUrl}
                alt={review.place}
                className="w-12 h-12 object-cover rounded-md"
              />
              <div className="ml-4 ">
                <p>{review.place}</p>
                <p className="text-sm text-gray-500">{`${review.startDate} - ${review.endDate}`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isCurrentUser && (
        <button
          onClick={() => void navigate('/MyReviews')}
          className="mt-6 p-[10px] text-md underline rounded-lg bg-white hover:bg-gray-100"
        >
          후기 모두 보기
        </button>
      )}
    </div>
  );
};

export default UserReviews;
