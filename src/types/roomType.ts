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
  type: string;
  address: string;
  price: number;
  maxOccupancy: number;
  createdAt: string;
  updatedAt: string;
};
