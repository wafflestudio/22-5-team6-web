import axios, { AxiosError, type AxiosRequestConfig } from 'axios';

type CustomAxiosRequestConfig = AxiosRequestConfig & {
  _retry?: boolean;
};

type ReissueTokenResponse = {
  token: string;
  refreshToken: string;
};

type ApiErrorResponse = {
  message?: string;
};

const isAxiosError = (error: unknown): error is AxiosError => {
  return (error as AxiosError).isAxiosError;
};

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  () => Promise.reject(new Error('Failed to send request.')),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!isAxiosError(error)) {
      return await Promise.reject(new Error('An unknown error occurred.'));
    }

    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (
      error.response?.status === 401 &&
      !(originalRequest._retry ?? false) // nullish 병합 연산자 사용
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken === null) {
          return await Promise.reject(new Error('Refresh token not found.'));
        }

        // 새 토큰 요청
        const { data } = await axios.post<ReissueTokenResponse>(
          '/api/auth/reissueToken',
          {
            refreshToken,
          },
        );

        // 토큰 저장
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);

        // 헤더를 null 병합 연산자로 안전하게 초기화
        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${data.token}`;

        return await axios(originalRequest);
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        return await Promise.reject(new Error('Failed to reissue token.'));
      }
    }

    const errorMessage =
      (error.response?.data as ApiErrorResponse).message ??
      'An unknown error occurred.';
    return await Promise.reject(new Error(errorMessage));
  },
);

export default axiosInstance;
