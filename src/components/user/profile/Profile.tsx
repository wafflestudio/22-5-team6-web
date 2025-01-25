import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProfileHeader from './ProfileHeader';
import UpcomingReservations from './UpcomingReservations';
import UserReviews from './UserReviews';

type ProfileInfo = {
  userId: number;
  nickname: string;
  bio: string;
  imageUrl: string;
};

type Reservation = {
  reservationId: number;
  place: string;
  startDate: string;
  endDate: string;
};

const UserProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileInfo | null>(null);
  const [upcomingReservationsCount, setUpcomingReservationsCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('token');
      if (token === null || (typeof token === 'string' && token === '')) {
        setError('로그인되지 않았습니다.');
        return;
      }

      try {
        // Fetch profile data
        const profileResponse = await axios.get<ProfileInfo>(
          '/api/v1/profile',
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const profileData = profileResponse.data;
        setProfile(profileData);

        // Fetch reservations
        const reservationsResponse = await axios.get<{
          content: Reservation[];
        }>(`/api/v1/reservations/user/${profileData.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const reservations = reservationsResponse.data.content;

        // Filter upcoming reservations
        const now = new Date();
        const upcomingReservations = reservations.filter(
          (reservation) => new Date(reservation.startDate) >= now,
        );
        setUpcomingReservationsCount(upcomingReservations.length);

        // Fetch review count
        const reviewsResponse = await axios.get<{ totalElements: number }>(
          `/api/v1/reviews/user/${profileData.userId}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setReviewsCount(reviewsResponse.data.totalElements);
      } catch (err) {
        console.error('데이터를 가져오는 데 실패했습니다:', err);
        setError('데이터를 가져오는 데 실패했습니다.');
      }
    };

    void fetchProfileData();
  }, []);

  if (error !== '') return <p className="text-red-500">{error}</p>;
  if (profile === null) return <p>로딩 중...</p>;

  return (
    <div className="flex justify-self-center mb-28 px-10 py-12 min-w-[950px] w-2/3 gap-x-20">
      {/* ProfileHeader */}
      <ProfileHeader
        profile={profile}
        upcomingReservationsCount={upcomingReservationsCount}
        reviewsCount={reviewsCount}
      />

      {/* 닉네임, 바이오 */}
      <div className="w-3/5 h-dvh">
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

        {/* 리뷰 */}
        <p className="text-xl mb-8">내가 작성한 후기</p>
        <UserReviews userId={profile.userId} />
      </div>
    </div>
  );
};

export default UserProfile;
