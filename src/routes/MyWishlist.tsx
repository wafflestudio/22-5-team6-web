import { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import HeartIcon from '@/assets/icons/Heart';
import axiosInstance from '@/axiosInstance';
import Footer from '@/components/home/Footer';
import Header from '@/components/home/Topbar/Header';
import type { ProfileInfo } from '@/components/user/profile/Profile';
import type { WishlistResponse } from '@/types/room';

export const MyWishlist = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [wishlist, setWishlist] = useState<WishlistResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (token == null) {
        throw new Error('로그인이 필요합니다.');
      }

      const response = await axiosInstance.get<ProfileInfo>('/api/v1/profile');
      const responseData = response.data;
      setUserId(responseData.userId); // Store userId
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '오류가 발생했습니다.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const handleWishlist = useCallback(
    async (id: number) => {
      try {
        setIsLoading(true);
        setError(null);

        if (token == null) {
          throw new Error('로그인이 필요합니다.');
        }

        const response = await axiosInstance.get<WishlistResponse>(
          `/api/v1/users/${id}/liked-rooms`,
          {
            params: {
              page: 0,
              size: 10,
              sort: 'createdAt,desc',
            },
          },
        );
        const responseData = response.data;
        setWishlist(responseData); // Store wishlist
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : '오류가 발생했습니다.';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [token],
  );

  // Fetch profile on component mount
  useEffect(() => {
    if (token !== null && token.trim() !== '') {
      void handleProfile(); // Fetch profile to get userId
    }
  }, [handleProfile, token]);

  // Fetch wishlist when userId is available
  useEffect(() => {
    if (userId !== null) {
      void handleWishlist(userId); // Fetch wishlist once userId is available
    }
  }, [handleWishlist, userId, token]);

  return (
    <div className="flex flex-col justify-start items-center w-full">
      <Header />
      <hr className="w-full mb-8 border-t border-gray-300" />
      <div className="w-3/4 mb-8">
        <h1 className="text-3xl font-bold my-4">위시리스트</h1>
      </div>

      {error !== null && error.trim() !== '' && (
        <div className="text-lg text-red-600 mt-8">{error}</div>
      )}

      {isLoading ? (
        <div className="text-lg text-gray-700 my-8">로딩중...</div>
      ) : wishlist !== null ? (
        <div className="grid grid-cols-4 gap-4 px-4 w-full mb-8">
          {wishlist.content.map((item) => (
            <div key={item.roomId} className="relative">
              {' '}
              {/* key를 추가 */}
              {/* 이미지 컨테이너 */}
              <div className="aspect-square overflow-hidden rounded-xl">
                <img
                  src={item.imageUrl}
                  alt={item.roomName}
                  className="h-full w-full object-cover transition-transform"
                  onClick={() => {
                    void navigate(`/${item.roomId}`);
                  }}
                />
              </div>
              {/* 하트 버튼 */}
              <div className="absolute top-3 right-3">
                <HeartIcon size={24} filled={item.isLiked} />
              </div>
              {/* 정보 컨테이너 */}
              <div className="mt-3 space-y-1">
                {/* 숙소 이름과 평점 */}
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-base">{item.roomName}</h3>
                  <div className="flex items-center gap-1">
                    <span>★</span>
                    <span>{item.averageRating.toFixed(2)}</span>
                  </div>
                </div>

                {/* 위치 정보 */}
                <p className="text-gray-500">
                  {item.sido} {item.sigungu}
                </p>

                {/* 가격 정보 */}
                <p className="mt-1">
                  <span className="font-semibold">
                    {item.price.toLocaleString()}
                  </span>
                  <span className="text-gray-500">/박</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-lg text-gray-500 my-8">
          위시리스트가 비어 있습니다.
        </div>
      )}
      <Footer />
    </div>
  );
};
