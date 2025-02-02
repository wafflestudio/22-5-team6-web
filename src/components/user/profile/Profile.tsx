import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '@/axiosInstance';
import LottieLoader from '@/components/common/constants/lottieLoader';

import PastReservations from './PastReservations';
import ProfileHeader from './ProfileHeader';
import UpcomingReservations from './UpcomingReservations';
import UserReviews from './UserReviews';

export type ProfileInfo = {
  userId: number;
  nickname: string;
  bio: string;
  isSuperHost: boolean;
  showMyReviews: boolean;
  showMyReservations: boolean;
  showMyWishlist: boolean;
  imageUrl: string;
};

type Reservation = {
  reservationId: number;
  place: string;
  startDate: string;
  endDate: string;
};

type Room = {
  roomId: number;
  roomName: string;
  imageUrl: string;
  description: string;
  sido: string;
  sigungu: string;
  price: number;
};

type RoomResponse = {
  content: Room[];
  totalPages: number;
};

const UserProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileInfo | null>(null);
  const [upcomingReservationsCount, setUpcomingReservationsCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Fetch profile data
        const profileResponse =
          await axiosInstance.get<ProfileInfo>('/api/v1/profile');
        const profileData = profileResponse.data;
        setProfile(profileData);

        // Fetch reservations
        const reservationsResponse = await axiosInstance.get<{
          content: Reservation[];
        }>(`/api/v1/reservations/user/${profileData.userId}`);
        const reservations = reservationsResponse.data.content;

        // Filter upcoming reservations
        const now = new Date();
        const upcomingReservations = reservations.filter(
          (reservation) => new Date(reservation.startDate) >= now,
        );
        setUpcomingReservationsCount(upcomingReservations.length);

        // Fetch review count
        const reviewsResponse = await axiosInstance.get<{
          totalElements: number;
        }>(`/api/v1/reviews/user/${profileData.userId}`);
        setReviewsCount(reviewsResponse.data.totalElements);

        await fetchRooms(profileData.userId, 0);
      } catch (err) {
        console.error('데이터를 가져오는 데 실패했습니다:', err);
        setError('데이터를 가져오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchProfileData();
  }, []);

  const fetchRooms = async (userId: number, pageNum: number) => {
    try {
      const response = await axiosInstance.get<RoomResponse>(
        `/api/v1/rooms/hosting/${userId}?page=${pageNum}&size=2`,
      );
      setRooms(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error('숙소 목록을 불러오는 데 실패했습니다:', err);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      const nextPage = page + 1;
      setPage(nextPage);
      if (profile !== null) {
        void fetchRooms(profile.userId, nextPage);
      }
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      const prevPage = page - 1;
      setPage(prevPage);
      if (profile !== null) {
        void fetchRooms(profile.userId, prevPage);
      }
    }
  };

  if (error !== '') return <p className="text-red-500">{error}</p>;
  if (profile === null) return <LottieLoader />;
  if (isLoading) return <LottieLoader />;

  return (
    <div className="flex justify-self-center mb-4 px-10 py-12 min-w-[950px] w-2/3 gap-x-20">
      {/* ProfileHeader */}
      <ProfileHeader
        profile={profile}
        upcomingReservationsCount={upcomingReservationsCount}
        reviewsCount={reviewsCount}
      />

      {/* 닉네임, 바이오 */}
      <div className="w-3/5 h-full">
        <p className="font-semibold text-3xl">{`${profile.nickname} 님 소개`}</p>
        <button
          onClick={() => void navigate('/profile/edit')}
          className="mt-6 mb-8 px-[15px] py-[7px] border border-gray-500 rounded-lg bg-white hover:bg-slate-100 text-sm"
        >
          프로필 수정하기
        </button>
        <p className="text-s">{profile.bio}</p>
        <hr className="w-full mt-10 mb-8 border-t border-gray-300" />

        {/* 예약 */}
        <p className="text-xl mb-8">다가오는 여행</p>
        <UpcomingReservations
          userId={profile.userId}
          navigate={(path: string) => void navigate(path)}
        />
        <button
          onClick={() => void navigate('/MyReservations')}
          className="mt-6 p-[10px] text-md underline rounded-lg bg-white hover:bg-gray-100"
        >
          여행 모두 보기
        </button>
        <hr className="w-full my-8 border-t border-gray-300" />

        {/* 지난 여행지 */}
        <p className="text-xl mb-8">
          {profile.nickname} 님이 지금까지 가 본 여행지
        </p>
        <PastReservations userId={profile.userId} />
        <hr className="w-full my-8 border-t border-gray-300" />

        {/* 리뷰 */}
        <p className="text-xl mb-8">{profile.nickname} 님이 작성한 후기</p>
        <UserReviews userId={profile.userId} />
        <hr className="w-full my-8 border-t border-gray-300" />

        {/* 숙소 목록 */}
        <div className="flex items-center w-full justify-between mb-6">
          <p className="text-xl">{profile.nickname} 님이 등록한 숙소</p>
          {/* 페이지네이션 */}
          {rooms.length > 0 && (
            <div className="flex justify-center">
              <button
                onClick={handlePrevPage}
                disabled={page === 0}
                className={`px-4 py-1 mr-2 rounded-full ${
                  page === 0
                    ? 'bg-gray-100 text-gray-500  cursor-not-allowed'
                    : 'bg-gray-200 text-black hover:bg-gray-500'
                }`}
              >
                {'<'}
              </button>
              <button
                onClick={handleNextPage}
                disabled={page >= totalPages - 1}
                className={`px-4 py-1 mr-2 rounded-full ${
                  page >= totalPages - 1
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-100 text-black hover:bg-gray-500 hover:text-white'
                }`}
              >
                {'>'}
              </button>
            </div>
          )}
        </div>

        {rooms.length === 0 ? (
          <p className="text-gray-500 ml-2">아직 등록한 숙소가 없습니다.</p>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-6">
              {rooms.map((room) => (
                <div
                  key={room.roomId}
                  className="p-5 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-transform transform"
                  onClick={() => void navigate(`/${room.roomId}`)}
                >
                  <img
                    src={room.imageUrl}
                    alt={room.roomName}
                    className="w-full h-32 object-cover rounded-md mb-2"
                  />
                  <h2 className="text-lg font-semibold">{room.roomName}</h2>
                  <p className="text-sm text-gray-500">
                    {room.sido}, {room.sigungu}
                  </p>
                  <p className="text-md font-bold mt-2">
                    ₩ {room.price.toLocaleString()} / 박
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
