import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PastReservations from './PastReservations';
import ProfileHeader from './ProfileHeader';
import UserReviews from './UserReviews';

type ProfileInfo = {
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

const OtherUserProfile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState<ProfileInfo | null>(null);
  const [upcomingReservationsCount, setUpcomingReservationsCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProfileData = async () => {
      if (userId == null) {
        setError('유효하지 않은 사용자 ID입니다.');
        return;
      }

      const token = localStorage.getItem('token');
      if (token === null || (typeof token === 'string' && token === '')) {
        setError('로그인되지 않았습니다.');
        return;
      }

      try {
        // Fetch profile data
        const profileResponse = await axios.get<ProfileInfo>(
          `/api/v1/profile/${userId}`,
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
  }, [userId]);

  if (error !== '') return <p className="text-red-500">{error}</p>;
  if (profile === null) return <p>로딩 중...</p>;

  return (
    <div className="flex justify-self-center mb-4 px-10 py-12 min-w-[950px] w-2/3 min-h-screen gap-x-20">
      {/* ProfileHeader */}
      <ProfileHeader
        profile={profile}
        upcomingReservationsCount={upcomingReservationsCount}
        reviewsCount={reviewsCount}
      />

      <div className="w-3/5 h-full">
        {/* 닉네임, 바이오 */}
        <p className="font-semibold text-3xl">{`${profile.nickname} 님 소개`}</p>
        <p className="text-s mt-6 mb-8">{profile.bio}</p>
        <hr className="w-full mt-10 mb-8 border-t border-gray-300" />

        {/* 지난 여행지 */}
        {profile.showMyReservations && (
          <>
            <p className="text-xl mb-8">
              {profile.nickname} 님이 지금까지 가 본 여행지
            </p>
            <PastReservations userId={profile.userId} />
            <hr className="w-full my-8 border-t border-gray-300" />
          </>
        )}

        {/* 리뷰 */}
        {profile.showMyReviews && (
          <>
            <p className="text-xl mb-8">{profile.nickname} 님이 작성한 후기</p>
            <UserReviews userId={profile.userId} />
          </>
        )}
      </div>
    </div>
  );
};

export default OtherUserProfile;
