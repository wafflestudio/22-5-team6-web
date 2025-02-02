import type { PageResponse } from './pagination';
import type { RoomDetails, RoomType } from './room';

export type SortField =
  | 'id'
  | 'name'
  | 'price.perNight'
  | 'createdAt'
  | 'ratingStatistics.averageRating';
export type SortDirection = 'asc' | 'desc';

export type Sort = {
  field: SortField;
  direction: SortDirection;
};

export type Filter = {
  minPrice: string | null;
  maxPrice: string | null;
  roomType: RoomType | null;
  rating: number | null;
} & Partial<RoomDetails>;

export type RoomSearchParams = {
  // 페이징 Params
  page: number;
  size: number;
  sort: Sort;
  // 서치바 Params
  sido?: string;
  sigungu?: string;
  startDate?: string;
  endDate?: string;
  maxOccupancy?: number;
  // 필터바 Params
  roomType?: RoomType;
  minPrice?: string;
  maxPrice?: string;
  wifi?: boolean;
  selfCheckin?: boolean;
  luggage?: boolean;
  TV?: boolean;
  bedroom?: string;
  bathroom?: string;
  bed?: string;
  rating?: number;
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
  isLiked: boolean;
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
  isLiked: boolean;
};
