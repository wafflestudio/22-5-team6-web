import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { useState } from 'react';

import {
  ROOM_AMENITIES,
  ROOM_FACILITIES,
} from '@/components/common/constants/roomOption';
import BaseModal from '@/components/common/Modal/BaseModal';
import { useSearch } from '@/components/home/context/SearchContext';
import type { RoomDetails } from '@/types/room';

type FilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const initialMinPrice = 1;
const initialMaxPrice = 1000000;

type FacilityCountType = Pick<RoomDetails, 'bedroom' | 'bathroom' | 'bed'>;
type AmenityType = Pick<RoomDetails, 'wifi' | 'selfCheckin' | 'luggage' | 'TV'>;

type StarRatingProps = {
  value: number | null;
  onChange: (rating: number | null) => void;
  className?: string;
};

const initialFacilityCount: FacilityCountType = {
  bedroom: '0',
  bathroom: '0',
  bed: '0',
};

const initialAmenities: AmenityType = {
  wifi: false,
  selfCheckin: false,
  luggage: false,
  TV: false,
};

// StarRating 컴포넌트
const StarRating = ({ value, onChange, className = '' }: StarRatingProps) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const MAX_RATING = 5;

  const handleStarHover = (
    starIndex: number,
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - left;

    const isRightHalf = x > width / 2;
    const score = starIndex + (isRightHalf ? 1 : 0.5);

    setHoverValue(score);
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  const handleClick = () => {
    if (hoverValue == null) return;
    onChange(value === hoverValue ? null : hoverValue);
  };

  // 별 아이콘을 결정하는 함수
  const renderStar = (index: number) => {
    const displayValue = hoverValue ?? value ?? 0;
    const filled = displayValue - index;

    if (filled >= 1) {
      return <StarIcon className="text-yellow-400" />;
    } else if (filled > 0) {
      return <StarHalfIcon className="text-yellow-400" />;
    }
    return <StarBorderIcon className="text-yellow-400" />;
  };

  return (
    <div className="relative">
      <div className={`flex cursor-pointer ${className}`}>
        {Array.from({ length: MAX_RATING }, (_, index) => (
          <div
            key={index}
            className="px-0.5"
            onMouseMove={(e) => {
              handleStarHover(index, e);
            }}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          >
            {renderStar(index)}
          </div>
        ))}
      </div>
      {hoverValue != null && (
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 bg-gray-900 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
          {hoverValue}점
        </div>
      )}
    </div>
  );
};

export default function FilterModal({ isOpen, onClose }: FilterModalProps) {
  const { filter, filterRooms } = useSearch();
  const [minPrice, setMinPrice] = useState(filter.minPrice ?? initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(filter.maxPrice ?? initialMaxPrice);
  const [facilityCount, setFacilityCount] =
    useState<FacilityCountType>(initialFacilityCount);
  const [amenities, setAmenities] = useState<AmenityType>(initialAmenities);
  const [rating, setRating] = useState<number | null>(null);

  const handleFacilityChange = (
    type: keyof FacilityCountType,
    increment: boolean,
  ) => {
    const facility = ROOM_FACILITIES.find((f) => f.id === type);
    if (facility == null) return;

    setFacilityCount((prev) => {
      const currentValue = isNaN(parseInt(prev[type]))
        ? 0
        : parseInt(prev[type]);
      const newValue = increment ? currentValue + 1 : currentValue - 1;

      // 최소값과 최대값 범위 내에서만 변경
      if (newValue < facility.min || newValue > facility.max) return prev;

      return {
        ...prev,
        [type]: String(newValue),
      };
    });
  };

  const handleAmenityToggle = (type: keyof AmenityType) => {
    setAmenities((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleApply = () => {
    if (minPrice > maxPrice) {
      alert('최소 가격이 최대 가격보다 클 수 없습니다.');
      return;
    }
    void filterRooms({
      ...filter,
      minPrice,
      maxPrice,
      ...facilityCount,
      ...amenities,
      rating,
    });
    onClose();
  };

  const handleReset = () => {
    setMinPrice(initialMinPrice);
    setMaxPrice(initialMaxPrice);
    setFacilityCount(initialFacilityCount);
    setAmenities(initialAmenities);
    void filterRooms({
      ...filter,
      minPrice: null,
      maxPrice: null,
      roomType: null,
      ...initialFacilityCount,
      ...initialAmenities,
    });
    onClose();
  };

  const modalFooter = (
    <div className="flex justify-between items-center">
      <button
        onClick={handleReset}
        className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        전체 해제
      </button>
      <button
        onClick={handleApply}
        className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800"
      >
        숙소 보기
      </button>
    </div>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="필터"
      footer={modalFooter}
      width="max-w-2xl"
    >
      <div className="space-y-8">
        {/* 가격 범위 섹션 */}
        <div className="border-b pb-8">
          <h3 className="text-lg font-medium mb-4">가격 범위</h3>
          <p className="text-sm text-gray-500 mb-4">1박 요금</p>
          <div className="flex gap-4">
            <div className="flex-1">
              <span className="block text-xs mb-2">최저 요금</span>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  ₩
                </span>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => {
                    setMinPrice(Number(e.target.value));
                  }}
                  min={0}
                  placeholder="최저 요금"
                  className="w-full pl-8 px-8 py-3 border rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-airbnb [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>
            <div className="flex-1">
              <span className="block text-xs mb-2">최고 요금</span>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  ₩
                </span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(Number(e.target.value));
                  }}
                  min={0}
                  placeholder="최고 요금"
                  className="w-full pl-8 px-8 py-3 border rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-airbnb [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 시설 정보 섹션 */}
        <div className="border-b pb-8">
          <h3 className="text-lg font-medium mb-4">시설 정보</h3>
          <div className="space-y-6">
            {ROOM_FACILITIES.map(({ id, label }) => (
              <div key={id} className="flex justify-between items-center">
                <span>{label}</span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      handleFacilityChange(id, false);
                    }}
                    className="w-8 h-8 flex items-center justify-center p-2 rounded-full border hover:border-gray-400 disabled:opacity-50 disabled:hover:border-gray-200"
                    disabled={parseInt(facilityCount[id]) === 0}
                  >
                    <RemoveIcon sx={{ fontSize: 16 }} />
                  </button>
                  <span className="min-w-[4rem] text-center">
                    {parseInt(facilityCount[id]) > 0
                      ? `${facilityCount[id]}+`
                      : '상관없음'}
                  </span>
                  <button
                    onClick={() => {
                      handleFacilityChange(id, true);
                    }}
                    className="w-8 h-8 flex items-center justify-center p-2 rounded-full border hover:border-gray-400"
                  >
                    <AddIcon sx={{ fontSize: 16 }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 편의시설 섹션 */}
        <div className="border-b pb-8">
          <h3 className="text-lg font-medium mb-4">편의시설</h3>
          <div className="grid grid-cols-2 gap-4">
            {ROOM_AMENITIES.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => {
                  handleAmenityToggle(id);
                }}
                className={`flex items-center gap-3 p-4 border 
                  rounded-[2rem] hover:rounded-[2rem]  
                  ${
                    amenities[id]
                      ? 'border-black bg-black/5'
                      : 'border-gray-300 hover:border-gray-400'
                  } transition-colors`}
              >
                <img src={icon} alt={label} className="w-6 h-6" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 평점 섹션 */}
        <div>
          <h3 className="text-lg font-medium mb-4">별점</h3>
          <StarRating
            value={rating}
            onChange={setRating}
            className="flex items-center justify-center"
          />
          {rating != null && (
            <div className="text-sm text-gray-500 mt-4 text-center">
              {rating}점 이상의 숙소만 표시됩니다
            </div>
          )}
        </div>
      </div>
    </BaseModal>
  );
}
