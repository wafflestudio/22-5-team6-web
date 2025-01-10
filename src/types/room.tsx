// src/types/room.tsx
export enum RoomType {
    APARTMENT = 'APARTMENT',    // 아파트
    HOUSE = 'HOUSE',           // 주택
    VILLA = 'VILLA',           // 별장
    HANOK = 'HANOK',          // 한옥
    SWIMMING_POOL = 'SWIMMING_POOL', // 수영장
    HOTEL = 'HOTEL',          // 호텔
    CAMPING = 'CAMPING',       // 캠핑
    FARM = 'FARM',            // 농장
    COUNTRY_SIDE = 'COUNTRY_SIDE', // 시골
    RIVER_SIDE = 'RIVER_SIDE',    // 호숫가
    ISLAND = 'ISLAND',        // 섬
    SKI = 'SKI'               // 스키
  }
  
  // API 응답 타입
  export type RoomApiResponse = {
    id: number;
    hostId: number;
    name: string;
    description: string;
    type: RoomType;  // enum 사용
    address: {
      sido: string;
      sigungu: string;
      street: string;
      detail: string;
    };
    price: number;
    maxOccupancy: number;
    rating: number;
    createdAt: string;
    updatedAt: string;
  };