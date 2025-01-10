import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import { Shareheart } from '@/components/roomdetail/shareheart';

const PhotoModal = ({ onClose }: { onClose: () => void }) => {
  const photos = [
    { title: '거실', icon: <PhotoSizeSelectActualIcon /> },
    { title: '침실', icon: <PhotoSizeSelectActualIcon /> },
    { title: '욕실', icon: <PhotoSizeSelectActualIcon /> },
    { title: '외부', icon: <PhotoSizeSelectActualIcon /> },
    { title: '추가 사진', icon: <PhotoSizeSelectActualIcon /> },
  ];


  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      {/* 배경 클릭 시 닫힘 */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      {/* 모달 내용 */}
      <div className="relative bg-white rounded-lg shadow-lg w-[80%] h-[90%] overflow-y-auto p-6">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">사진 투어</h2>
          <Shareheart />
        </div>

        {/* 사진 목록 */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center space-y-2 cursor-pointer"
            >
              <div className="w-full h-24 bg-gray-300 flex items-center justify-center rounded-lg">
                {photo.icon}
              </div>
              <span className="text-sm text-gray-700">{photo.title}</span>
            </div>
          ))}
        </div>

        {/* 선택한 사진 보기 */}
        <div className="flex flex-col items-center">
          <div className="w-full h-[300px] bg-gray-300 rounded-lg flex items-center justify-center">
            <PhotoSizeSelectActualIcon style={{ fontSize: '50px', color: 'white' }} />
          </div>
          <h3 className="mt-4 text-lg font-semibold">거실</h3>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;
