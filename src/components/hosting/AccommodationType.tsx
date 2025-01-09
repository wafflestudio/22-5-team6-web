// components/hosting/AccommodationType.tsx
import { ACCOMMODATION_TYPES } from '@/components/common/constants/accommodationTypes';

type AccommodationTypeProps = {
  selectedType: string;
  onTypeSelect: (type: string) => void;
};

export default function AccommodationType({
  selectedType,
  onTypeSelect,
}: AccommodationTypeProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {ACCOMMODATION_TYPES.map((item) => (
        <button
          key={item.label}
          onClick={() => {
            onTypeSelect(item.label);
          }}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg border ${
            selectedType === item.label
              ? 'border-airbnb bg-airbnb/5 text-airbnb'
              : 'border-gray-300 hover:border-gray-400'
          } transition-colors`}
        >
          <img src={item.imageUrl} alt={item.label} className="h-5 w-5" />
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}
