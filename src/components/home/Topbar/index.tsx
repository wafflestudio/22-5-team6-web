import { Menu, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LogoIcon from '@/components/common/LogoIcon';
import LogoText from '@/components/common/LogoText';

import Dropdown from './Menu/DropDown';
import LoginModal from './Menu/LoginModal';
import SignupModal from './Menu/RegisterModal';
import SearchBar from './Search/SearchBar';

const Topbar = () => {
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

      <div className="px-10 py-4">
        <SearchBar />
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
  );
};

export default Topbar;
