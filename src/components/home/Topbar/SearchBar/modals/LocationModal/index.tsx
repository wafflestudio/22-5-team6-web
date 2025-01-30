import { useState } from 'react';

import { useSearch } from '@/components/home/context/SearchContext';

import LocationSelector from './LocationSelector';
import PopularCities from './PopularCities';

type LocationModalProps = {
  onClose: () => void;
};

export default function LocationModal({ onClose }: LocationModalProps) {
  const { setLocation } = useSearch();
  const [selectedSido, setSelectedSido] = useState('');
  const [selectedSigungu, setSelectedSigungu] = useState('');

  const handleSelect = (location: { sido: string; sigungu: string }) => {
    setSelectedSido(location.sido);
    setSelectedSigungu(location.sigungu);
    setLocation(location);
    if (location.sigungu !== '' && location.sigungu !== '') {
      onClose();
    }
  };

  return (
    <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <div className="grid grid-cols-2 gap-8">
          <PopularCities onSelect={handleSelect} />
          <LocationSelector
            selectedSido={selectedSido}
            selectedSigungu={selectedSigungu}
            onSidoChange={setSelectedSido}
            onSigunguChange={setSelectedSigungu}
            onSelect={handleSelect}
          />
        </div>
      </div>
    </div>
  );
}
