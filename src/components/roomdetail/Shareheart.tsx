import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IosShareIcon from '@mui/icons-material/IosShare';
import { useState } from 'react';

import HeartModal from '@/components/roomdetail/HeartModal';
import ShareModal from '@/components/roomdetail/ShareModal';

export const Shareheart = () => {
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
  const [isHeartOpen, setIsHeartOpen] = useState<boolean>(false);
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
        onClick={() => {
          setIsHeartOpen(true);
        }}
      >
        <FavoriteBorderIcon style={{ width: 15, height: 15 }} />
        <div className="text-sm underline">저장하기</div>
      </div>
      {isShareOpen && (
        <ShareModal
          onClose={() => {
            setIsShareOpen(false);
          }}
        />
      )}
      {isHeartOpen && (
        <HeartModal
          onClose={() => {
            setIsHeartOpen(false);
          }}
        />
      )}
    </div>
  );
};
