// src/components/home/Search/modals/LocationModal/index.tsx
import { useSearch } from '@/components/home/context/SearchContext';

import LocationSelector from './LocationSelector';
import PopularCities from './PopularCities';

type LocationModalProps = {
  onClose: () => void;
};

export default function LocationModal({ onClose }: LocationModalProps) {
  const { setLocation } = useSearch();

  const handleSelect = (location: { sido: string; sigungu: string }) => {
    setLocation(location);
    onClose();
  };

  return (
    <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        {/* 콘텐츠 영역 */}
        <div className="grid grid-cols-2 gap-8">
          <PopularCities onSelect={handleSelect} />
          <LocationSelector onSelect={handleSelect} />
        </div>
      </div>
    </div>
  );
}
