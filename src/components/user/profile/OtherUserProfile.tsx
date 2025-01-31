import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProfileHeader from './ProfileHeader';

type ProfileInfo = {
  userId: number;
  nickname: string;
  bio: string;
  isSuperHost: false;
  showMyReviews: false;
  showMyReservations: false;
  showMyWishlist: false;
  imageUrl: string;
};

const OtherUserProfile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState<ProfileInfo | null>(null);
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
    <div className="flex justify-self-center mb-4 px-10 py-12 min-w-[950px] w-2/3 gap-x-20">
      {/* ProfileHeader */}
      <ProfileHeader
        profile={profile}
        upcomingReservationsCount={0}
        reviewsCount={0}
      />

      {/* 닉네임, 바이오 */}
      <div className="w-3/5 h-full">
        <p className="font-semibold text-3xl">{`${profile.nickname} 님 소개`}</p>
        <p className="text-s mt-6 mb-8">{profile.bio}</p>
        <hr className="w-full mt-10 mb-8 border-t border-gray-300" />
      </div>
    </div>
  );
};

export default OtherUserProfile;
