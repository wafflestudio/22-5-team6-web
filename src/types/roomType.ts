type Address = {
  sido: string;
  sigungu: string;
  street: string;
  detail: string;
};

type RoomDetails = {
  wifi: boolean;
  selfCheckin: boolean;
  luggage: boolean;
  tv: boolean;
  bedroom: number;
  bathroom: number;
  bed: number;
};

type Price = {
  perNight: number;
  cleaningFee: number;
  charge: number;
  total: number;
};

export type roomType = {
  roomId: number;
  hostId: number;
  roomName: string;
  description: string;
  roomType: string; // 예시로 더 많은 타입을 추가할 수 있습니다.
  address: Address;
  roomDetails: RoomDetails;
  price: Price;
  maxOccupancy: number;
  averageRating: number;
  reviewCount: number;
  isSuperhost: boolean;
  createdAt: string; // ISO 8601 날짜 형식
  updatedAt: string; // ISO 8601 날짜 형식
};
