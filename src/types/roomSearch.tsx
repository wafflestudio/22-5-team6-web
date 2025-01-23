import type { PageResponse } from './pagination';
import type { RoomType } from './room';

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

export type RoomMainResponse = {
  roomId: number;
  roomName: string;
  roomType: RoomType;
  sido: string;
  sigungu: string;
  price: number;
  averageRating: number;
  imageUrl: string;
};

export type RoomListResponse = PageResponse<RoomMainResponse>;

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
