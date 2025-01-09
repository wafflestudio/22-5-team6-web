import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Redirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token: string | undefined = searchParams.get('token')?.trim();

  useEffect(() => {
    if (typeof token === 'string' && token !== '') {
      // token이 string 타입이고 빈 문자열이 아닌 경우
      localStorage.setItem('token', token); // 로컬 스토리지에 저장
      void navigate('/'); // navigate 호출
    } else {
      console.error('Token not found or is empty in URL');
    }
  }, [token, navigate]);

  return <h1>Redirect</h1>;
};

export default Redirect;
