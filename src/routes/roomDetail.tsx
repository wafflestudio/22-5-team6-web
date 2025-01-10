import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import gallery from '@/components/common/gallery.svg';
import Topbar from '@/components/home/Topbar';
import Info from '@/components/roomdetail/Info';
import PhotoModal from '@/components/roomdetail/PhotoModal';
import Reservation from '@/components/roomdetail/Reservation';
import { Shareheart } from '@/components/roomdetail/Shareheart';
import { mockRoom } from '@/mock/mockRoom';
import type { roomType } from '@/types/roomType';

export const Roomdetail = () => {
  const [data, setData] = useState<roomType>(mockRoom); // 서버 응답 데이터를 저장
  const [error, setError] = useState<string | null>(null); // 에러 메시지 저장
  const [isLoading, setIsLoading] = useState<boolean>(true); // API 호출 상태 저장
  const [isPhotoOpen, setIsPhotoOpen] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const token = localStorage.getItem('token') as string;
  console.debug(token);
  useEffect(() => {
    if (id === undefined || token.trim() === '') return;
    const fetchData = async () => {
      try {
        const response = await axios.get<roomType>(
          `http://ec2-15-165-159-152.ap-northeast-2.compute.amazonaws.com:8080/api/v1/rooms/${id}`,
          {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }, // 헤더에 토큰 추가
          },
        );
        setData(response.data); // 성공적으로 데이터를 가져왔을 경우
        setError(null); // 에러 초기화
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Error:', err.message);
          setError('데이터를 가져오는데 실패했습니다.');
        } else {
          console.error('Unexpected error:', err);
          setError('알 수 없는 오류가 발생했습니다.');
        }
        setData(mockRoom);
      } finally {
        setIsLoading(false); // 로딩 상태 종료
      }
    };

    void fetchData();
  }, [id, token]); // 빈 배열: 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <div className="flex flex-col justify-start items-center w-full">
      <Topbar />
      <div className="flex flex-col w-full px-[55px]">
        <div className="flex w-full items-end justify-between py-4">
          <div className="text-2xl font-normal">{data.name}</div>
          <Shareheart />
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-2 w-full h-[330px]">
          <div className="col-span-2 row-span-2 flex items-center justify-center rounded-l-xl bg-gray-300  hover:bg-gray-400 cursor-pointer">
            <PhotoSizeSelectActualIcon
              style={{ width: '50%', height: '50%', color: 'white' }}
            />
          </div>
          <div className="col-span-1 flex items-center justify-center bg-gray-300  hover:bg-gray-400 cursor-pointer">
            <PhotoSizeSelectActualIcon
              style={{ width: '50%', height: '50%', color: 'white' }}
            />
          </div>
          <div className="col-span-1 flex items-center justify-center bg-gray-300  hover:bg-gray-400 cursor-pointer rounded-tr-xl">
            <PhotoSizeSelectActualIcon
              style={{ width: '50%', height: '50%', color: 'white' }}
            />
          </div>
          <div className="col-span-1 flex items-center justify-center bg-gray-300  hover:bg-gray-400 cursor-pointer">
            <PhotoSizeSelectActualIcon
              style={{ width: '50%', height: '50%', color: 'white' }}
            />
          </div>
          <div className="col-span-1 relative flex items-center justify-center bg-gray-300  hover:bg-gray-400 cursor-pointer rounded-br-xl">
            <PhotoSizeSelectActualIcon
              style={{ width: '50%', height: '50%', color: 'white' }}
            />
            <button
              onClick={() => {
                setIsPhotoOpen(true);
              }}
              className="absolute bottom-3 right-3 px-3 py-1 gap-[5px] rounded-lg border border-black bg-white flex justify-center items-center w-fit"
            >
              <img src={gallery} className="w-[15px] h-[15px] snap-center" />
              <div className="text-black text-sm text-center">
                사진 모두 보기
              </div>
            </button>
          </div>
        </div>
        <div className="flex items-start w-full h-fit">
          <div className="flex-1">
            <Info data={data} />
          </div>
          <div className="flex-2">
            <Reservation data={data} />
          </div>
        </div>
      </div>
      {isLoading ? (
        <p>서버에서 데이터를 가져오는 중...</p>
      ) : error !== null ? (
        <p style={{ color: 'red' }}>오류: {error}</p>
      ) : data !== mockRoom ? (
        <p>서버 응답: ${data.id}</p>
      ) : (
        <p>데이터가 없습니다.</p>
      )}
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
