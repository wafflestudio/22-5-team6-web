// components/home/FilterBar/index.tsx
import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

import { ACCOMMODATION_TYPES } from '@/components/common/constants/accommodationTypes';

import FilterModal from './FilterModal';

type FilterBarProps = {
  onTypeSelect?: (type: string) => void;
  onPriceFilterChange?: (priceRange: { min: number; max: number }) => void;
};

export const FilterBar = ({ onTypeSelect, onPriceFilterChange }: FilterBarProps) => {
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

export default FilterBar;
