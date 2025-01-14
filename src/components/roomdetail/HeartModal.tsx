import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import { useEffect } from 'react';

interface HeartModalProps {
  onClose: () => void;
}

const mockHeart = [
  { name: '2025', itemsCount: 1 },
  { name: 'Dresden, Germany 2024', itemsCount: 24 },
  { name: 'Seoul 2024', itemsCount: 15 },
  { name: 'Kirribilli, Australia 2024', itemsCount: 4 },
];

const ShareModal = ({ onClose }: HeartModalProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // 배경 스크롤 비활성화
    return () => {
      document.body.style.overflow = 'auto'; // 모달 닫힐 때 스크롤 복원
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      {/* 배경 클릭 시 닫힘 */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* 모달 내용 */}
      <div className="relative bg-white rounded-lg shadow-lg w-[40%] z-60 overflow-y-auto h-[80%]">
        <div className="grid grid-cols-3 items-center w-full border-b p-2">
          <button
            onClick={onClose}
            className="text-left ml-2 text-3xl text-black"
          >
            &times;
          </button>
          <div className="text-lg text-center font-bold">
            위시리스트에 저장하기
          </div>
          <div></div>
        </div>
        <div className="grid grid-cols-2 w-full">
          {mockHeart.map((list) => (
            <div
              className="w-full flex flex-col items-start m-4"
              key={list.name}
            >
              <PhotoSizeSelectActualIcon className="text-white bg-gray-300 w-full h-[200px] rounded-md" />
              <p className="mt-2 text-lg font-bold">{list.name}</p>
              <p className="text-gray-500">
                저장된 항목&nbsp;{list.itemsCount}개
              </p>
            </div>
          ))}
        </div>

        {/* "새로운 위시리스트 만들기" 버튼, 위치 고정 */}
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <button className="w-full bg-blue-500 text-white p-2 rounded-md">
            새로운 위시리스트 만들기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
