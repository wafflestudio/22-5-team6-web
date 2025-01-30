import { PhotoSizeSelectActual as PhotoSizeSelectActualIcon } from '@mui/icons-material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import gallery from '@/assets/icons/roomdetail/gallery.svg';
import Topbar from '@/components/home/Topbar';
import Info from '@/components/roomdetail/Info';
import PhotoModal from '@/components/roomdetail/PhotoModal';
import Reservation from '@/components/roomdetail/Reservation';
import { Shareheart } from '@/components/roomdetail/Shareheart';
import type { roomType } from '@/types/roomType';

export const Roomdetail = () => {
  const [roomData, setRoomData] = useState<roomType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPhotoOpen, setIsPhotoOpen] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const handleDetail = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (id === undefined) {
          throw new Error('존재하지 않는 숙소입니다.');
        }

        const response = await axios.get<roomType>(`/api/v1/rooms/main/${id}`);

        setRoomData(response.data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : '오류가 발생했습니다.';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    void handleDetail();
  }, [id]);

  return roomData !== null ? (
    <div className="flex flex-col justify-start items-center w-full">
      <Topbar />
      <div className="flex flex-col w-full px-[55px]">
        <div className="flex w-full items-end justify-between py-4">
          <div className="text-2xl font-normal">{roomData.roomName}</div>
          <Shareheart />
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-2 w-full h-[330px]">
          {roomData.imageUrlList.length > 0 ? (
            <>
              {roomData.imageUrlList.slice(0, 5).map((url, index) => (
                <div
                  key={index}
                  className={`relative flex items-center justify-center ${
                    index === 0 ? 'col-span-2 row-span-2 rounded-l-xl' : ''
                  } ${index === 2 ? 'rounded-tr-xl' : ''} ${
                    index === 4 ? 'rounded-br-xl' : ''
                  } bg-gray-300 hover:bg-gray-400 cursor-pointer`}
                >
                  <img
                    src={url}
                    alt={`Room image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {index === 4 && (
                    <button
                      onClick={() => {
                        setIsPhotoOpen(true);
                      }}
                      className="absolute bottom-3 right-3 px-3 py-1 gap-[5px] rounded-lg border border-black bg-white flex justify-center items-center w-fit"
                    >
                      <img
                        src={gallery}
                        className="w-[15px] h-[15px] snap-center"
                        alt="gallery icon"
                      />
                      <div className="text-black text-sm text-center">
                        사진 모두 보기
                      </div>
                    </button>
                  )}
                </div>
              ))}
              {Array.from({ length: 5 - roomData.imageUrlList.length }).map(
                (_, index) => (
                  <div
                    key={`icon-${index}`}
                    className={`relative flex items-center justify-center ${
                      roomData.imageUrlList.length + index === 0
                        ? 'col-span-2 row-span-2 rounded-l-xl'
                        : ''
                    } ${
                      roomData.imageUrlList.length + index === 2
                        ? 'rounded-tr-xl'
                        : ''
                    } ${
                      roomData.imageUrlList.length + index === 4
                        ? 'rounded-br-xl'
                        : ''
                    } bg-gray-300 hover:bg-gray-400 cursor-pointer`}
                  >
                    <PhotoSizeSelectActualIcon
                      style={{ width: '50%', height: '50%', color: 'white' }}
                    />
                    {roomData.imageUrlList.length + index === 4 && (
                      <button
                        onClick={() => {
                          setIsPhotoOpen(true);
                        }}
                        className="absolute z-10 bottom-3 right-3 px-3 py-1 gap-[5px] rounded-lg border border-black bg-white flex justify-center items-center w-fit"
                      >
                        <img
                          src={gallery}
                          className="w-[15px] h-[15px] snap-center"
                          alt="gallery icon"
                        />
                        <div className="text-black text-sm text-center">
                          사진 모두 보기
                        </div>
                      </button>
                    )}
                  </div>
                ),
              )}
            </>
          ) : (
            Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className={`relative flex items-center justify-center ${
                  index === 0 ? 'col-span-2 row-span-2 rounded-l-xl' : ''
                } ${index === 2 ? 'rounded-tr-xl' : ''} ${
                  index === 4 ? 'rounded-br-xl' : ''
                } bg-gray-300 hover:bg-gray-400 cursor-pointer`}
              >
                <PhotoSizeSelectActualIcon
                  style={{ width: '50%', height: '50%', color: 'white' }}
                />
                {index === 4 && (
                  <button
                    onClick={() => {
                      setIsPhotoOpen(true);
                    }}
                    className="absolute bottom-3 right-3 px-3 py-1 gap-[5px] rounded-lg border border-black bg-white flex justify-center items-center w-fit"
                  >
                    <img
                      src={gallery}
                      className="w-[15px] h-[15px] snap-center"
                      alt="gallery icon"
                    />
                    <div className="text-black text-sm text-center">
                      사진 모두 보기
                    </div>
                  </button>
                )}
              </div>
            ))
          )}
        </div>
        <div className="flex items-start w-full h-fit">
          <div className="flex-[70%]">
            <Info data={roomData} />
          </div>
          <div className="flex-[30%]">
            <Reservation data={roomData} />
          </div>
        </div>
      </div>
      {isLoading && <p>서버에서 데이터를 가져오는 중...</p>}
      {error !== null && <p>에러: {error}</p>}
      {isPhotoOpen && (
        <PhotoModal
          onClose={() => {
            setIsPhotoOpen(false);
          }}
          UrlList={roomData.imageUrlList}
        />
      )}
    </div>
  ) : (
    <div>데이터 없음</div>
  );
};
