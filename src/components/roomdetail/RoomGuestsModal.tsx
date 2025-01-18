import { useState } from 'react';

import { useSearch } from '@/components/home/context/SearchContext';
import ErrorIcon from '@mui/icons-material/Error';

type GuestsModalProps = {
  onClose: () => void;
  maxOccupancy: number;
};

const GuestsModal = ({ onClose, maxOccupancy }: GuestsModalProps) => {
  const { setGuests } = useSearch();
  const [guestCount, setGuestCount] = useState(0);

  const handleIncrement = () => {
    setGuestCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (guestCount > 0) {
      setGuestCount((prev) => prev - 1);
    }
  };

  const handleSave = () => {
    setGuests(guestCount);
    onClose();
  };

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

      <div className="flex items-center mt-6 pt-4 border-t gap-8">
        <button onClick={onClose} className="text-base underline font-medium">
          취소
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-black text-white rounded-lg font-medium"
        >
          저장하기
        </button>
        {maxOccupancy < guestCount && (
          <div className="flex items-center gap-2">
            <ErrorIcon className="text-red-700 text-sm" />
            <div className="text-sm text-red-700">
              게스트 인원이 최대 인원을 초과했습니다
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestsModal;
