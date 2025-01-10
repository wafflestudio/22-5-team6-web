export type roomType = {
  id: number;
  host: {
    id: number;
    username: string;
    password: string;
    provider: string;
    reservations: {
      id: number;
      user: string;
      room: {
        id: number;
        host: string;
        name: string;
        description: string;
        type: string;
        address: string;
        price: number;
        maxOccupancy: number;
        reservations: string[];
        reviews: {
          id: number;
          user: string;
          reservation: string;
          room: string;
          content: string;
          rating: number;
        }[];
        createdAt: string;
        updatedAt: string;
      };
      review: {
        id: number;
        user: string;
        reservation: string;
        room: string;
        content: string;
        rating: number;
      };
      startDate: string;
      endDate: string;
      totalPrice: number;
    }[];
    rooms: {
      id: number;
      host: string;
      name: string;
      description: string;
      type: string;
      address: string;
      price: number;
      maxOccupancy: number;
      reservations: string[];
      reviews: {
        id: number;
        user: string;
        reservation: string;
        room: string;
        content: string;
        rating: number;
      }[];
      createdAt: string;
      updatedAt: string;
    }[];
    reviews: {
      id: number;
      user: string;
      reservation: string;
      room: string;
      content: string;
      rating: number;
    }[];
    oauthId: string;
  };
  name: string;
  description: string;
  type1: string; // 추가: 상세 화면의 country 뒤 텍스트
  type2: string; // 추가: 메인 화면 FilterBar 상 목록
  price: {
    pernight: number;
    cleaningfee: number;
    charge: number;
    total: number;
  };
  isSuperhost: boolean;
  isLuggage: boolean;
  isTv: boolean;
  isWifi: boolean;
  isSelfcheckin: boolean;
  info: string;
  maxOccupancy: number;
  bedroom: number;
  bathroom: number;
  bed: number;
  avgrating: number;
  reviewcount: number;
  createdAt: string;
  updatedAt: string;
  location: {
    country: string;
    city: string;
    suburb: string;
    town: string;
  };
};
