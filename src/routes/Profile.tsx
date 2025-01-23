// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckIcon from '@mui/icons-material/Check';
import ImageIcon from '@mui/icons-material/Image';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import Header from '@/components/home/Topbar/Header';

type UserProfile = {
  userId: 0;
  nickname: 'string';
  bio: 'string';
  isSuperHost: true;
  showMyReviews: true;
  showMyReservations: true;
  imageUrl: 'string';
};

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token === null || (typeof token === 'string' && token === '')) {
      setError('로그인되지 않았습니다.');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get<UserProfile>('/api/v1/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          validateStatus: (status) => status < 400,
        });
        setProfile(response.data);
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
      <Header />

      <div className="flex justify-self-center mb-28 px-10 py-12 min-w-[950px] w-2/3 gap-x-20">
        <div className="h-full sticky top-32">
          <div className="flex w-[342px] h-[230px] justify-center items-center gap-10 bg-white rounded-3xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)]">
            <div className="justify-items-center">
              <div className="relative inline-block">
                {/* 프로필 이미지 */}
                <img
                  src={profile.imageUrl}
                  alt={`${profile.nickname}님의 프로필`}
                  className="w-32 h-32 rounded-full border border-gray-300"
                />
                <VerifiedUserIcon className="absolute bottom-1 right-0.5 w-9 h-9 p-2 rounded-full bg-gradient-to-tl from-[#BD1E59] from-20% to-airbnb text-white" />
              </div>
              <p className="mb-2 font-semibold text-3xl">{profile.nickname}</p>
            </div>
            <div className="mr-2">
              <div className="w-24">
                <p className="text-[0.625rem]">다가오는 여행</p>
                <div className="flex items-end">
                  <p className="mr-0.5 text-[1.375rem] font-semibold">1</p>
                  <p className="py-[4.3px] text-[0.625rem] font-semibold">개</p>
                </div>
              </div>
              <hr className="w-full my-3 border-t border-gray-300" />
              <div className="w-24">
                <p className="text-[0.625rem]">내가 작성한 후기</p>
                <div className="flex items-end">
                  <p className="mr-0.5 text-[1.375rem] font-semibold">5</p>
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
          <button className="mt-6 mb-8 px-[15px] py-[7px] border border-gray-500 rounded-lg bg-white hover:bg-slate-100 text-sm">
            프로필 수정하기
          </button>
          <p className="text-s">{profile.bio}</p>
          <hr className="w-full mt-10 mb-8 border-t border-gray-300" />
          <p className="text-xl">다가오는 여행</p>
          <div className="flex w-full scrollbar-hidden overflow-x-auto gap-2">
            <div className="mt-8 p-6 w-80 content-between min-h-[224px] bg-white rounded-2xl border border-gray-300">
              <div className="flex w-68 h-28 bg-gray-300 hover:bg-gray-400 items-center justify-center">
                <ImageIcon className="w-14 h-14 text-white" />
              </div>
              <p className="mt-2 text-lg">강릉시</p>
              <p className="text-base text-gray-500">
                2025년 2월 20일 - 2025년 2월 21일
              </p>
            </div>
          </div>
          <button className="mt-6 p-[10px] text-md underline rounded-lg bg-white hover:bg-gray-100">
            지난 여행 보기
          </button>
          <hr className="w-full my-8 border-t border-gray-300" />
          <p className="text-xl">내가 작성한 후기</p>
          <div className="flex w-full scrollbar-hidden overflow-x-auto gap-2">
            <div className="mt-8 p-6 min-w-72 min-h-[224px] bg-white rounded-2xl border border-gray-300">
              <p className="h-2/3 text-base text-ellipsis">
                &quot;너무 친절하시고, 숙소도 깔끔해서 잘 쉬었습니다! 간단한
                한식 조식 주시는데 엄청 맛있었어요. 역시 전주..&quot;
              </p>
              <div className="flex items-center">
                <div className="flex mr-4 w-14 h-14 bg-gray-300 hover:bg-gray-400 items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-base text-black">전주시</p>
                  <p className="text-sm text-gray-500">2024년 10월</p>
                </div>
              </div>
            </div>
            <div className="mt-8 p-6 min-w-72 min-h-[224px] bg-white rounded-2xl border border-gray-300">
              <p className="h-2/3 text-base text-ellipsis">
                &quot;숙소 근처에 유명한 시장이 있어서 좋았어요 방도 엄청
                깨끗해요!&quot;
              </p>
              <div className="flex items-center">
                <div className="flex mr-4 w-14 h-14 bg-gray-300 hover:bg-gray-400 items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-base text-black">속초시</p>
                  <p className="text-sm text-gray-500">2024년 7월</p>
                </div>
              </div>
            </div>
            <div className="mt-8 p-6 min-w-72 min-h-[224px] bg-white rounded-2xl border border-gray-300">
              <p className="h-2/3 text-base text-ellipsis">
                &quot;안쪽 골목에 있어서 처음에 찾을 때 조금 헤맸는데, 큰 길이
                아니라서 조용히 쉴 수 있었습니다. 다음에 또 갈게요!&quot;
              </p>
              <div className="flex items-center">
                <div className="flex mr-4 w-14 h-14 bg-gray-300 hover:bg-gray-400 items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-base text-black">마포구</p>
                  <p className="text-sm text-gray-500">2023년 12월</p>
                </div>
              </div>
            </div>
          </div>
          <button className="mt-6 p-[10px] text-md underline rounded-lg bg-white hover:bg-gray-100">
            후기 모두 보기
          </button>
        </div>
      </div>

      <footer className="h-80 bg-gray-100 border-t border-gray-300"></footer>
    </>
  );
};

export default Profile;
