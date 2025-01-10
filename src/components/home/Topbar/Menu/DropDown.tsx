import React, { useEffect, useRef } from 'react';

type DropdownProps = {
  isOpen: boolean;
  isLoggedIn: boolean;
  onClose: () => void;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
};

const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  isLoggedIn,
  onClose,
  onLogin,
  onSignup,
  onLogout,
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <div
      ref={dropdownRef}
      className={`absolute right-0 ${
        isLoggedIn ? 'mt-32' : 'mt-44'
      } mr-64 py-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-50`}
    >
      {isLoggedIn ? (
        <button
          onClick={onLogout}
          className="block w-full px-4 py-3 text-left text-sm text-black hover:bg-gray-100"
        >
          로그아웃
        </button>
      ) : (
        <>
          <button
            onClick={onLogin}
            className="block w-full px-4 py-3 text-left text-sm text-black hover:bg-gray-100"
          >
            로그인
          </button>
          <button
            onClick={onSignup}
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
