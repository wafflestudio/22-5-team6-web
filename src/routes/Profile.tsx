import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckIcon from '@mui/icons-material/Check';
import ImageIcon from '@mui/icons-material/Image';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { Menu, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LogoIcon from '@/components/common/LogoIcon';
import LogoText from '@/components/common/LogoText';
import Dropdown from '@/components/home/Topbar/Menu/DropDown';
import LoginModal from '@/components/home/Topbar/Menu/LoginModal';
import SignupModal from '@/components/home/Topbar/Menu/RegisterModal';

const Profile = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(token !== null && token.trim() !== '');
  }, []);

  const handleLogoClick = () => {
    void navigate(`/`);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLoginModalOpen = () => {
    setLoginModalOpen(true);
    setDropdownOpen(false);
  };

  const handleSignupModalOpen = () => {
    setSignupModalOpen(true);
    setDropdownOpen(false);
  };

  const handleLoginModalClose = () => {
    setLoginModalOpen(false);
  };

  const handleSignupModalClose = () => {
    setSignupModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setDropdownOpen(false);
    localStorage.removeItem('token');
    alert('로그아웃 되었습니다.');
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col w-full">
            <div className="h-20 px-10">
              <div className="flex items-center justify-between h-full">
                <div className="flex-1">
                  <button
                    className="flex items-center gap-1"
                    onClick={handleLogoClick}
                  >
                    <LogoIcon />
                    <div className="hidden md:block">
                      <LogoText />
                    </div>
                  </button>
                </div>

                <div className="flex-1 flex items-center justify-end gap-4">
                  <button
                    className="hover:bg-gray-100 px-4 py-2 rounded-full text-sm"
                    onClick={() => {
                      void navigate('/hosting');
                    }}
                  >
                    당신의 공간을 에어비앤비하세요
                  </button>

                  <div className="flex items-center justify-end space-x-4 relative">
                    <button
                      className="flex items-center gap-3 border border-gray-300 rounded-full p-2 hover:shadow-md transition-shadow"
                      onClick={toggleDropdown}
                    >
                      <Menu size={18} />
                      <User size={30} className="text-gray-500" />
                    </button>

                    <Dropdown
                      isOpen={isDropdownOpen}
                      isLoggedIn={isLoggedIn}
                      onClose={() => {
                        setDropdownOpen(false);
                      }}
                      onLogin={handleLoginModalOpen}
                      onSignup={handleSignupModalOpen}
                      onLogout={handleLogout}
                    />
                  </div>
                </div>
              </div>
            </div>

            {isLoginModalOpen && (
              <LoginModal
                isOpen={isLoginModalOpen}
                onClose={handleLoginModalClose}
                onSwitchToSignup={() => {
                  handleLoginModalClose();
                  handleSignupModalOpen();
                }}
              />
            )}

            {isSignupModalOpen && (
              <SignupModal
                isOpen={isSignupModalOpen}
                onClose={handleSignupModalClose}
                onSwitchToLogin={() => {
                  handleSignupModalClose();
                  handleLoginModalOpen();
                }}
              />
            )}
          </div>
        </div>
      </header>

      <div className="flex justify-self-center mb-28 px-10 py-12 min-w-[950px] w-2/3 gap-x-20">
        <div className="h-full sticky top-32">
          <div className="flex w-[342px] h-[230px] justify-center items-center gap-10 bg-white rounded-3xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)]">
            <div className="justify-items-center">
              <div className="relative inline-block">
                <AccountCircleIcon className="w-32 h-32 text-gray-400" />
                <VerifiedUserIcon className="absolute bottom-4 right-1 w-9 h-9 p-2 rounded-full bg-gradient-to-tl from-[#BD1E59] from-20% to-airbnb text-white" />
              </div>
              <p className="mb-2 font-semibold text-3xl">비앤비</p>
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
            <p className="text-2xl">비앤비 님의 인증 정보</p>
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
          <p className="font-semibold text-3xl">비앤비 님 소개</p>
          <button className="mt-6 mb-8 px-[15px] py-[7px] border border-gray-500 rounded-lg bg-white hover:bg-slate-100 text-sm">
            프로필 수정하기
          </button>
          <p className="text-s">즐거운 여행 ✿</p>
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
