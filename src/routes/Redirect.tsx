import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Redirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token: string | undefined = searchParams.get('token')?.trim();
  const refreshToken: string | undefined = searchParams
    .get('refreshToken')
    ?.trim();
  const completeProfile: string | undefined = searchParams
    .get('complete-profile')
    ?.trim(); // complete-profile 파라미터 추출

  useEffect(() => {
    if (typeof token === 'string' && token !== '') {
      // 토큰 저장
      localStorage.setItem('token', token);
    }

    if (typeof refreshToken === 'string' && refreshToken !== '') {
      // refreshToken 저장
      localStorage.setItem('refreshToken', refreshToken);
    }

    // complete-profile 파라미터 값에 따라 경로 설정
    if (completeProfile === 'true') {
      void navigate('/complete-profile'); // 프로필 정보 입력 페이지로 이동
    } else {
      void navigate('/'); // 기본 경로로 이동
    }
  }, [token, refreshToken, completeProfile, navigate]);

  return <h1>Redirecting...</h1>;
};

export default Redirect;
