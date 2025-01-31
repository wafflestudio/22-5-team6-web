import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '@/axiosInstance';

import DeleteReviewModal from './DeleteReviewModal';
import EditReviewModal from './EditReviewModal';

type Reservation = {
  reservationId: number;
  place: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
};

type Review = {
  reviewId: number;
  reservationId: number;
  content: string;
  rating: number;
  place: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
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

  // 모달 상태
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 프로필 정보 가져오기
        const profileResponse =
          await axiosInstance.get<ProfileInfo>(`/api/v1/profile`);
        const userId = profileResponse.data.userId;

        // 리뷰와 예약 정보 가져오기
        const [reviewsResponse, reservationsResponse] = await Promise.all([
          axiosInstance.get<{ content: Review[] }>(
            `/api/v1/reviews/user/${userId}`,
          ),
          axiosInstance.get<{ content: Reservation[] }>(
            `/api/v1/reservations/user/${userId}`,
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

  // 리뷰 삭제 요청
  const handleDeleteReview = async (reviewId: number) => {
    try {
      await axiosInstance.delete(`/api/v1/reviews/${reviewId}`);
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.reviewId !== reviewId),
      );
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error('리뷰 삭제 실패:', err);
      setError('리뷰 삭제 중 오류가 발생했습니다.');
    }
  };

  // 리뷰 수정 성공 시 업데이트
  const handleReviewUpdate = (updatedReview: {
    content: string;
    rating: number;
  }) => {
    if (selectedReview === null) return;

    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.reviewId === selectedReview.reviewId
          ? {
              ...review,
              content: updatedReview.content,
              rating: updatedReview.rating,
            }
          : review,
      ),
    );
    setIsEditModalOpen(false);
  };

  if (loading) return <p>로딩 중...</p>;
  if (error !== null) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <div className="flex items-center w-3/4 mt-6 mb-4">
        <p
          onClick={() => void navigate(`/profile`)}
          className="text-sm hover:underline hover:cursor-pointer"
        >
          마이 페이지
        </p>
        <KeyboardArrowRightOutlinedIcon className="text-gray-600" />
        <p className="text-sm text-gray-600">후기</p>
      </div>
      <div className="w-3/4 mb-8">
        <h1 className="text-3xl font-bold my-4">후기</h1>
        <hr className="w-full mt-10 mb-2 border-t border-gray-300" />
      </div>

      {/* 작성하지 않은 지난 예약 */}
      <div className="w-3/4 mb-14">
        <h2 className="text-2xl mb-6">작성해야 할 후기</h2>
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
        <h2 className="text-2xl mb-6">내가 작성한 후기</h2>
        {reviews.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <div
                key={review.reviewId}
                className="relative grid p-4 bg-white content-between rounded-2xl min-w-80 max-w-80 h-[200px] border border-gray-300 group"
              >
                <p className="text-base line-clamp-4 mb-2">
                  &quot;{review.content}&quot;
                </p>
                <div className="flex items-center">
                  <img
                    src={review.imageUrl}
                    alt={review.place}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <div className="ml-4">
                    <p>{review.place}</p>
                    <p className="text-sm text-gray-500">{`${review.startDate} - ${review.endDate}`}</p>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-2xl flex items-center justify-center gap-5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <EditOutlinedIcon
                    className="w-10 h-10 text-white hover:text-black cursor-pointer"
                    onClick={() => {
                      setSelectedReview(review);
                      setIsEditModalOpen(true);
                    }}
                  />
                  <DeleteOutlinedIcon
                    className="w-10 h-10 text-white hover:text-red-500 cursor-pointer"
                    onClick={() => {
                      setSelectedReview(review);
                      setIsDeleteModalOpen(true);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">아직 작성한 후기가 없습니다.</p>
        )}
      </div>

      {/* 리뷰 삭제 모달 */}
      {isDeleteModalOpen && selectedReview !== null && (
        <DeleteReviewModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
          }}
          onConfirm={() => void handleDeleteReview(selectedReview.reviewId)}
        />
      )}

      {/* 리뷰 수정 모달 */}
      {isEditModalOpen && selectedReview !== null && (
        <EditReviewModal
          reviewId={selectedReview.reviewId}
          initialContent={selectedReview.content}
          initialRating={selectedReview.rating}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
          }}
          onUpdateSuccess={handleReviewUpdate}
        />
      )}
    </div>
  );
};

export default MyReviewItems;
