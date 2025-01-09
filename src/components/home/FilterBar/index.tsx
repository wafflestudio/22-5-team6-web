import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { useRef } from 'react';

// 필터 아이템 타입 정의
interface FilterItem {
  label: string;
  imageUrl: string;
}

// 필터 데이터
export const filterItems: FilterItem[] = [
  {
    label: '한적한 시골',
    imageUrl:
      'https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg',
  },
  {
    label: '최고의 전망',
    imageUrl:
      'https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg',
  },
  {
    label: '캠핑장',
    imageUrl:
      'https://a0.muscache.com/pictures/ca25c7f3-0d1f-432b-9efa-b9f5dc6d8770.jpg',
  },
  {
    label: '한옥',
    imageUrl:
      'https://a0.muscache.com/pictures/51f5cf64-5821-400c-8033-8a10c7787d69.jpg',
  },
  {
    label: '해변 바로 앞',
    imageUrl:
      'https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg',
  },
  {
    label: '디자인',
    imageUrl:
      'https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg',
  },
  {
    label: '멋진 수영장',
    imageUrl:
      'https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg',
  },
  {
    label: '통나무집',
    imageUrl:
      'https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg',
  },
  {
    label: '최고의 조리시설',
    imageUrl:
      'https://a0.muscache.com/pictures/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg',
  },
  {
    label: '북극',
    imageUrl:
      'https://a0.muscache.com/pictures/8b44f770-7156-4c7b-b4d3-d92549c8652f.jpg',
  },
  {
    label: '농장',
    imageUrl:
      'https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg',
  },
  {
    label: '인기 급상승',
    imageUrl:
      'https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg',
  },
];

export const FilterBar = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current === null) return;

    const scrollAmount = 200;
    const newScrollPosition =
      scrollContainerRef.current.scrollLeft +
      (direction === 'left' ? -scrollAmount : scrollAmount);

    scrollContainerRef.current.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative flex items-center w-full border-b">
      {/* 스크롤 가능한 필터 목록 */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-x-auto flex items-center gap-8 px-8 pb-4 scrollbar-none"
      >
        {filterItems.map((item, index) => (
          <button
            key={index}
            className="flex flex-col items-center gap-2 min-w-[56px] pt-4 text-gray-500 hover:text-black transition-colors border-b-2 border-transparent hover:border-gray-200"
          >
            <img
              src={item.imageUrl}
              alt={item.label}
              className="h-6 w-6 opacity-60 hover:opacity-100 transition-opacity"
            />
            <span className="text-xs whitespace-nowrap">{item.label}</span>
          </button>
        ))}
      </div>

      {/* 오른쪽 필터 버튼 */}
      <div className="flex items-center gap-4 pr-8 pl-4">
        <button
          onClick={() => {
            scroll('left');
          }}
          className="p-2 rounded-full border border-gray-200 hover:shadow-md transition"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => {
            scroll('right');
          }}
          className="p-2 rounded-full border border-gray-200 hover:shadow-md transition"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <div className="h-8 border-l border-gray-200" />
        <button className="px-4 py-2 rounded-xl border border-gray-200 hover:shadow-md transition flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          <span className="text-sm">필터</span>
        </button>
      </div>
    </div>
  );
};
