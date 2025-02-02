import IosShareIcon from '@mui/icons-material/IosShare';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HeartIcon from '@/assets/icons/Heart';
import axiosInstance from '@/axiosInstance';
import ShareModal from '@/components/roomdetail/modals/ShareModal';
import type { roomType } from '@/types/roomType';

export const Shareheart = ({ data }: { data: roomType }) => {
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(data.isLiked);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleWishList = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const token = localStorage.getItem('token');
    if (token == null) {
      void navigate('/login');
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      if (isLiked) {
        const response = await axiosInstance.delete(
          `/api/v1/rooms/${data.roomId}/like`,
        );
        console.debug('Delete response:', response);
      } else {
        const response = await axiosInstance.post(
          `/api/v1/rooms/${data.roomId}/like`,
        );
        console.debug('Post response:', response);
      }
      setIsLiked(!isLiked);
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex space-x-[13px]">
      <div
        className="flex items-center space-x-[5px] px-2 py-1 rounded-md hover:bg-[#F7F7F7] cursor-pointer"
        onClick={() => {
          setIsShareOpen(true);
        }}
      >
        <IosShareIcon style={{ width: 15, height: 15 }} />
        <div className="text-sm underline">공유하기</div>
      </div>
      <div
        className="flex items-center space-x-[5px] px-2 py-1 rounded-md hover:bg-[#F7F7F7] cursor-pointer"
        onClick={(e: React.MouseEvent) => {
          void handleWishList(e);
        }}
      >
        <HeartIcon
          size={24}
          filled={isLiked}
          onClick={(e: React.MouseEvent) => {
            void handleWishList(e);
          }}
        />
        <div className="text-sm underline">저장하기</div>
      </div>
      {isShareOpen && (
        <ShareModal
          onClose={() => {
            setIsShareOpen(false);
          }}
        />
      )}
      {error != null && (
        <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};
