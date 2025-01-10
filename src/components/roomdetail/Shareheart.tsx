import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IosShareIcon from '@mui/icons-material/IosShare';
import ShareModal from '@/components/roomdetail/ShareModal';
import { useState } from 'react'

export const Shareheart = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <div className="flex space-x-[13px]">
      <div
        className="flex items-center space-x-[5px] px-2 py-1 rounded-md hover:bg-[#F7F7F7] cursor-pointer"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <IosShareIcon style={{ width: 15, height: 15 }} />
        <div className="text-sm underline">공유하기</div>
      </div>
      <div className="flex items-center space-x-[5px] px-2 py-1 rounded-md hover:bg-[#F7F7F7] cursor-pointer">
        <FavoriteBorderIcon style={{ width: 15, height: 15 }} />
        <div className="text-sm underline">저장</div>
      </div>
      {isModalOpen && (
        <ShareModal
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  )
}

