// components/home/FilterBar/index.tsx
import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

import { ACCOMMODATION_TYPES } from '@/components/common/constants/accommodationTypes';

<<<<<<< HEAD
// 필터 데이터
export const filterItems: FilterItem[] = [
  {
    label: '한적한 시골',
    imageUrl:
      'https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg',
  },
  {
    label: '최고의 전망',
    imageUrl:
      'https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg',
  },
  {
    label: '캠핑장',
    imageUrl:
      'https://a0.muscache.com/pictures/ca25c7f3-0d1f-432b-9efa-b9f5dc6d8770.jpg',
  },
  {
    label: '한옥',
    imageUrl:
      'https://a0.muscache.com/pictures/51f5cf64-5821-400c-8033-8a10c7787d69.jpg',
  },
  {
    label: '해변 바로 앞',
    imageUrl:
      'https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg',
  },
  {
    label: '디자인',
    imageUrl:
      'https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg',
  },
  {
    label: '멋진 수영장',
    imageUrl:
      'https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg',
  },
  {
    label: '통나무집',
    imageUrl:
      'https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg',
  },
  {
    label: '최고의 조리시설',
    imageUrl:
      'https://a0.muscache.com/pictures/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg',
  },
  {
    label: '북극',
    imageUrl:
      'https://a0.muscache.com/pictures/8b44f770-7156-4c7b-b4d3-d92549c8652f.jpg',
  },
  {
    label: '농장',
    imageUrl:
      'https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg',
  },
  {
    label: '인기 급상승',
    imageUrl:
      'https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg',
  },
];

export const FilterBar = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
=======
import FilterModal from './FilterModal';

type FilterBarProps = {
  onTypeSelect?: (type: string) => void;
  onPriceFilterChange?: (priceRange: { min: number; max: number }) => void;
};
>>>>>>> d3fe4e7 (feat: Hosting 페이지 구현 및 메인 페이지 기능 개선)

const FilterBar = ({ onTypeSelect, onPriceFilterChange }: FilterBarProps) => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleTypeClick = (type: string) => {
    setSelectedType(type);
    onTypeSelect?.(type);
  };

  const handleApplyFilter = (priceRange: { min: number; max: number }) => {
    onPriceFilterChange?.(priceRange);
  };

  return (
    <div className="relative flex items-center w-full">
      <div className="flex-1 overflow-x-auto flex items-center gap-8 px-8 scrollbar-none">
        {ACCOMMODATION_TYPES.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              handleTypeClick(item.label);
            }}
            className="relative flex flex-col items-center gap-2 pt-4 pb-3 min-w-[56px]"
          >
            <img
              src={item.imageUrl}
              alt={item.label}
              className={`h-6 w-6 ${
                selectedType === item.label
                  ? 'opacity-100'
                  : 'opacity-60 hover:opacity-100'
              } transition-opacity`}
            />
            <span
              className={`text-xs whitespace-nowrap ${
                selectedType === item.label
                  ? 'text-black'
                  : 'text-gray-500 hover:text-black'
              } transition-colors`}
            >
              {item.label}
            </span>
            <div
              className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all ${
                selectedType === item.label
                  ? 'bg-black opacity-100'
                  : 'bg-gray-200 opacity-0 hover:opacity-100'
              }`}
            />
          </button>
        ))}
      </div>

      {/* 필터 버튼 */}
      <div className="flex items-center gap-4 pr-8 pl-4">
        <button
          onClick={() => {
            setIsFilterModalOpen(true);
          }}
          className="px-4 py-2 rounded-xl border border-gray-200 hover:shadow-md transition flex items-center gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="text-sm">필터</span>
        </button>
      </div>

      {/* 필터 모달 */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => {
          setIsFilterModalOpen(false);
        }}
        onApplyFilter={handleApplyFilter}
      />
    </div>
  );
};
