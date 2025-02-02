import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import airBalloon from '@/assets/icons/airballoon.svg';
import LogoIcon from '@/assets/Logo/LogoIcon';
import axiosInstance from '@/axiosInstance';

const CompleteProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(2);
  const [formData, setFormData] = useState({
    nickname: '',
    bio: '',
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isProfileCompleted, setIsProfileCompleted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files !== null && files.length > 0 && files[0] !== undefined) {
      const file = files[0];
      setProfileImage(file);

      // 미리보기 이미지 설정
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setErrorMessage('');
    }
  };

  const validateStep = () => {
    if (step === 2 && profileImage === null) {
      setErrorMessage('프로필 사진을 선택해주세요.');
      return false;
    }
    if (step === 3 && formData.nickname.trim() === '') {
      setErrorMessage('닉네임을 입력해주세요.');
      return false;
    }
    if (step === 4 && formData.bio.trim() === '') {
      setErrorMessage('자기소개를 입력해주세요.');
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep() && step < 4) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 2) setStep(step - 1);
  };

  const handleSubmit = async (): Promise<void> => {
    const token = localStorage.getItem('token');
    if (token === null || (typeof token === 'string' && token === '')) {
      setErrorMessage('로그인되지 않았습니다.');
      return;
    }

    try {
      if (!validateStep()) return;

      // 프로필 업데이트 요청
      const response = await axiosInstance.post<{ imageUploadUrl: string }>(
        '/api/v1/profile',
        {
          nickname: formData.nickname,
          bio: formData.bio,
        },
      );

      const imageUploadUrl = response.data.imageUploadUrl;

      // 프로필 이미지 업로드
      if (profileImage !== null && imageUploadUrl !== '') {
        await axiosInstance.put(imageUploadUrl, profileImage, {
          headers: {
            'Content-Type': profileImage.type,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          },
        });
      }

      setIsProfileCompleted(true);
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
      setErrorMessage('프로필 업데이트 중 오류가 발생했습니다.');
    }
  };

  if (isProfileCompleted) {
    // 완료 페이지
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
              프로필이 성공적으로 설정되었습니다. 이제부터 멋진 여행을
              계획해보세요!
            </p>
            <button
              onClick={() => void navigate('/')}
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
      <div className="fixed top-0 left-0 w-full py-12 px-12 z-10">
        <div
          onClick={() => void navigate('/')}
          className="w-12 h-12 cursor-pointer fill-black"
        >
          <LogoIcon />
        </div>
      </div>

      <div className="flex-1 mt-8 mb-28 flex justify-center items-center overflow-auto">
        <div className="bg-white w-max min-w-[500px] p-8">
          <h2 className="text-lg mb-4">프로필 설정</h2>

          {/* 단계별 화면 */}
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
              <h2 className="text-4xl mb-12">자기소개를 입력해주세요.</h2>
              <div className="relative w-[500px]">
                <textarea
                  id="bio"
                  name="bio"
                  placeholder="자기소개"
                  value={formData.bio}
                  onChange={handleInputChange}
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
        <div className="h-2 bg-gray-200 rounded-md overflow-hidden mb-8">
          <div
            className="h-full bg-airbnb transition-all duration-500"
            style={{
              width: `${((step - 1) / 3) * 100}%`,
            }}
          />
        </div>

        <div className="flex justify-between mt-6 pb-8 px-12">
          <button
            type="button"
            disabled={step === 1}
            onClick={prevStep}
            className={`py-3 px-8 rounded-lg ${
              step === 1
                ? 'bg-gray-100 underline cursor-not-allowed'
                : 'bg-gray-100 underline text-black hover:bg-gray-200'
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

export default CompleteProfilePage;
