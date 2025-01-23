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
