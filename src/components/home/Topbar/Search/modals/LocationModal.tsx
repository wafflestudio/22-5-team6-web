import { useSearch } from '@/components/home/context/SearchContext';

interface LocationModalProps {
  onClose: () => void;
}

const koreanCities = [
  { name: '서울', category: '도시' },
  { name: '부산', category: '도시' },
  { name: '제주도', category: '섬' },
  { name: '속초', category: '도시' },
  { name: '강릉', category: '도시' },
  { name: '전주', category: '도시' },
  { name: '대구', category: '도시' },
  { name: '경주', category: '도시' },
  { name: '여수', category: '도시' },
  { name: '서귀포', category: '도시' },
  { name: '대전', category: '도시' },
  { name: '인천', category: '도시' },
];

const LocationModal = ({ onClose }: LocationModalProps) => {
  const { setLocation } = useSearch();

  const handleCitySelect = (cityName: string) => {
    setLocation(cityName);
    onClose();
  };

  return (
    <div className="p-6">
      {/* 한국 제목 */}
      <h3 className="text-lg font-semibold mb-4">한국</h3>

      {/* 도시 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {koreanCities.map((city) => (
          <button
            key={city.name}
            onClick={() => {
              handleCitySelect(city.name);
            }}
            className="p-4 rounded-lg border hover:border-gray-400 transition-colors text-left"
          >
            <span className="block text-sm font-medium">{city.name}</span>
            <span className="text-sm text-gray-500">{city.category}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LocationModal;
