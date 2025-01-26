import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckIcon from '@mui/icons-material/Check';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useState } from 'react';

type ProfileHeaderProps = {
  profile: {
    nickname: string;
    imageUrl: string;
  };
  upcomingReservationsCount: number;
  reviewsCount: number;
};

const ProfileHeader = ({
  profile,
  upcomingReservationsCount,
  reviewsCount,
}: ProfileHeaderProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="h-full sticky top-32">
      <div className="flex w-[342px] h-[230px] justify-center items-center gap-10 bg-white rounded-3xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)]">
        <div className="justify-items-center">
          <div className="relative inline-block">
            {/* 프로필 이미지 */}
            {imageError ? (
              <AccountCircleIcon className="w-32 h-32 text-gray-400" />
            ) : (
              <img
                src={profile.imageUrl}
                alt={`${profile.nickname}님의 프로필`}
                className="w-32 h-32 rounded-full border border-gray-300"
                onError={() => {
                  setImageError(true);
                }}
              />
            )}
            <VerifiedUserIcon className="absolute bottom-1 right-0.5 w-9 h-9 p-2 rounded-full bg-gradient-to-tl from-[#BD1E59] from-20% to-airbnb text-white" />
          </div>
          <p className="mb-2 font-semibold text-3xl">{profile.nickname}</p>
        </div>
        <div className="mr-2">
          <div className="w-24">
            <p className="text-[0.625rem]">다가오는 여행</p>
            <div className="flex items-end">
              <p className="mr-0.5 text-[1.375rem] font-semibold">
                {upcomingReservationsCount}
              </p>
              <p className="py-[4.3px] text-[0.625rem] font-semibold">개</p>
            </div>
          </div>
          <hr className="w-full my-3 border-t border-gray-300" />
          <div className="w-24">
            <p className="text-[0.625rem]">내가 작성한 후기</p>
            <div className="flex items-end">
              <p className="mr-0.5 text-[1.375rem] font-semibold">
                {reviewsCount}
              </p>
              <p className="py-[4.3px] text-[0.625rem] font-semibold">개</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 px-6 py-8 w-[342px] h-[200px] bg-white rounded-3xl border border-gray-300">
        <p className="text-2xl">{`${profile.nickname} 님의 인증 정보`}</p>
        <div className="mt-6 grid gap-y-3">
          <div className="flex items-center gap-3">
            <CheckIcon className="w-8 h-8" />
            <p className="text-base">전화번호</p>
          </div>
          <div className="flex items-center gap-3">
            <CheckIcon className="w-8 h-8" />
            <p className="text-base">이메일</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
