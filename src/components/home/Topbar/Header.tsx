import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LogoIcon, LogoText } from '@/components/common/constants/Logo';

import Dropdown from './Menu/DropDown';
import LoginModal from './Menu/LoginModal';

const Topbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

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

  const handleLoginModalClose = () => {
    setLoginModalOpen(false);
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
                <MenuIcon sx={{ fontSize: 18 }} />
                <PersonIcon sx={{ fontSize: 30, color: 'gray' }} />
              </button>

              <Dropdown
                isOpen={isDropdownOpen}
                isLoggedIn={isLoggedIn}
                onClose={() => {
                  setDropdownOpen(false);
                }}
                onLogin={handleLoginModalOpen}
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
          navigateToSignup={() => {
            handleLoginModalClose();
            void navigate('/register');
          }}
        />
      )}
    </div>
  );
};

export default Topbar;
