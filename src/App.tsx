import axios from 'axios';
import { useEffect, useState } from 'react';

export const App = () => {
  const [text, setText] = useState<string | null>(null); // 서버 응답 데이터를 저장
  const [error, setError] = useState<string | null>(null); // 에러 메시지 저장

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<string>('/api/v1/ping'); // 프록시를 통한 요청
        setText(response.data); // 성공적으로 데이터를 가져온 경우
        setError(null); // 에러 초기화
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Error:', err.message);
          setError('데이터를 가져오는데 실패했습니다.');
        } else {
          console.error('Unexpected error:', err);
          setError('알 수 없는 오류가 발생했습니다.');
        }
      }
    };

    fetchData().catch((err: unknown) => {
      // 타입 좁히기
      if (err instanceof Error) {
        console.error(err.message); // 에러 메시지 출력
        setError('데이터를 가져오는데 실패했습니다.'); // 에러 메시지 설정
      } else {
        console.error('Unexpected error', err);
        setError('알 수 없는 오류가 발생했습니다.');
      }
    });
  }, []); // 빈 배열: 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <div>
      <h1>React & Spring 연결 테스트</h1>
      {text !== null && text !== '' ? (
        <p>서버 응답: {text}</p>
      ) : (
        <p>서버에서 데이터를 가져오는 중...</p>
      )}
      {error !== null && error !== '' && (
        <p style={{ color: 'red' }}>오류: {error}</p>
      )}
    </div>
  );
};
