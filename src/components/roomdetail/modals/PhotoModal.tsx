import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import { useEffect } from 'react';

import { Shareheart } from '@/components/roomdetail/pages/Shareheart';
import type { roomType } from '@/types/roomType';

type Props = {
  onClose: () => void;
  UrlList: string[];
  data: roomType;
};

const PhotoModal = ({ onClose, UrlList, data }: Props) => {
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
            <Shareheart data={data} />
          </div>
        </div>

        {/* 사진 목록 */}
        <div className="grid grid-cols-5 gap-4 mb-12 p-6">
          {UrlList.length > 0 ? (
            <>
              {UrlList.map((url, index) => (
                <div
                  key={index}
                  className="w-full flex flex-col items-center justify-center space-y-2 cursor-pointer"
                >
                  <div className="flex items-center justify-center bg-gray-200 w-full shadow-md rounded-sm">
                    <img
                      className="w-fit h-28"
                      src={url}
                      alt={`사진 ${index}`}
                    />
                  </div>
                  <span className="text-sm text-gray-700">{index}</span>
                </div>
              ))}
              {Array.from({ length: Math.max(5 - UrlList.length, 0) }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="w-full flex flex-col items-center justify-center space-y-2 cursor-pointer"
                  >
                    <div className="flex items-center justify-center bg-gray-200 w-full shadow-md rounded-sm">
                      <PhotoSizeSelectActualIcon className="w-fit h-28 text-white" />
                    </div>
                    <span className="text-sm text-gray-700">정보없음</span>
                  </div>
                ),
              )}
            </>
          ) : (
            Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center space-y-2 cursor-pointer"
              >
                <PhotoSizeSelectActualIcon className="w-full h-24 bg-gray-300 text-white flex items-center justify-center rounded-sm shadow-md" />
                <span className="text-sm text-gray-700">{index}</span>
              </div>
            ))
          )}
        </div>

        {/* 선택한 사진 보기 */}
        <div className="flex flex-col gap-4 mb-6 p-6">
          {UrlList.length > 0 ? (
            <>
              {UrlList.map((url, index) => (
                <div
                  key={index}
                  className="flex items-start space-y-2 gap-2 cursor-pointer"
                >
                  <span className="text-sm flex-[30%] w-fit text-gray-700">
                    {index}
                  </span>
                  <img
                    src={url}
                    className="flex-[70%] w-[500px] h-fit bg-gray-300 text-white flex items-center justify-center rounded-sm shadow-md"
                    alt={`선택한 사진 ${index}`}
                  />
                </div>
              ))}
              {Array.from({ length: Math.max(5 - UrlList.length, 0) }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="flex items-start space-y-2 gap-2 cursor-pointer"
                  >
                    <span className="text-sm flex-[30%] w-fit text-gray-700">
                      정보없음
                    </span>
                    <PhotoSizeSelectActualIcon className="flex-[70%] w-[500px] h-fit bg-gray-300 text-white flex items-center justify-center rounded-sm shadow-md" />
                  </div>
                ),
              )}
            </>
          ) : (
            Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-start space-y-2 gap-2 cursor-pointer"
              >
                <span className="text-sm flex-[30%] w-fit text-gray-700">
                  정보없음
                </span>
                <PhotoSizeSelectActualIcon className="flex-[70%] w-[500px] h-fit bg-gray-300 text-white flex items-center justify-center rounded-sm shadow-md" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;
