// src/api/hosting.ts

interface HostingData {
  type: string;
  address: {
    sido: string;
    sigungu: string;
    street: string;
    detail: string;
  };
  // images: ImageFile[];
  name: string;
  description: string;
  price: string;
  maxOccupancy: string;
}

//   interface ImageFile {
//     file: File;
//     preview: string;
//     isCover: boolean;
//   }

interface HostingResponse {
  id: string;
  // 다른 응답 필드들도 필요하다면 여기에 추가
}

export const createHosting = async (
  hostingData: HostingData,
): Promise<HostingResponse> => {
  // const BASE_URL = 'https://d2gjarpl85ijp5.cloudfront.net';

  // const token = localStorage.getItem('token');

  // if (token == null) {
  //     throw new Error('인증 토큰이 없습니다.');
  // }

  const token =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdHJpbmciLCJpYXQiOjE3MzY0MDk2MzIsImV4cCI6MTczNjQ5NjAzMn0.CsjQZXSWlwA4K2Zyi2aoJAnjCshd25RicVcefWlv3fz0oQefXcKtx5UwiEpKiJMBMkwz3L_2qLHAcPdDVC_rxw';

  const response = await fetch(`/api/v1/rooms`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      // API 명세에 맞게 데이터 구조화
      type: hostingData.type,
      address: hostingData.address,
      name: hostingData.name,
      description: hostingData.description,
      price: Number(hostingData.price), // 문자열을 숫자로 변환
      maxOccupancy: Number(hostingData.maxOccupancy), // 문자열을 숫자로 변환
    }),
  });

  if (!response.ok) {
    throw new Error('숙소 등록에 실패했습니다.');
  }

  const responseData = (await response.json()) as HostingResponse;

  return responseData;
};
