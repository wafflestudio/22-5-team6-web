import type { PageResponse } from './pagination';
import type { RoomType } from './room';

// API 검색 파라미터 타입
export type RoomSearchParams = {
  page: number;
  size: number;
  sort: string;
  sido?: string;
  sigungu?: string;
  startDate?: string;
  endDate?: string;
  maxOccupancy?: number;
  minPrice?: number;
  maxPrice?: number;
  roomType?: RoomType;
};

// API 응답의 Room 아이템 타입
export type RoomMainResponse = {
  roomId: number;
  roomName: string;
  roomType: RoomType;
  sido: string;
  price: number;
  averageRating: number;
  imageUrl: string;
};

// room/main 엔드포인트의 전체 응답 타입
export type RoomListResponse = PageResponse<RoomMainResponse>;

// 내부에서 사용할 매핑된 Room 타입
export type RoomMain = {
  id: number;
  name: string;
  type: RoomType;
  address: {
    sido: string;
    sigungu: string;
  };
  price: number;
  rating: number;
  imageUrl: string;
};
