import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type ProfileInfo = {
  userId: 0;
  nickname: 'string';
  bio: 'string';
  isSuperHost: true;
  showMyReviews: true;
  showMyReservations: true;
  imageUrl: 'string';
};

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileInfo | null>(null);
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState<File | null>(null);
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
      } catch (err) {
        console.error(err);
        setError('프로필 데이터를 가져오는 데 실패했습니다.');
      }
    };

    void fetchProfile();
  }, []);

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
          },
        });
      }

      void navigate('/profile');
    } catch (err) {
      console.error(err);
      setError('프로필 수정 중 오류가 발생했습니다.');
    }
  };

  if (profile === null) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="p-6 bg-white rounded-lg shadow-md w-96"
        onSubmit={(e) => {
          e.preventDefault();
          void handleSubmit(e);
        }}
      >
        <h1 className="text-2xl font-semibold mb-4">프로필 수정</h1>
        {error !== '' && <p className="text-red-500 mb-4">{error}</p>}
        <div>
          <label>프로필 사진</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const files = e.target.files;
              if (files !== null && files[0] !== undefined) {
                setImage(files[0]);
              } else {
                setImage(null);
              }
            }}
          ></input>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">닉네임</label>
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
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">소개</label>
          <textarea
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
            }}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder={profile.bio}
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          수정 완료
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;
