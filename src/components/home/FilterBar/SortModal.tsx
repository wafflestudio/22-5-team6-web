// components/home/FilterBar/SortDropdown.tsx
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Schedule,
  SortByAlpha,
} from '@mui/icons-material';
import { useEffect, useRef } from 'react';

import type { Sort } from '@/types/roomSearch';

import { useSearch } from '../context/SearchContext';

type SortDropdownProps = {
  isOpen: boolean;
  onClose: () => void;
};

const sortOptions = [
  {
    label: '가격 낮은 순',
    sort: {
      field: 'price.perNight' as const,
      direction: 'asc' as const,
    },
    icon: <KeyboardArrowUp className="h-5 w-5" />,
  },
  {
    label: '가격 높은 순',
    sort: {
      field: 'price.perNight' as const,
      direction: 'desc' as const,
    },
    icon: <KeyboardArrowDown className="h-5 w-5" />,
  },
  {
    label: '이름 순',
    sort: {
      field: 'name' as const,
      direction: 'asc' as const,
    },
    icon: <SortByAlpha className="h-5 w-5" />,
  },
  {
    label: '최신 등록 순',
    sort: {
      field: 'createdAt' as const,
      direction: 'desc' as const,
    },
    icon: <Schedule className="h-5 w-5" />,
  },
];

export default function SortDropdown({ isOpen, onClose }: SortDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { filter, filterRooms, sort, setSort } = useSearch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  const handleSortClick = (newSort: Sort) => {
    setSort(newSort);
    void filterRooms({
      ...filter,
    });
    onClose();
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-[7.5rem] top-full mt-2 py-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
    >
      {sortOptions.map((option) => (
        <button
          key={`${option.sort.field}-${option.sort.direction}`}
          onClick={() => {
            handleSortClick(option.sort);
          }}
          className={`flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors ${
            sort.field === option.sort.field &&
            sort.direction === option.sort.direction
              ? 'text-black bg-gray-50'
              : 'text-gray-600'
          }`}
        >
          {option.icon}
          <span className="text-sm">{option.label}</span>
        </button>
      ))}
    </div>
  );
}
