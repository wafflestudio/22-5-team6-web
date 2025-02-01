import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type ProfileInfo = {
  userId: number;
  nickname: 'string';
  bio: 'string';
  isSuperHost: boolean;
  showMyReviews: boolean;
  showMyReservations: boolean;
  imageUrl: 'string';
};

const ProfileEditForm = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileInfo | null>(null);
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');
  const [showMyReviews, setShowMyReviews] = useState(
    profile?.showMyReviews ?? true,
  );
  const [showMyReservations, setShowMyReservations] = useState(
    profile?.showMyReviews ?? true,
  );
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (token === null || (typeof token === 'string' && token === '')) {
        setError('로그인되지 않았습니다.');
        return;
      }

      try {
        const response = await axios.get<ProfileInfo>('/api/v1/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
        setNickname(response.data.nickname);
        setBio(response.data.bio);
        setShowMyReviews(response.data.showMyReviews);
        setShowMyReservations(response.data.showMyReservations);
        setPreviewUrl(response.data.imageUrl);
      } catch (err) {
        console.error(err);
        setError('프로필 데이터를 가져오는 데 실패했습니다.');
      }
    };

    void fetchProfile();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files !== null && files.length > 0 && files[0] !== undefined) {
      const selectedFile = files[0];
      setImage(selectedFile);

      if (previewUrl !== null) {
        URL.revokeObjectURL(previewUrl);
      }

      const newPreviewUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(newPreviewUrl);
    } else {
      setImage(null);
      setPreviewUrl(profile !== null ? profile.imageUrl : null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (token === null || (typeof token === 'string' && token === '')) {
      setError('로그인되지 않았습니다.');
      return;
    }

    try {
      const updatedProfile = {
        nickname: nickname.trim() !== '' ? nickname : profile?.nickname,
        bio: bio.trim() !== '' ? bio : profile?.bio,
        showMyReviews,
        showMyReservations,
      };

      type ProfileResponseData = {
        imageUploadUrl: string;
      };

      const profileResponse = await axios.put<ProfileResponseData>(
        '/api/v1/profile',
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (image !== null) {
        const presignedUrl = profileResponse.data.imageUploadUrl;
        await axios.put(presignedUrl, image, {
          headers: {
            'Content-Type': image.type,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          },
        });
      }

      setTimeout(() => {
        void navigate('/profile', { state: { refresh: true } });
      }, 500);
    } catch (err) {
      console.error(err);
      setError('프로필 수정 중 오류가 발생했습니다.');
    }
  };

  if (profile === null) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className="flex justify-center min-h-screen bg-white">
      <form
        className="p-6 bg-white"
        onSubmit={(e) => {
          e.preventDefault();
          void handleSubmit(e);
        }}
      >
        <div className="flex w-max">
          {/* 프로필 사진 */}
          <div className="relative w-52 h-52 mx-auto mb-4 mr-24">
            {previewUrl !== null ? (
              <img
                src={previewUrl}
                alt="프로필 미리보기"
                className="w-full h-full object-cover rounded-full border border-gray-300"
              />
            ) : (
              <AccountCircleIcon className="text-gray-400 w-full h-full" />
            )}
            <div className="absolute inset-x-0 -bottom-3 flex justify-center">
              <label
                htmlFor="profileImage"
                className="flex items-center space-x-2 px-4 py-2 bg-white text-white text-sm rounded-full shadow-md cursor-pointer"
              >
                <CameraAltIcon className="text-base text-black" />
                <span className="text-black">수정</span>
                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* 닉네임, 바이오 */}
          <div>
            <h1 className="text-3xl font-semibold mt-2 mb-4">프로필 수정</h1>
            <p className="text-gray-500 mb-12">
              프로필은 에어비앤비 전반에 걸쳐 다른 게스트와 호스트에게 나를
              알리는 기본적인 정보입니다.
            </p>
            {error !== '' && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-8">
              <label className="block text-2xl font-semibold mb-3">별명</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder={profile.nickname}
              />
            </div>
            <div className="mb-8">
              <label className="block text-2xl font-semibold mb-3">
                자기소개
              </label>
              <textarea
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder={profile.bio}
                rows={4}
                maxLength={100}
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {bio.length}/100 글자
              </div>
            </div>

            {/* 이전 여행지 공개 */}
            <hr className="w-full mb-8 border-t border-gray-300" />
            <div className="flex mb-8 items-center justify-between">
              <div>
                <label className="block text-2xl font-semibold mb-2">
                  이전 여행지
                </label>
                <p className="text-gray-500">
                  에어비앤비를 통해 방문한 장소를 다른 사람에게 표시할지
                  선택하세요.
                </p>
              </div>
              <div className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showMyReservations}
                    onChange={(e) => {
                      setShowMyReservations(e.target.checked);
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-8 bg-gray-200 hover:bg-black peer-focus:outline-none rounded-full peer peer-checked:bg-black transition duration-300"></div>
                  <span className="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transform transition-transform peer-checked:translate-x-6 flex items-center justify-center">
                    <CheckIcon
                      className={`text-black text-sm transition-opacity duration-300 ${
                        showMyReservations ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </span>
                </label>
              </div>
            </div>

            {/* 후기 공개 */}
            <hr className="w-full mb-8 border-t border-gray-300" />
            <div className="flex mb-8 items-center justify-between">
              <div>
                <label className="block text-2xl font-semibold mb-2">
                  내가 작성한 후기
                </label>
                <p className="text-gray-500">
                  내가 작성한 후기를 다른 사람에게 표시할지 선택하세요.
                </p>
              </div>
              <div className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showMyReviews}
                    onChange={(e) => {
                      setShowMyReviews(e.target.checked);
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-8 bg-gray-200 hover:bg-black peer-focus:outline-none rounded-full peer peer-checked:bg-black transition duration-300"></div>
                  <span className="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transform transition-transform peer-checked:translate-x-6 flex items-center justify-center">
                    <CheckIcon
                      className={`text-black text-sm transition-opacity duration-300 ${
                        showMyReviews ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </span>
                </label>
              </div>
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="py-3 px-8 bg-gray-800 text-white rounded-lg hover:bg-black"
              >
                수정 완료
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditForm;
