import {
  getDistricts,
  SIDO_LIST,
} from '@/components/common/constants/koreanDistricts';

type LocationSelectorProps = {
  selectedSido: string;
  selectedSigungu: string;
  onSidoChange: (sido: string) => void;
  onSigunguChange: (sigungu: string) => void;
  onSelect: (location: { sido: string; sigungu: string }) => void;
};

export default function LocationSelector({
  selectedSido,
  selectedSigungu,
  onSidoChange,
  onSigunguChange,
  onSelect,
}: LocationSelectorProps) {
  const handleSidoChange = (sido: string) => {
    onSidoChange(sido);
    onSigunguChange('');
    if (sido !== '') {
      onSelect({
        sido: sido,
        sigungu: '',
      });
    }
  };

  const handleSigunguChange = (sigungu: string) => {
    onSigunguChange(sigungu);
    if (selectedSido !== '' && sigungu !== '') {
      onSelect({
        sido: selectedSido,
        sigungu: sigungu,
      });
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">지역으로 검색</h3>
      <div className="space-y-4">
        <div>
          <select
            value={selectedSido}
            onChange={(e) => {
              handleSidoChange(e.target.value);
            }}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-airbnb focus:border-transparent"
          >
            <option value="">시/도 선택</option>
            {SIDO_LIST.map((sido) => (
              <option key={sido} value={sido}>
                {sido}
              </option>
            ))}
          </select>
        </div>

        {selectedSido !== '' && (
          <div>
            <select
              value={selectedSigungu}
              onChange={(e) => {
                handleSigunguChange(e.target.value);
              }}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-airbnb focus:border-transparent"
            >
              <option value="">시/군/구 선택</option>
              {getDistricts(selectedSido).map((sigungu) => (
                <option key={sigungu} value={sigungu}>
                  {sigungu}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
