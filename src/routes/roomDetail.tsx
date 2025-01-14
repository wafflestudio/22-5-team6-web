import { PhotoSizeSelectActual as PhotoSizeSelectActualIcon } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import gallery from '@/components/common/gallery.svg';
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

        const token = localStorage.getItem('token');
        if (token === null) {
          throw new Error('로그인이 필요합니다.');
        }
        if (id === undefined) {
          throw new Error('존재하지 않는 숙소입니다.');
        }

        const response = await fetch(`/api/v1/rooms/main/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('숙소 상세화면 로딩에 실패했습니다.');
        }
        const responseData = (await response.json()) as roomType;
        setRoomData(responseData);
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

  return (
    <div className="flex flex-col justify-start items-center w-full">
      <Topbar />
      <div className="flex flex-col w-full px-[55px]">
        <div className="flex w-full items-end justify-between py-4">
          <div className="text-2xl font-normal">{roomData?.name}</div>
          <Shareheart />
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-2 w-full h-[330px]">
          <div className="col-span-2 row-span-2 flex items-center justify-center rounded-l-xl bg-gray-300 hover:bg-gray-400 cursor-pointer">
            <PhotoSizeSelectActualIcon
              style={{ width: '50%', height: '50%', color: 'white' }}
            />
          </div>
          <div className="col-span-1 flex items-center justify-center bg-gray-300 hover:bg-gray-400 cursor-pointer">
            <PhotoSizeSelectActualIcon
              style={{ width: '50%', height: '50%', color: 'white' }}
            />
          </div>
          <div className="col-span-1 flex items-center justify-center bg-gray-300 hover:bg-gray-400 cursor-pointer rounded-tr-xl">
            <PhotoSizeSelectActualIcon
              style={{ width: '50%', height: '50%', color: 'white' }}
            />
          </div>
          <div className="col-span-1 flex items-center justify-center bg-gray-300 hover:bg-gray-400 cursor-pointer">
            <PhotoSizeSelectActualIcon
              style={{ width: '50%', height: '50%', color: 'white' }}
            />
          </div>
          <div className="col-span-1 relative flex items-center justify-center bg-gray-300 hover:bg-gray-400 cursor-pointer rounded-br-xl">
            <PhotoSizeSelectActualIcon
              style={{ width: '50%', height: '50%', color: 'white' }}
            />
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
          </div>
        </div>
        <div className="flex items-start w-full h-fit">
          <div className="flex-[70%]">
            {roomData !== null ? <Info data={roomData} /> : <p>로딩 중...</p>}
          </div>
          <div className="flex-[30%]">
            {roomData !== null ? (
              <Reservation data={roomData} />
            ) : (
              <p>로딩 중...</p>
            )}
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
        />
      )}
    </div>
  );
};
