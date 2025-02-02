import { useEffect, useState } from 'react';

import { useSearch } from '@/components/home/context/SearchContext';

const GuestsModal = () => {
  const { guests, setGuests } = useSearch();
  const [guestCount, setGuestCount] = useState(guests);

  const handleIncrement = () => {
    setGuestCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (guestCount > 0) {
      setGuestCount((prev) => prev - 1);
    }
  };

  useEffect(() => {
    setGuests(guestCount);
  }, [guestCount, setGuests]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between py-4">
        <div>
          <h3 className="text-base font-medium">게스트</h3>
          <p className="text-sm text-gray-500">숙박 인원을 선택해주세요</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleDecrement}
            disabled={guestCount === 0}
            className={`w-8 h-8 rounded-full border flex items-center justify-center
              ${guestCount === 0 ? 'border-gray-200 text-gray-200' : 'border-gray-400 text-gray-400 hover:border-gray-700 hover:text-gray-700'}`}
          >
            -
          </button>
          <span className="w-6 text-center">{guestCount}</span>
          <button
            onClick={handleIncrement}
            className="w-8 h-8 rounded-full border border-gray-400 text-gray-400 hover:border-gray-700 hover:text-gray-700 flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestsModal;
