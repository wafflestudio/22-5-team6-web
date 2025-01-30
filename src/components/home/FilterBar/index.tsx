// components/home/FilterBar/index.tsx
import { ImportExport, TuneRounded } from '@mui/icons-material';
import { useState } from 'react';

import { ACCOMMODATION_TYPES } from '@/components/common/constants/accommodationTypes';
import { RoomType } from '@/types/room';

import { useSearch } from '../context/SearchContext';
import FilterModal from './FilterModal';
import SortModal from './SortModal';

const FilterBar = () => {
  const { filter, filterRooms } = useSearch();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);

  const handleTypeClick = (type: RoomType) => {
    void filterRooms({
      ...filter,
      roomType: filter.roomType === type ? null : type,
    });
  };

  return (
    <div className="relative flex items-center w-full">
      <div className="flex-1 overflow-x-auto flex items-center gap-8 px-2 scrollbar-none">
        {ACCOMMODATION_TYPES.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              handleTypeClick(item.value);
            }}
            className="relative flex flex-col items-center gap-2 pt-4 pb-3 min-w-[56px]"
          >
            <img
              src={item.imageUrl}
              alt={item.label}
              className={`h-6 w-6 ${
                filter.roomType === item.value
                  ? 'opacity-100'
                  : 'opacity-60 hover:opacity-100'
              } transition-opacity`}
            />
            <span
              className={`text-xs whitespace-nowrap ${
                filter.roomType === item.value
                  ? 'text-black'
                  : 'text-gray-500 hover:text-black'
              } transition-colors`}
            >
              {item.label}
            </span>
            <div
              className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all ${
                filter.roomType === item.value
                  ? 'bg-black opacity-100'
                  : 'bg-gray-200 opacity-0 hover:opacity-100'
              }`}
            />
          </button>
        ))}
      </div>

      {/* 필터 버튼 */}
      <div className="flex items-center gap-4 px-2">
        <button
          onClick={() => {
            setIsSortModalOpen(true);
          }}
          className="px-4 py-2 rounded-xl border border-gray-200 hover:shadow-md transition flex items-center gap-2"
        >
          <ImportExport className="h-4 w-4" />
          <span className="text-sm">정렬</span>
        </button>
        <button
          onClick={() => {
            setIsFilterModalOpen(true);
          }}
          className="px-4 py-2 rounded-xl border border-gray-200 hover:shadow-md transition flex items-center gap-2"
        >
          <TuneRounded className="h-4 w-4" />
          <span className="text-sm">필터</span>
        </button>
      </div>

      {/* 필터 모달 */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => {
          setIsFilterModalOpen(false);
        }}
      />

      {/* 정렬 모달 */}
      <SortModal
        isOpen={isSortModalOpen}
        onClose={() => {
          setIsSortModalOpen(false);
        }}
      />
    </div>
  );
};

export default FilterBar;
