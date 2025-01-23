import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    nickname: '',
    bio: '',
    showMyReviews: false,
    showMyReservations: false,
    showMyWishlist: false,
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files !== null && files.length > 0 && files[0] !== undefined) {
      setProfileImage(files[0]);
    }
  };

  const uploadImageWithPresignedUrl = async (
    presignedUrl: string,
    file: File,
  ): Promise<boolean> => {
    try {
      await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
      });
      return true;
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('nickname', formData.nickname);
    formDataToSend.append('bio', formData.bio);
    formDataToSend.append('showMyReviews', formData.showMyReviews.toString());
    formDataToSend.append(
      'showMyReservations',
      formData.showMyReservations.toString(),
    );
    formDataToSend.append('showMyWishlist', formData.showMyWishlist.toString());
    if (profileImage !== null) {
      formDataToSend.append('profileImage', profileImage);
    }

    type RegisterResponseData = {
      imageUploadUrl: string;
    };

    try {
      const RegisterResponse = await axios.post<RegisterResponseData>(
        '/api/auth/register',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      alert('회원가입 성공');

      const presignedUrl = RegisterResponse.data.imageUploadUrl;

      if (profileImage !== null && presignedUrl !== '') {
        const uploadSuccess = await uploadImageWithPresignedUrl(
          presignedUrl,
          profileImage,
        );

        if (uploadSuccess) {
          console.debug('이미지 업로드 완료');
        } else {
          console.error('이미지 업로드 실패');
        }
      }

      await navigate('/');
    } catch (error) {
      console.error('회원가입 실패:', error);
      setErrorMessage('회원가입 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg w-[500px] p-8">
        <h2 className="text-2xl font-semibold mb-6">회원가입</h2>
        <p className="text-gray-700 mb-4">에어비앤비에 오신 것을 환영합니다.</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void handleSubmit(e);
          }}
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Profile Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              아이디
            </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="아이디"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-airbnb"
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              비밀번호
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-airbnb"
            />
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

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="nickname">
              닉네임
            </label>
            <input
              id="nickname"
              type="text"
              name="nickname"
              placeholder="닉네임"
              value={formData.nickname}
              onChange={handleInputChange}
              className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-airbnb"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="bio">
              자기소개
            </label>
            <input
              id="bio"
              type="text"
              name="bio"
              placeholder="자기소개"
              value={formData.bio}
              onChange={handleInputChange}
              className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-airbnb"
            />
          </div>

          {errorMessage !== '' && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-airbnb text-white rounded-md hover:bg-airbnb-hover transition duration-300"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
