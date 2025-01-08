import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Redirect = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token'); // 쿼리 파라미터에서 token 추출

    if (token !== null && token.trim() !== '') {
      // token이 null이 아니고 빈 문자열도 아닌 경우
      localStorage.setItem('token', token); // 로컬 스토리지에 저장
      window.location.href = '/'; // 메인 페이지로 리다이렉트
    } else {
      console.error('Token not found or is empty in URL');
    }
  }, [searchParams]);

  return <h1>Redirect</h1>;
};

export default Redirect;
