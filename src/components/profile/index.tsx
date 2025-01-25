import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckIcon from '@mui/icons-material/Check';
import ImageIcon from '@mui/icons-material/Image';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Reservation from '../roomdetail/Reservation';

type ProfileInfo = {
  userId: 0;
  nickname: 'string';
  bio: 'string';
  isSuperHost: true;
  showMyReviews: true;
  showMyReservations: true;
  imageUrl: 'string';
};

type Reservation = {
  reservationId: number;
  place: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
};

type Review = {
  content: string;
  rating: number;
  place: string;
  startDate: string;
  endDate: string;
};

const UserProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileInfo | null>(null);
  const [upcomingReservations, setUpcomingReservations] = useState<
    Reservation[]
  >([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string>('');
  const [imageError, setImageError] = useState(false);

  const handleEditClick = () => {
    void navigate('/profile/edit');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token === null || (typeof token === 'string' && token === '')) {
      setError('로그인되지 않았습니다.');
      return;
    }

    const fetchProfile = async () => {
      try {
        const profileResponse = await axios.get<ProfileInfo>(
          '/api/v1/profile',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const profileData = profileResponse.data;
        setProfile(profileData);

        const reservationsResponse = await axios.get<{
          content: Reservation[];
        }>(`/api/v1/reservations/user/${profileData.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const now = new Date();
        const upcoming = reservationsResponse.data.content.filter(
          (reservation) => new Date(reservation.startDate) >= now,
        );
        setUpcomingReservations(upcoming);

        const reviewsResponse = await axios.get<{
          content: Review[];
        }>(`/api/v1/reviews/user/${profileData.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(reviewsResponse.data.content);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.error('프로필 데이터를 가져오는 중 오류 발생:', err.message);

          setError(
            err.response?.status === 401
              ? '로그인이 필요합니다. 다시 로그인해주세요.'
              : '프로필 데이터를 가져오는 데 실패했습니다.',
          );
        } else {
          console.error('예상치 못한 오류 발생:', err);
          setError('알 수 없는 오류가 발생했습니다.');
        }
      }
    };

    void fetchProfile();
  }, []);

  if (error !== '') {
    return <p className="text-red-500">{error}</p>;
  }

  if (profile === null) {
    return <p>로딩 중...</p>;
  }

  return (
    <>
      <div className="flex justify-self-center mb-28 px-10 py-12 min-w-[950px] w-2/3 gap-x-20">
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
                    {upcomingReservations.length}
                  </p>
                  <p className="py-[4.3px] text-[0.625rem] font-semibold">개</p>
                </div>
              </div>
              <hr className="w-full my-3 border-t border-gray-300" />
              <div className="w-24">
                <p className="text-[0.625rem]">내가 작성한 후기</p>
                <div className="flex items-end">
                  <p className="mr-0.5 text-[1.375rem] font-semibold">
                    {reviews.length}
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

        <div className="w-3/5 h-dvh">
          <p className="font-semibold text-3xl">{`${profile.nickname} 님 소개`}</p>
          <button
            onClick={handleEditClick}
            className="mt-6 mb-8 px-[15px] py-[7px] border border-gray-500 rounded-lg bg-white hover:bg-slate-100 text-sm"
          >
            프로필 수정하기
          </button>
          <p className="text-s">{profile.bio}</p>
          <hr className="w-full mt-10 mb-8 border-t border-gray-300" />

          {/* 예약 */}
          <p className="text-xl">다가오는 여행</p>
          <div className="flex w-full mt-8 scrollbar-hidden overflow-x-auto gap-2">
            {upcomingReservations.length > 0 ? (
              upcomingReservations.map((reservation) => (
                <div
                  key={reservation.reservationId}
                  className="p-4 bg-white content-between rounded-2xl min-w-80 min-h-[224px] border border-gray-300 cursor-pointer hover:shadow-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    void navigate(`/reservations/${reservation.reservationId}`);
                  }}
                >
                  <img
                    src={reservation.imageUrl}
                    alt={reservation.place}
                    className="w-full h-32 object-cover rounded-md mb-2"
                  />
                  <h3 className="text-lg font-semibold">{reservation.place}</h3>
                  <p className="text-sm text-gray-500">
                    {reservation.startDate} ~ {reservation.endDate}
                  </p>
                </div>
              ))
            ) : (
              <p>다가오는 여행이 없습니다.</p>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              void navigate('/MyReservations');
            }}
            className="mt-6 p-[10px] text-md underline rounded-lg bg-white hover:bg-gray-100"
          >
            지난 여행 보기
          </button>
          <hr className="w-full my-8 border-t border-gray-300" />

          {/* 리뷰 */}
          <p className="text-xl">내가 작성한 후기</p>
          <div className="flex w-full scrollbar-hidden overflow-x-auto gap-2 mt-8">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div
                  key={index}
                  className="p-6 min-w-80 min-h-[224px] bg-white rounded-2xl border border-gray-300"
                >
                  <p className="h-2/3 text-base text-ellipsis">
                    &quot;{review.content}&quot;
                  </p>
                  <div className="flex items-center">
                    <div className="flex mr-4 w-14 h-14 bg-gray-300 hover:bg-gray-400 items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-base text-black">{review.place}</p>
                      <p className="text-sm text-gray-500">
                        {review.startDate} - {review.endDate}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>작성한 후기가 없습니다.</p>
            )}
          </div>
          <button className="mt-6 p-[10px] text-md underline rounded-lg bg-white hover:bg-gray-100">
            후기 모두 보기
          </button>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
