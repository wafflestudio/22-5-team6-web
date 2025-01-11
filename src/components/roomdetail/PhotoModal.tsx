import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import { useEffect } from 'react';

import { Shareheart } from '@/components/roomdetail/Shareheart';

const PhotoModal = ({ onClose }: { onClose: () => void }) => {
  const photos = [
    { title: '거실', icon: <PhotoSizeSelectActualIcon /> },
    { title: '침실', icon: <PhotoSizeSelectActualIcon /> },
    { title: '욕실', icon: <PhotoSizeSelectActualIcon /> },
    { title: '외부', icon: <PhotoSizeSelectActualIcon /> },
    { title: '추가 사진', icon: <PhotoSizeSelectActualIcon /> },
  ];

  useEffect(() => {
    document.body.style.overflow = 'hidden'; // 배경 스크롤 비활성화
    return () => {
      document.body.style.overflow = 'auto'; // 모달 닫힐 때 스크롤 복원
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
      {/* 배경 클릭 시 닫힘 */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* 모달 콘텐츠 */}
      <div className="relative bg-white w-[90%] max-h-[90%] overflow-y-auto shadow-lg z-60">
        {/* 헤더 */}
        <div className="flex bg-white justify-between items-center p-4 mb-4 sticky top-0">
          <div className="flex-1">
            <ChevronLeftIcon
              className="w-8 h-8 cursor-pointer"
              onClick={onClose}
            />
          </div>
          <h2 className="flex-1 text-2xl font-semibold text-center">
            사진 투어
          </h2>
          <div className="flex-1 flex justify-end">
            <Shareheart />
          </div>
        </div>

        {/* 사진 목록 */}
        <div className="grid grid-cols-5 gap-4 mb-12 p-6">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center space-y-2 cursor-pointer"
            >
              <div className="w-full h-24 bg-gray-300 text-white flex items-center justify-center rounded-sm shadow-md">
                {photo.icon}
              </div>
              <span className="text-sm text-gray-700">{photo.title}</span>
            </div>
          ))}
        </div>

        {/* 선택한 사진 보기 */}
        <div className="flex flex-col gap-4 mb-6 p-6">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="flex items-start space-y-2 gap-2 cursor-pointer"
            >
              <span className="text-sm flex-[30%] w-fit text-gray-700">
                {photo.title}
              </span>
              <div className="flex-[70%] w-fit h-[500px] bg-gray-300 text-white flex items-center justify-center rounded-sm shadow-md">
                {photo.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;
