import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react';

type SignupModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
};

const SignupModal: React.FC<SignupModalProps> = ({
  isOpen,
  onClose,
  onSwitchToLogin,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleNaverLogin = () => {
    try {
      window.location.href = '/api/oauth2/authorization/naver';
    } catch (error) {
      console.error('구글 로그인 중 오류 발생:', error);
      setErrorMessage('구글 로그인 요청 중 오류가 발생했습니다.');
    }
  };

  const handleKakaoLogin = () => {
    try {
      window.location.href = '/api/oauth2/authorization/kakao';
    } catch (error) {
      console.error('구글 로그인 중 오류 발생:', error);
      setErrorMessage('구글 로그인 요청 중 오류가 발생했습니다.');
    }
  };

  const handleGoogleLogin = () => {
    try {
      window.location.href = '/api/oauth2/authorization/google';
    } catch (error) {
      console.error('구글 로그인 중 오류 발생:', error);
      setErrorMessage('구글 로그인 요청 중 오류가 발생했습니다.');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (username.trim() === '' || password.trim() === '') {
      setErrorMessage('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error('회원가입에 실패했습니다.');

      alert('회원가입에 성공했습니다.');
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        setErrorMessage(error.message);
      } else {
        console.error('알 수 없는 오류가 발생했습니다.');
        setErrorMessage('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-lg shadow-lg relative w-auto inline-block">
        <div className="flex w-full min-h-16 px-6 justify-center items-center border-b">
          <button
            onClick={onClose}
            className="flex absolute left-5 w-7 h-7 rounded-full justify-center items-center text-2xl text-black hover:bg-slate-100"
          >
            &times;
          </button>
          <h2 className="mx-4 font-semibold">회원가입</h2>
        </div>

        <div className="p-6">
          <p className="text-slate-900 mt-2 mb-7 text-xl">
            에어비앤비에 오신 것을 환영합니다.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void handleSubmit(e);
            }}
          >
            <div className="relative w-[500px]">
              <input
                type="text"
                placeholder="아이디"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="peer w-full h-14 bg-transparent placeholder-transparent text-slate-800 text-sm border border-slate-600 rounded-t-lg px-3 py-1 pt-4 pb-2 transition duration-300 ease focus:outline focus:border-slate-600 shadow-sm focus:shadow"
              />
              <label
                htmlFor="username"
                className={`absolute cursor-text bg-transparent px-1 left-1.5 text-slate-600 text-sm transition-all transform origin-left ${
                  username.trim() !== ''
                    ? 'top-1 left-1.5 text-xs scale-90 text-slate-600'
                    : 'top-4 text-base text-slate-600 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-600 peer-focus:top-1 peer-focus:left-1.5 peer-focus:text-xs peer-focus:scale-90 peer-focus:text-slate-600'
                }`}
              >
                아이디
              </label>
            </div>
            <div className="relative w-[500px]">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="peer w-full h-14 bg-transparent placeholder-transparent text-slate-800 text-sm border border-slate-600 border-t-transparent rounded-b-lg px-3 py-1 pt-4 pb-2 transition duration-300 ease focus:outline focus:border-slate-600 shadow-sm focus:shadow"
              />
              <label
                htmlFor="password"
                className={`absolute cursor-text bg-transparent px-1 left-1.5 text-slate-600 text-sm transition-all transform origin-left ${
                  password.trim() !== ''
                    ? 'top-1 left-1.5 text-xs scale-90 text-slate-600'
                    : 'top-4 text-base text-slate-600 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-600 peer-focus:top-1 peer-focus:left-1.5 peer-focus:text-xs peer-focus:scale-90 peer-focus:text-slate-600'
                }`}
              >
                비밀번호
              </label>
              <button
                type="button"
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </button>
            </div>
            {errorMessage !== '' && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="mt-5 mb-1 px-14 py-2 w-[500px] h-12 text-white rounded-lg transition-all duration-500 bg-gradient-to-tl from-primary-color from-30% via-[#e8214f] to-[#BD1E59] bg-size-200 bg-pos-0 hover:bg-pos-100"
            >
              회원가입
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-500">
            이미 계정이 있으신가요?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-primary-color hover:underline"
            >
              로그인
            </button>
          </p>

          <div className="relative flex items-center justify-center my-7">
            <hr className="w-full border-t border-gray-300" />
            <span className="absolute bg-white px-3 text-xs text-gray-800">
              또는
            </span>
          </div>

          <div>
            <button
              onClick={handleNaverLogin}
              className="block mt-2 mb-3.5 px-14 py-2 w-[500px] h-12 text-black text-sm border border-slate-800 rounded-lg bg-white hover:bg-gray-100"
            >
              네이버로 시작하기
            </button>
            <button
              onClick={handleKakaoLogin}
              className="block mt-2 mb-3.5 px-14 py-2 w-[500px] h-12 text-black text-sm border border-slate-800 rounded-lg bg-white hover:bg-gray-100"
            >
              카카오로 시작하기
            </button>
            <button
              onClick={handleGoogleLogin}
              className="block mt-2 mb-2 px-14 py-2 w-[500px] h-12 text-black text-sm border border-slate-800 rounded-lg bg-white hover:bg-gray-100"
            >
              구글로 시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
