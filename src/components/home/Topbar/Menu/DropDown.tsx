import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

type DropdownProps = {
  isOpen: boolean;
  isLoggedIn: boolean;
  onClose: () => void;
  onLogin: () => void;
  onLogout: () => void;
};

const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  isLoggedIn,
  onClose,
  onLogin,
  onLogout,
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  const handleNavigation = (path: string): void => {
    void navigate(path);
    onClose();
  };

  return (
    <div
      ref={dropdownRef}
      className={`absolute right-0 ${
        isLoggedIn ? 'mt-[360px]' : 'mt-44'
      } mr-64 py-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-50`}
    >
      {isLoggedIn ? (
        <>
          <button
            onClick={() => {
              handleNavigation('/profile');
            }}
            className="block w-full px-4 py-3 text-left text-sm text-black hover:bg-gray-100"
          >
            마이 페이지
          </button>
          <button
            onClick={() => {
              handleNavigation('/MyReservations');
            }}
            className="block w-full px-4 py-3 text-left text-sm text-black hover:bg-gray-100"
          >
            내 여행
          </button>
          <button
            onClick={() => {
              handleNavigation('/MyReviews');
            }}
            className="block w-full px-4 py-3 text-left text-sm text-black hover:bg-gray-100"
          >
            내 후기
          </button>
          <hr className="w-full my-1 border-t border-gray-300" />
          <button
            onClick={() => {
              handleNavigation('/MyWishList');
            }}
            className="block w-full px-4 py-3 text-left text-sm text-black hover:bg-gray-100"
          >
            위시리스트
          </button>
          <button
            onClick={() => {
              handleNavigation('/MyHosting');
            }}
            className="block w-full px-4 py-3 text-left text-sm text-black hover:bg-gray-100"
          >
            숙소 관리
          </button>
          <hr className="w-full my-1 border-t border-gray-300" />
          <button
            onClick={onLogout}
            className="block w-full px-4 py-3 text-left text-sm text-black hover:bg-gray-100"
          >
            로그아웃
          </button>
        </>
      ) : (
        <>
          <button
            onClick={onLogin}
            className="block w-full px-4 py-3 text-left text-sm text-black hover:bg-gray-100"
          >
            로그인
          </button>
          <button
            onClick={() => {
              handleNavigation('/register');
            }}
            className="block w-full px-4 py-3 text-left text-sm text-black hover:bg-gray-100"
          >
            회원가입
          </button>
        </>
      )}
    </div>
  );
};

export default Dropdown;
