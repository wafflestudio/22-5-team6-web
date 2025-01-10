import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';

import { Shareheart } from '@/components/roomdetail/Shareheart';

const PhotoModal = ({ onClose }: { onClose: () => void }) => {
  const photos = [
    { title: '거실', icon: <PhotoSizeSelectActualIcon /> },
    { title: '침실', icon: <PhotoSizeSelectActualIcon /> },
    { title: '욕실', icon: <PhotoSizeSelectActualIcon /> },
    { title: '외부', icon: <PhotoSizeSelectActualIcon /> },
    { title: '추가 사진', icon: <PhotoSizeSelectActualIcon /> },
  ];

  return (
    <div className="fixed inset-0 bg-white rounded-lg shadow-lg w-full h-full overflow-y-auto p-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-4 cursor-pointer">
        <div className="flex-1">
          <ChevronLeftIcon className="w-8 h-8" onClick={onClose} />
        </div>
        <h2 className="flex-1 text-2xl font-semibold text-center">사진 투어</h2>
        <div className="flex-1 flex justify-end">
          <Shareheart />
        </div>
      </div>

      {/* 사진 목록 */}
      <div className="grid grid-cols-5 gap-4 mb-6">
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
      <div className="flex flex-col items-center">
        <div className="w-full h-[300px] bg-gray-300 rounded-sm flex items-center justify-center shadow-md">
          <PhotoSizeSelectActualIcon
            style={{ fontSize: '50px', color: 'white' }}
          />
        </div>
        <h3 className="mt-4 text-lg font-normal">거실</h3>
      </div>
    </div>
  );
};

export default PhotoModal;
