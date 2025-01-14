// constants/accommodationTypes.tsx
import { RoomType } from '@/types/room';

type AccommodationType = {
  label: string;
  imageUrl: string;
  value: RoomType;
};

export const ACCOMMODATION_TYPES: AccommodationType[] = [
  {
    label: 'APARTMENT',
    imageUrl:
      'https://a0.muscache.com/pictures/4d7580e1-4ab2-4d26-a3d6-97f9555ba8f9.jpg',
    value: RoomType.APARTMENT,
  },
  {
    label: 'HOUSE',
    imageUrl:
      'https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg',
    value: RoomType.HOUSE,
  },
  {
    label: 'VILLA',
    imageUrl:
      'https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg',
    value: RoomType.VILLA,
  },
  {
    label: 'HANOK',
    imageUrl:
      'https://a0.muscache.com/pictures/51f5cf64-5821-400c-8033-8a10c7787d69.jpg',
    value: RoomType.HANOK,
  },
  {
    label: 'SWIMMING_POOL',
    imageUrl:
      'https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg',
    value: RoomType.SWIMMING_POOL,
  },
  {
    label: 'HOTEL',
    imageUrl:
      'https://a0.muscache.com/pictures/64b27fed-56a1-4f03-950a-d8da08efb428.jpg',
    value: RoomType.HOTEL,
  },
  {
    label: 'CAMPING',
    imageUrl:
      'https://a0.muscache.com/pictures/ca25c7f3-0d1f-432b-9efa-b9f5dc6d8770.jpg',
    value: RoomType.CAMPING,
  },
  {
    label: 'FARM',
    imageUrl:
      'https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg',
    value: RoomType.FARM,
  },
  {
    label: 'COUNTRY_SIDE',
    imageUrl:
      'https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg',
    value: RoomType.COUNTRY_SIDE,
  },
  {
    label: 'RIVER_SIDE',
    imageUrl:
      'https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg',
    value: RoomType.RIVER_SIDE,
  },
  {
    label: 'ISLAND',
    imageUrl:
      'https://a0.muscache.com/pictures/8e507f16-4943-4be9-b707-59bd38d56309.jpg',
    value: RoomType.ISLAND,
  },
  {
    label: 'SKI',
    imageUrl:
      'https://a0.muscache.com/pictures/8b44f770-7156-4c7b-b4d3-d92549c8652f.jpg',
    value: RoomType.SKI,
  },
];
