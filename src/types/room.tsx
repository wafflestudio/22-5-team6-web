export enum RoomType {
  APARTMENT = 'APARTMENT',
  HOUSE = 'HOUSE',
  VILLA = 'VILLA',
  HANOK = 'HANOK',
  SWIMMING_POOL = 'SWIMMING_POOL',
  HOTEL = 'HOTEL',
  CAMPING = 'CAMPING',
  FARM = 'FARM',
  COUNTRY_SIDE = 'COUNTRY_SIDE',
  RIVER_SIDE = 'RIVER_SIDE',
  ISLAND = 'ISLAND',
  SKI = 'SKI',
}

export type RoomDetails = {
  wifi: boolean;
  selfCheckin: boolean;
  luggage: boolean;
  TV: boolean;
  bedroom: string;
  bathroom: string;
  bed: string;
};

export type Address = {
  sido: string;
  sigungu: string;
  street: string;
  detail: string;
};

export type Price = {
  perNight: string;
  cleaningFee: string;
  charge: string;
  total: string;
};

export type RoomApiResponse = {
  roomId: number;
  imageUploadUrlList: string[];
};

interface Room {
  roomId: number;
  roomName: string;
  roomType: string; // 예시로 다른 타입 추가 가능
  sido: string;
  sigungu: string;
  price: number;
  averageRating: number;
  isLiked: boolean;
  imageUrl: string;
}

interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

interface Pageable {
  offset: number;
  sort: Sort;
  unpaged: boolean;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
}

export interface WishlistResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: Room[];
  number: number;
  sort: Sort;
  numberOfElements: number;
  pageable: Pageable;
  first: boolean;
  last: boolean;
  empty: boolean;
}
