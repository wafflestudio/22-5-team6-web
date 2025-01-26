import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Reservation = {
  reservationId: number;
  place: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
};

type Review = {
  reservationId: number;
  content: string;
  rating: number;
};

type ProfileInfo = {
  userId: number;
  nickname: string;
};

const MyReviewItems = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [unreviewedReservations, setUnreviewedReservations] = useState<
    Reservation[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (token === null || (typeof token === 'string' && token === '')) {
        setError('로그인되지 않았습니다.');
        return;
      }

      try {
        const profileResponse = await axios.get<ProfileInfo>(
          `/api/v1/profile`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const userId = profileResponse.data.userId;

        const [reviewsResponse, reservationsResponse] = await Promise.all([
          axios.get<{ content: Review[] }>(`/api/v1/reviews/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get<{ content: Reservation[] }>(
            `/api/v1/reservations/user/${userId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          ),
        ]);

        const now = new Date();
        const pastReservations = reservationsResponse.data.content.filter(
          (reservation) => new Date(reservation.endDate) < now,
        );

        // 리뷰가 작성된 예약 ID를 Set으로 저장
        const reviewedReservationIds = new Set(
          reviewsResponse.data.content.map((review) => review.reservationId),
        );

        // 작성하지 않은 지난 예약 필터링
        const unreviewed = pastReservations.filter(
          (reservation) =>
            !reviewedReservationIds.has(reservation.reservationId),
        );

        setReviews(reviewsResponse.data.content);
        setUnreviewedReservations(unreviewed);
      } catch (err) {
        console.error(err);
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error !== null) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <div className="w-3/4 mb-6">
        <h1 className="text-3xl font-bold my-4">후기</h1>
      </div>

      {/* 작성하지 않은 지난 예약 */}
      <div className="w-3/4 mb-10">
        <h2 className="text-2xl mb-4">작성해야 할 후기</h2>
        {unreviewedReservations.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {unreviewedReservations.map((reservation) => (
              <div
                key={reservation.reservationId}
                onClick={() =>
                  void navigate(`/reviews/${reservation.reservationId}`)
                }
                className="p-5 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 cursor-pointer"
              >
                <img
                  src={reservation.imageUrl}
                  alt={reservation.place}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <h2 className="text-lg font-semibold">{reservation.place}</h2>
                <p className="text-sm text-gray-500">
                  {reservation.startDate} - {reservation.endDate}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            현재 작성할 후기가 없습니다. 여행을 한번 다녀올 때가 된 것 같네요!
          </p>
        )}
      </div>

      {/* 작성한 리뷰 */}
      <div className="w-3/4">
        <h2 className="text-2xl mb-4">내가 작성한 후기</h2>
        {reviews.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="p-5 bg-white rounded-lg shadow-md border border-gray-200"
              >
                <p className="text-base line-clamp-3 mb-2">
                  &quot;{review.content}&quot;
                </p>
                <p className="text-sm text-gray-500">평점: {review.rating}점</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">아직 작성한 후기가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default MyReviewItems;
