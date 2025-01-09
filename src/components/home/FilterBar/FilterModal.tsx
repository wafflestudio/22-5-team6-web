// components/home/FilterBar/FilterModal.tsx
import { useState } from 'react';

import BaseModal from '@/components/common/Modal/BaseModal';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilter: (priceRange: { min: number; max: number }) => void;
}

export default function FilterModal({
  isOpen,
  onClose,
  onApplyFilter,
}: FilterModalProps) {
  const [minPrice, setMinPrice] = useState<number>(15000);
  const [maxPrice, setMaxPrice] = useState<number>(310000);

  const handleApply = () => {
    if (minPrice > maxPrice) {
      alert('최소 가격이 최대 가격보다 클 수 없습니다.');
      return;
    }
    onApplyFilter({ min: minPrice, max: maxPrice });
    onClose();
  };

  const handleReset = () => {
    setMinPrice(15000);
    setMaxPrice(310000);
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="필터">
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">가격 범위</h3>
          <p className="text-sm text-gray-500 mb-4">
            1박 요금 (수수료 및 세금 포함)
          </p>
          <div className="flex gap-4">
            <div className="flex-1">
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
                  className="w-full pl-8 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-airbnb [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>
            <div className="flex-1">
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
                  className="w-full pl-8 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-airbnb [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <button
            onClick={handleReset}
            className="font-medium underline hover:text-gray-700"
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
      </div>
    </BaseModal>
  );
}
