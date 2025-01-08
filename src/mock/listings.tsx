import type { Listing } from '@/types/listing';

// mock/listings.ts
export const mockListings: Listing[] = [
  {
    id: '2344',
    title: '화천 호숫가의 아늑한 숙소',
    location: '한국 Hwachon-myeon, Hongcheon-gun',
    rating: 4.88,
    distance: '86km 거리',
    dateRange: '1월 19일-24일',
    pricePerNight: 114118,
    imageUrl:
      'https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg',
  },
  {
    id: '8343',
    title: '양평 계곡 옆 독채 펜션',
    location: '한국 양평군',
    rating: 4.97,
    distance: '62km 거리',
    dateRange: '1월 12일-17일',
    pricePerNight: 470546,
    // imageUrl: '/api/placeholder/400/300'
    imageUrl:
      'https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg',
  },
  {
    id: '9483',
    title: '호천 수영장이 있는 풀빌라',
    location: '한국 호천',
    rating: 4.97,
    distance: '73km 거리',
    dateRange: '1월 20일-24일',
    pricePerNight: 998530,
    imageUrl:
      'https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg',
  },
  {
    id: '5473',
    title: '전통 한옥스테이',
    location: '한국 양평군',
    rating: 4.95,
    distance: '44km 거리',
    dateRange: '1월 7일-12일',
    pricePerNight: 396136,
    imageUrl:
      'https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg',
  },
];
