import { POPULAR_CITIES } from './constants';

type PopularCitiesProps = {
  onSelect: (location: { sido: string; sigungu: string }) => void;
};

export default function PopularCities({ onSelect }: PopularCitiesProps) {
  const getCityMapping = (
    cityName: string,
  ): { sido: string; sigungu: string } => {
    const cityMapping: { [key: string]: { sido: string; sigungu: string } } = {
      서울: { sido: '서울특별시', sigungu: '' },
      부산: { sido: '부산광역시', sigungu: '' },
      제주: { sido: '제주특별자치도', sigungu: '제주시' },
      속초: { sido: '강원도', sigungu: '속초시' },
      강릉: { sido: '강원도', sigungu: '강릉시' },
      전주: { sido: '전라북도', sigungu: '전주시' },
      대구: { sido: '대구광역시', sigungu: '' },
      경주: { sido: '경상북도', sigungu: '경주시' },
      여수: { sido: '전라남도', sigungu: '여수시' },
      서귀포: { sido: '제주특별자치도', sigungu: '서귀포시' },
      대전: { sido: '대전광역시', sigungu: '' },
      인천: { sido: '인천광역시', sigungu: '' },
    };

    return cityMapping[cityName] ?? { sido: '', sigungu: '' };
  };

  const handleCitySelect = (cityName: string) => {
    const mappedLocation = getCityMapping(cityName);
    if (mappedLocation.sido !== '') {
      onSelect(mappedLocation);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">인기 여행지</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {POPULAR_CITIES.map((city) => (
          <button
            key={city.name}
            onClick={() => {
              handleCitySelect(city.name);
            }}
            className="p-4 rounded-lg border hover:border-gray-400 transition-colors text-left"
          >
            <span className="block text-sm font-medium">{city.name}</span>
            <span className="text-xs text-gray-500">{city.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
