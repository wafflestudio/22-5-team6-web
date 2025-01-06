import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IosShareIcon from '@mui/icons-material/IosShare';
import axios from 'axios';
import { useEffect, useState } from 'react';

import Topbar from '@/components/home/Topbar'

export const Roomdetail = () => {
  const [text, setText] = useState<string | null>(null); // 서버 응답 데이터를 저장
  const [error, setError] = useState<string | null>(null); // 에러 메시지 저장
  const [isLoading, setIsLoading] = useState<boolean>(true); // API 호출 상태 저장

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<string>('/api/v1/ping'); // 프록시를 통한 요청
        setText(typeof response.data === 'string' ? response.data : '데이터 없음'); // 성공적으로 데이터를 가져왔을 경우
        setError(null); // 에러 초기화
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Error:', err.message);
          setError('데이터를 가져오는데 실패했습니다.');
        } else {
          console.error('Unexpected error:', err);
          setError('알 수 없는 오류가 발생했습니다.');
        }
        setText('데이터 없음'); // 실패 시 text를 "데이터 없음"으로 설정
      } finally {
        setIsLoading(false); // 로딩 상태 종료
      }
    };

    void fetchData();
  }, []); // 빈 배열: 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <div className="flex flex-col justify-start items-center w-dvw">
      <Topbar />
      <div className="flex w-full items-end justify-between">
        <div className="text-2xl font-bold">{text}</div>
        <div className="flex space-x-[13px]">
          <div className="flex items-center space-x-[5px]">
            <IosShareIcon style={{ width: 15, height: 15 }} />
            <div className="text-sm">공유하기</div>
          </div>
          <div className="flex items-center space-x-[5px]">
            <FavoriteBorderIcon style={{ width: 15, height: 15 }} />
            <div className="text-sm">저장</div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <p>서버에서 데이터를 가져오는 중...</p>
      ) : error !== null ? (
        <p style={{ color: 'red' }}>오류: {error}</p>
      ) : text !== null && text !== '' ? (
        <p>서버 응답: {text}</p>
      ) : (
        <p>데이터가 없습니다.</p>
      )}
    </div>
  );
};

