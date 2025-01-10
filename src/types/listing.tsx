// api와 연결하면서 수정 및 삭제할 수 있는 인터페이스입니다.
export type Listing = {
  id: string;
  title: string;
  location: string;
  rating: number;
  distance: string;
  dateRange: string;
  pricePerNight: number;
  imageUrl: string;
};
