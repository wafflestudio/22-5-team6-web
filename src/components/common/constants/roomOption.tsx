// constants/roomOptions.tsx
import { CheckinIcon, LuggageIcon, TvIcon, WifiIcon } from './icons';

export const ROOM_AMENITIES = [
  {
    id: 'wifi',
    label: '무선 인터넷',
    icon: WifiIcon,
  },
  {
    id: 'selfCheckin',
    label: '셀프 체크인',
    icon: CheckinIcon,
  },
  {
    id: 'luggage',
    label: '수하물 보관',
    icon: LuggageIcon,
  },
  {
    id: 'TV',
    label: 'TV',
    icon: TvIcon,
  },
] as const;

export const ROOM_FACILITIES = [
  {
    id: 'bedroom',
    label: '침실',
    min: 1,
    max: 10,
    unit: '개',
  },
  {
    id: 'bathroom',
    label: '욕실',
    min: 1,
    max: 10,
    unit: '개',
  },
  {
    id: 'bed',
    label: '침대',
    min: 1,
    max: 10,
    unit: '개',
  },
] as const;
