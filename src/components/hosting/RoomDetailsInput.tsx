import {
  ROOM_AMENITIES,
  ROOM_FACILITIES,
} from '@/components/common/constants/roomOption';
import type { RoomDetails } from '@/types/room';

type RoomDetailsInputProps = {
  details: RoomDetails;
  onDetailsChange: (details: RoomDetails) => void;
};

export default function RoomDetailsInput({
  details,
  onDetailsChange,
}: RoomDetailsInputProps) {
  const handleAmenityChange = (
    id: keyof Pick<RoomDetails, 'wifi' | 'selfCheckin' | 'luggage' | 'TV'>,
  ) => {
    onDetailsChange({
      ...details,
      [id]: !details[id],
    });
  };

  const handleFacilityChange = (
    id: keyof Pick<RoomDetails, 'bedroom' | 'bathroom' | 'bed'>,
    value: string,
  ) => {
    onDetailsChange({
      ...details,
      [id]: value,
    });
  };

  return (
    <div className="space-y-8">
      {/* 편의시설 섹션 */}
      <div>
        <div className="grid grid-cols-2 gap-4">
          {ROOM_AMENITIES.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => {
                handleAmenityChange(id);
              }}
              className={`flex items-center gap-3 p-4 rounded-lg border ${
                details[id]
                  ? 'border-airbnb bg-airbnb/5 text-airbnb'
                  : 'border-gray-300 hover:border-gray-400'
              } transition-colors`}
            >
              <img src={icon} alt={label} className="w-6 h-6" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 시설 정보 섹션 */}
      <div>
        <h3 className="text-lg font-medium mb-4">시설 정보</h3>
        <div className="space-y-4">
          {ROOM_FACILITIES.map(({ id, label, unit }) => (
            <div key={id} className="flex items-center gap-4">
              <div className="flex-1">
                <label htmlFor={id} className="block text-gray-700">
                  {label}
                </label>
              </div>
              <div className="relative w-32">
                <input
                  id={id}
                  type="number"
                  min="1"
                  max="100"
                  value={details[id] === '' ? '' : details[id]}
                  onChange={(e) => {
                    handleFacilityChange(id, e.target.value);
                  }}
                  className="w-full pl-4 pr-8 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-airbnb focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
