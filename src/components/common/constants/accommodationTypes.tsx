// constants/accommodationTypes.tsx
import { RoomType } from '@/types/room';

type AccommodationType = {
  type: string;
  label: string;
  imageUrl: string;
  value: RoomType;
};

export const ACCOMMODATION_TYPES: AccommodationType[] = [
  {
    type: 'APARTMENT',
    label: '아파트',
    imageUrl:
      'https://a0.muscache.com/pictures/4d7580e1-4ab2-4d26-a3d6-97f9555ba8f9.jpg',
    value: RoomType.APARTMENT,
  },
  {
    type: 'HOUSE',
    label: '주택',
    imageUrl:
      'https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg',
    value: RoomType.HOUSE,
  },
  {
    type: 'VILLA',
    label: '별장',
    imageUrl:
      'https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg',
    value: RoomType.VILLA,
  },
  {
    type: 'HANOK',
    label: '한옥',
    imageUrl:
      'https://a0.muscache.com/pictures/51f5cf64-5821-400c-8033-8a10c7787d69.jpg',
    value: RoomType.HANOK,
  },
  {
    type: 'SWIMMING_POOL',
    label: '수영장',
    imageUrl:
      'https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg',
    value: RoomType.SWIMMING_POOL,
  },
  {
    type: 'HOTEL',
    label: '호텔',
    imageUrl:
      'https://a0.muscache.com/pictures/64b27fed-56a1-4f03-950a-d8da08efb428.jpg',
    value: RoomType.HOTEL,
  },
  {
    type: 'CAMPING',
    label: '캠핑장',
    imageUrl:
      'https://a0.muscache.com/pictures/ca25c7f3-0d1f-432b-9efa-b9f5dc6d8770.jpg',
    value: RoomType.CAMPING,
  },
  {
    type: 'FARM',
    label: '농장',
    imageUrl:
      'https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg',
    value: RoomType.FARM,
  },
  {
    type: 'COUNTRY_SIDE',
    label: '시골',
    imageUrl:
      'https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg',
    value: RoomType.COUNTRY_SIDE,
  },
  {
    type: 'RIVER_SIDE',
    label: '호숫가',
    imageUrl:
      'https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg',
    value: RoomType.RIVER_SIDE,
  },
  {
    type: 'ISLAND',
    label: '섬',
    imageUrl:
      'https://a0.muscache.com/pictures/8e507f16-4943-4be9-b707-59bd38d56309.jpg',
    value: RoomType.ISLAND,
  },
  {
    type: 'SKI',
    label: '스키',
    imageUrl:
      'https://a0.muscache.com/pictures/8b44f770-7156-4c7b-b4d3-d92549c8652f.jpg',
    value: RoomType.SKI,
  },
];
