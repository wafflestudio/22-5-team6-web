import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import airBalloon from '@/assets/icons/airballoon.svg';
import googleIcon from '@/assets/icons/socialLogin/googleIcon.svg';
import kakaoIcon from '@/assets/icons/socialLogin/kakaoIcon.svg';
import naverIcon from '@/assets/icons/socialLogin/naverIcon.svg';
import LogoIcon from '@/assets/Logo/LogoIcon';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 현재 단계
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    nickname: '',
    bio: '',
    showMyReviews: true,
    showMyReservations: true,
    showMyWishlist: true,
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleNaverLogin = () => {
    try {
      window.location.href = '/api/oauth2/authorization/naver';
    } catch (error) {
      console.error('네이버 로그인 중 오류 발생:', error);
      setErrorMessage('네이버 로그인 요청 중 오류가 발생했습니다.');
    }
  };

  const handleKakaoLogin = () => {
    try {
      window.location.href = '/api/oauth2/authorization/kakao';
    } catch (error) {
      console.error('카카오 로그인 중 오류 발생:', error);
      setErrorMessage('카카오 로그인 요청 중 오류가 발생했습니다.');
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files !== null && files.length > 0 && files[0] !== undefined) {
      const file = files[0];
      setProfileImage(file);

      // 선택한 파일 미리보기
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setErrorMessage('');
    }
  };

  const validateStep = () => {
    if (step === 1) {
      if (formData.username.trim() === '' || formData.password.trim() === '') {
        setErrorMessage('아이디와 비밀번호를 모두 입력해주세요.');
        return false;
      }
    } else if (step === 2) {
      if (profileImage === null) {
        setErrorMessage('프로필 사진을 선택해주세요.');
        return false;
      }
    } else if (step === 3) {
      if (formData.nickname.trim() === '') {
        setErrorMessage('닉네임을 입력해주세요.');
        return false;
      }
    } else if (step === 4) {
      if (formData.bio.trim() === '') {
        setErrorMessage('자기소개를 입력해주세요.');
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep() && step < 4) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      if (!validateStep()) return;

      interface RegisterResponse {
        imageUploadUrl: string;
      }

      // 회원가입 요청
      const response = await axios.post<RegisterResponse>(
        '/api/auth/register',
        {
          username: formData.username,
          password: formData.password,
          nickname: formData.nickname,
          bio: formData.bio,
          showMyReviews: formData.showMyReviews,
          showMyReservations: formData.showMyReservations,
          showMyWishlist: formData.showMyWishlist,
        },
      );

      const imageUploadUrl = response.data.imageUploadUrl;

      // 프로필 이미지 업로드
      if (profileImage !== null && imageUploadUrl !== '') {
        await axios.put(imageUploadUrl, profileImage, {
          headers: {
            'Content-Type': profileImage.type,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          },
        });
      }

      setIsRegistered(true);
    } catch (error) {
      // 409 상태 코드 처리
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        setErrorMessage('이미 사용 중인 아이디입니다. 다시 시도해주세요.');
        setStep(1); // 첫 번째 단계로 이동
      } else {
        console.error('회원가입 실패:', error);
        setErrorMessage('회원가입 요청 중 오류가 발생했습니다.');
      }
    }
  };

  const handleLogin = async () => {
    try {
      const params = new URLSearchParams();
      params.append('username', formData.username);
      params.append('password', formData.password);

      // 로그인 요청
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      if (!response.ok) {
        throw new Error('로그인에 실패했습니다.');
      }

      window.location.href = response.url;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  if (isRegistered) {
    // 회원가입 완료 페이지
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white w-max flex items-center p-8">
          <img
            src={airBalloon}
            alt="열기구"
            className="w-96 h-96 mx-auto mb-6"
          />
          <div className="w-max">
            <h2 className="text-5xl mb-6">환영합니다!</h2>
            <p className="text-gray-700 text-xl mb-8">
              에어비앤비에 가입해주셔서 감사합니다. 이제부터 멋진 여행을
              계획해보세요!
            </p>
            <button
              onClick={() => void handleLogin()}
              className="py-3 px-6 bg-airbnb text-white rounded-md hover:bg-airbnb-hover transition duration-300"
            >
              에어비앤비 시작하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center content-between h-screen bg-white">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full bg-white py-12 px-12 z-10">
        <div
          onClick={() => void navigate('/')}
          className="w-12 h-12 cursor-pointer fill-black"
        >
          <LogoIcon />
        </div>
      </div>

      <div className="flex-1 mt-8 mb-28 flex justify-center items-center overflow-auto">
        <div className="bg-white w-max min-w-[500px] p-8">
          <h2 className="text-lg mb-4">회원가입</h2>

          {/* 단계별 화면 */}
          {step === 1 && (
            <div>
              <h2 className="text-4xl mb-16">
                아이디와 비밀번호를 입력해주세요.
              </h2>
              <div className="flex flex-col items-center w-full">
                <div className="relative w-3/4 mb-4">
                  <input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="아이디"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="peer w-full h-14 bg-transparent placeholder-transparent text-slate-800 text-sm border border-slate-600 rounded-lg px-3 py-1 pt-4 pb-2 transition duration-300 ease focus:outline focus:border-slate-600 shadow-sm focus:shadow"
                  />
                  <label
                    htmlFor="username"
                    className={`absolute cursor-text bg-transparent px-1 left-1.5 text-slate-600 text-sm transition-all transform origin-left ${
                      formData.username.trim() !== ''
                        ? 'top-1 left-1.5 text-xs scale-90 text-slate-600'
                        : 'top-4 text-base text-slate-600 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-600 peer-focus:top-1 peer-focus:left-1.5 peer-focus:text-xs peer-focus:scale-90 peer-focus:text-slate-600'
                    }`}
                  >
                    아이디
                  </label>
                </div>

                <div className="relative w-3/4 mb-4">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="비밀번호"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="peer w-full h-14 bg-transparent placeholder-transparent text-slate-800 text-sm border border-slate-600 rounded-lg px-3 py-1 pt-4 pb-2 transition duration-300 ease focus:outline focus:border-slate-600 shadow-sm focus:shadow"
                  />
                  <label
                    htmlFor="password"
                    className={`absolute cursor-text bg-transparent px-1 left-1.5 text-slate-600 text-sm transition-all transform origin-left ${
                      formData.password.trim() !== ''
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
                <p className="mt-4 text-gray-400">또는 SNS 간편 가입</p>
                <div className="flex gap-8 mt-4">
                  <img
                    src={naverIcon}
                    onClick={handleNaverLogin}
                    className="w-10 h-10 p-2 rounded-full border border-gray-300 cursor-pointer"
                  />
                  <img
                    src={kakaoIcon}
                    onClick={handleKakaoLogin}
                    className="w-10 h-10 p-2 rounded-full border border-gray-300 cursor-pointer"
                  />
                  <img
                    src={googleIcon}
                    onClick={handleGoogleLogin}
                    className="w-10 h-10 p-2 rounded-full border border-gray-300 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-4xl mb-12">프로필 사진을 선택해주세요.</h2>
              <div className="flex flex-col items-center">
                <div className="relative group w-56 h-56">
                  {previewImage !== null ? (
                    <img
                      src={previewImage}
                      alt="프로필 미리보기"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center transition duration-300 group-hover:bg-gray-300">
                      <CameraAltOutlinedIcon className="text-gray-500 text-5xl group-hover:text-gray-700 transition duration-300" />
                    </div>
                  )}

                  {previewImage !== null && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300">
                      <CameraAltOutlinedIcon className="text-white text-5xl" />
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-4xl mb-12">별명을 입력해주세요.</h2>
              <div className="relative w-[500px] mb-4">
                <input
                  id="nickname"
                  type="text"
                  name="nickname"
                  placeholder="별명"
                  value={formData.nickname}
                  onChange={handleInputChange}
                  className="peer w-full h-14 bg-transparent placeholder-transparent text-slate-800 text-sm border border-slate-600 rounded-lg px-3 py-1 pt-4 pb-2 transition duration-300 ease focus:outline focus:border-slate-600 shadow-sm focus:shadow"
                />
                <label
                  htmlFor="nickname"
                  className={`absolute cursor-text bg-transparent px-1 left-1.5 text-slate-600 text-sm transition-all transform origin-left ${
                    formData.nickname.trim() !== ''
                      ? 'top-1 left-1.5 text-xs scale-90 text-slate-600'
                      : 'top-4 text-base text-slate-600 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-600 peer-focus:top-1 peer-focus:left-1.5 peer-focus:text-xs peer-focus:scale-90 peer-focus:text-slate-600'
                  }`}
                >
                  별명
                </label>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-4xl mb-12">
                {formData.nickname} 님을 소개해주세요.
              </h2>
              <div className="relative w-[500px]">
                <textarea
                  id="bio"
                  name="bio"
                  placeholder="자기소개"
                  value={formData.bio}
                  onChange={(e) => {
                    setFormData({ ...formData, bio: e.target.value });
                  }}
                  maxLength={100}
                  className="w-full h-32 bg-transparent text-slate-800 text-sm border border-slate-600 rounded-lg px-3 py-2 transition duration-300 ease focus:outline-none focus:ring-2 focus:ring-slate-600 shadow-sm resize-none"
                ></textarea>
                <div className="text-right text-xs text-gray-500 mt-1">
                  {formData.bio.length}/100
                </div>
              </div>
            </div>
          )}

          {/* 오류 메시지 */}
          {errorMessage !== '' && (
            <p className="text-red-500 text-sm mt-2 mb-4">{errorMessage}</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md py-2 z-10">
        {/* Progress Bar */}
        <div className="h-2 bg-gray-200 overflow-hidden mb-8">
          <div
            className="h-full bg-airbnb transition-all duration-500"
            style={{
              width: `${((step - 1) / 3) * 100}%`,
            }}
          />
        </div>

        {/* 버튼 */}
        <div className="flex justify-between mt-6 pb-8 px-12">
          <button
            type="button"
            disabled={step === 1}
            onClick={prevStep}
            className={`py-3 px-8 rounded-lg ${
              step === 1
                ? 'bg-gray-100 cursor-not-allowed'
                : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            뒤로
          </button>
          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="py-3 px-8 bg-airbnb text-white rounded-lg hover:bg-airbnb-hover"
            >
              다음
            </button>
          ) : (
            <button
              type="button"
              onClick={() => void handleSubmit()}
              className="py-3 px-8 bg-airbnb text-white rounded-lg hover:bg-airbnb-hover"
            >
              완료
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
