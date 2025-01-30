import { useState } from 'react';

import HeartIcon from '@/assets/icons/Heart';
import axiosInstance from '@/axiosInstance';
import { WifiIcon } from '@/components/common/constants/icons';
import type { RoomMain } from '@/types/roomSearch';

type ListingItemProps = {
  listing: RoomMain;
  onUpdateListing?: (updatedListing: RoomMain) => void;
};

const ListingItem = ({ listing, onUpdateListing }: ListingItemProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(listing.isLiked);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleWishList = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      if (listing.isLiked) {
        await axiosInstance.delete(`/api/v1/rooms/${listing.id}/like`);
      } else {
        await axiosInstance.post(`/api/v1/rooms/${listing.id}/like`);
      }
      setIsLiked(!isLiked);

      if (onUpdateListing != null) {
        onUpdateListing({ ...listing, isLiked: !isLiked });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="group cursor-pointer">
      {/* 전체를 감싸는 relative 컨테이너 */}
      <div className="relative">
        {/* 이미지 컨테이너 */}
        <div className="aspect-square overflow-hidden rounded-xl">
          <img
            src={listing.imageUrl}
            alt={listing.name}
            className="h-full w-full object-cover transition-transform"
            onError={(e) => {
              e.currentTarget.src = WifiIcon;
            }}
          />
        </div>

        {/* 하트 버튼 */}
        <div className="absolute top-3 right-3">
          <HeartIcon
            size={24}
            filled={isLiked}
            onClick={(e: React.MouseEvent) => {
              void handleWishList(e);
            }}
          />
        </div>
      </div>

      {/* 에러 메시지 */}
      {error != null && (
        <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {/* 정보 컨테이너 */}
      <div className="mt-3 space-y-1">
        {/* 숙소 이름과 평점 */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-base">{listing.name}</h3>
          <div className="flex items-center gap-1">
            <span>★</span>
            <span>{listing.rating.toFixed(2)}</span>
          </div>
        </div>

        {/* 위치 정보 */}
        <p className="text-gray-500">
          {listing.address.sido} {listing.address.sigungu}
        </p>

        {/* 가격 정보 */}
        <p className="mt-1">
          <span className="font-semibold">
            {listing.price.toLocaleString()}
          </span>
          <span className="text-gray-500">/박</span>
        </p>
      </div>
    </div>
  );
};

export default ListingItem;
