import { ACCOMMODATION_TYPES } from '@/components/common/constants/accommodationTypes';
import { RoomType } from '@/types/room';

type AccommodationTypeProps = {
  selectedType: RoomType | null;
  onTypeSelect: (type: RoomType) => void;
};

export default function AccommodationType({
  selectedType,
  onTypeSelect,
}: AccommodationTypeProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {ACCOMMODATION_TYPES.map(({ label, imageUrl, value }) => (
        <button
          key={value}
          onClick={() => {
            onTypeSelect(value);
          }}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg border ${
            selectedType === value
              ? 'border-airbnb bg-airbnb/5 text-airbnb'
              : 'border-gray-300 hover:border-gray-400'
          } transition-colors`}
        >
          <img src={imageUrl} alt={label} className="h-5 w-5" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}