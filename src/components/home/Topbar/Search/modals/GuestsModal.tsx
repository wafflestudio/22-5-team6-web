import { useState } from 'react';

import { useSearch } from '@/components/home/context/SearchContext';

interface GuestsModalProps {
  onClose: () => void;
}

interface GuestType {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

const GuestsModal = ({ onClose }: GuestsModalProps) => {
  const { setGuests } = useSearch();
  const [guestCounts, setGuestCounts] = useState<GuestType>({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const handleIncrement = (type: keyof GuestType) => {
    setGuestCounts((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const handleDecrement = (type: keyof GuestType) => {
    if (guestCounts[type] > 0) {
      setGuestCounts((prev) => ({
        ...prev,
        [type]: prev[type] - 1,
      }));
    }
  };

  const handleSave = () => {
    const totalGuests = guestCounts.adults + guestCounts.children;
    setGuests(totalGuests);
    onClose();
  };

  const GuestCounter = ({
    type,
    label,
    description,
    count,
  }: {
    type: keyof GuestType;
    label: string;
    description: string;
    count: number;
  }) => (
    <div className="flex items-center justify-between py-4">
      <div>
        <h3 className="text-base font-medium">{label}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            handleDecrement(type);
          }}
          disabled={count === 0}
          className={`w-8 h-8 rounded-full border flex items-center justify-center
            ${count === 0 ? 'border-gray-200 text-gray-200' : 'border-gray-400 text-gray-400 hover:border-gray-700 hover:text-gray-700'}`}
        >
          -
        </button>
        <span className="w-6 text-center">{count}</span>
        <button
          onClick={() => {
            handleIncrement(type);
          }}
          className="w-8 h-8 rounded-full border border-gray-400 text-gray-400 hover:border-gray-700 hover:text-gray-700 flex items-center justify-center"
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <GuestCounter
        type="adults"
        label="성인"
        description="13세 이상"
        count={guestCounts.adults}
      />
      <GuestCounter
        type="children"
        label="어린이"
        description="2~12세"
        count={guestCounts.children}
      />
      <GuestCounter
        type="infants"
        label="유아"
        description="2세 미만"
        count={guestCounts.infants}
      />
      <GuestCounter
        type="pets"
        label="반려동물"
        description="보조동물을 동반하시나요?"
        count={guestCounts.pets}
      />

      <div className="flex justify-between items-center mt-6 pt-4 border-t">
        <button onClick={onClose} className="text-base underline font-medium">
          취소
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-black text-white rounded-lg font-medium"
        >
          저장하기
        </button>
      </div>
    </div>
  );
};

export default GuestsModal;
