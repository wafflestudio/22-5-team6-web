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
    type: RoomType
    address: {
      sido: string;
      sigungu: string;
      street: string;
      detail: string;
    };
    roomDetails: {
      wifi: boolean;
      selfCheckin: boolean;
      luggage: boolean;
      bedroom: number;
      bathroom: number;
      bed: number;
      tv: boolean;
    };
    price: {
      perNight: number;
      cleaningFee: number;
      charge: number;
      total: number;
    };
    maxOccupancy: number;
    rating: number;
    reviewCount: number;
    isSuperhost: boolean;
    createdAt: string;
    updatedAt: string;
  }