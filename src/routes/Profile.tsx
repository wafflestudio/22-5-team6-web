import axios from 'axios';
import { useEffect, useState } from 'react';

// 프로필 타입 정의
type ProfileInfo = {
  id: 0;
  userId: 0;
  nickname: 'string';
};

export const ProfileInfoList = () => {
  const [ProfileInfos, setProfileInfos] = useState<ProfileInfo[]>([]); // 프로필 데이터 저장
  const [error, setError] = useState<string | null>(null); // 에러 메시지 저장

  useEffect(() => {
    const fetchProfileInfos = async () => {
      const token = localStorage.getItem('token');
      if (token === null || token.trim() === '') {
        setError('로그인되지 않았습니다.');
        return;
      }

      try {
        const response = await axios.get<ProfileInfo[]>('/api/v1/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          validateStatus: (status) => status < 400,
        }); // 프로필 데이터 요청
        setProfileInfos(response.data); // 성공적으로 데이터를 가져온 경우
        setError(null); // 에러 초기화
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Error:', err.message);
          setError('프로필 데이터를 가져오는데 실패했습니다.');
        } else {
          console.error('Unexpected error:', err);
          setError('알 수 없는 오류가 발생했습니다.');
        }
      }
    };

    fetchProfileInfos().catch((err: unknown) => {
      if (err instanceof Error) {
        console.error(err.message); // 에러 메시지 출력
        setError('프로필 데이터를 가져오는데 실패했습니다.'); // 에러 메시지 설정
      } else {
        console.error('Unexpected error', err);
        setError('알 수 없는 오류가 발생했습니다.');
      }
    });
  }, []); // 빈 배열: 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <div>
      <h1>프로필 데이터</h1>
      {error !== null && <p style={{ color: 'red' }}>오류: {error}</p>}
      {ProfileInfos.length > 0 ? (
        <ul>
          {ProfileInfos.map((ProfileInfo) => (
            <li key={ProfileInfo.id}>
              <p>프로필 ID: {ProfileInfo.id}</p>
              <p>사용자 ID: {ProfileInfo.userId}</p>
              <p>닉네임: {ProfileInfo.nickname}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>프로필 데이터가 없습니다.</p>
      )}
    </div>
  );
};
