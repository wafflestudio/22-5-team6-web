import { Search } from 'lucide-react';

import SearchModal from '@/components/common/Modal/SearchModal';
import { useHotPlace } from '@/components/home/context/HotplaceContext';
import { useMode } from '@/components/home/context/ModeContext';
import { useSearch } from '@/components/home/context/SearchContext';

import CalendarModal from './modals/CalendarModal';
import GuestsModal from './modals/GuestsModal';
import LocationModal from './modals/LocationModal';

const SearchBarSmall = () => {
  const { location, checkIn, checkOut, guests, openModal, searchRooms } =
    useSearch();

  // 날짜 포맷팅 함수 개선
  const getFormattedDateRange = () => {
    if (checkIn !== null && checkOut !== null) {
      const startMonth = checkIn.getMonth() + 1;
      const endMonth = checkOut.getMonth() + 1;
      const startDate = checkIn.getDate();
      const endDate = checkOut.getDate();

      if (startMonth === endMonth) {
        return `${startMonth}월 ${startDate}일~${endDate}일`;
      }
      return `${startMonth}월 ${startDate}일~${endMonth}월 ${endDate}일`;
    }
    return '언제든';
  };

  return (
    <div className="flex items-center gap-2 h-[48px] border rounded-full shadow-md px-2">
      <button
        className="flex-1 px-4 text-sm whitespace-nowrap truncate hover:bg-gray-100 rounded-full transition"
        onClick={() => {
          openModal('location');
        }}
      >
        {location.sido != null && location.sido !== ''
          ? location.sigungu != null
            ? `${location.sido} ${location.sigungu}`
            : location.sido
          : '어디든지'}
      </button>
      <div className="w-px h-6 bg-gray-200" />
      <button
        className="flex-1 px-4 text-sm whitespace-nowrap truncate hover:bg-gray-100 rounded-full transition"
        onClick={() => {
          openModal('calendar');
        }}
      >
        {getFormattedDateRange()}
      </button>
      <div className="w-px h-6 bg-gray-200" />
      <button
        className="flex-1 px-4 text-sm whitespace-nowrap truncate hover:bg-gray-100 rounded-full transition"
        onClick={() => {
          openModal('guests');
        }}
      >
        {guests > 0 ? `게스트 ${guests}명` : '게스트 추가'}
      </button>
      <button
        onClick={() => void searchRooms()}
        className="p-2 rounded-full bg-airbnb hover:bg-airbnb-dark transition"
        aria-label="검색"
      >
        <Search className="h-4 w-4 text-white" />
      </button>
    </div>
  );
};
const SearchBar = () => {
  const {
    location,
    checkIn,
    checkOut,
    guests,
    currentModal,
    openModal,
    closeModal,
    searchRooms,
  } = useSearch();

  const { mode } = useMode();
  const { fetchTrendingRooms } = useHotPlace();

  const hasDateSelected = checkIn !== null && checkOut !== null;

  const handleSearch = () => {
    if (mode === 'hotplace' && checkIn !== null && checkOut !== null) {
      void fetchTrendingRooms(checkIn, checkOut);
    }
  };

  if (mode === 'hotplace') {
    return (
      <div className="w-full flex justify-center relative">
        <div className="w-full max-w-3xl">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                openModal('calendar');
              }}
              className="w-full p-3 pl-6 border rounded-full shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 text-center">
                  <span className="text-base font-medium">
                    {hasDateSelected
                      ? `${checkIn.toLocaleDateString()} - ${checkOut.toLocaleDateString()}`
                      : '여행 기간을 선택하고 인기 핫플을 찾아보세요! 👀🔥'}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSearch();
                  }}
                  className="p-3 rounded-full bg-airbnb hover:bg-airbnb-dark transition-colors"
                  disabled={!hasDateSelected}
                >
                  <Search className="h-5 w-5 text-white" />
                </button>
              </div>
            </button>
          </div>

          {/* Calendar Modal */}
          <SearchModal
            type="calendar"
            isOpen={currentModal === 'calendar'}
            onClose={closeModal}
          >
            <CalendarModal onClose={closeModal} />
          </SearchModal>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-3xl relative">
        <div className="hidden md:block">
          {/* Search Bar */}
          <div className="border rounded-full shadow-md">
            <div className="grid grid-cols-3 relative">
              <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-px h-8 bg-gray-200 peer-hover:hidden" />
              <div className="absolute top-1/2 left-2/3 -translate-y-1/2 w-px h-8 bg-gray-200" />

              {/* 위치 섹션 */}
              <button
                className="flex flex-col items-start p-3 pl-6 hover:bg-gray-100 rounded-full transition"
                onClick={() => {
                  openModal('location');
                }}
              >
                <span className="text-sm font-medium">여행지</span>
                <span className="text-sm text-gray-500">
                  {location.sido != null && location.sido !== ''
                    ? location.sigungu != null
                      ? `${location.sido} ${location.sigungu}`
                      : location.sido
                    : '여행지 검색'}
                </span>
              </button>

              {/* 날짜 섹션 */}
              <div className="grid grid-cols-2 relative">
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-px h-8 bg-gray-200" />

                <button
                  className="flex flex-col items-start p-3 pl-6 hover:bg-gray-100 rounded-full transition"
                  onClick={() => {
                    openModal('calendar');
                  }}
                >
                  <span className="text-sm font-medium">체크인</span>
                  <span className="text-sm text-gray-500 whitespace-nowra">
                    {checkIn !== null
                      ? checkIn.toLocaleDateString()
                      : '날짜 추가'}
                  </span>
                </button>

                <button
                  className="flex flex-col items-start p-3  pl-6 hover:bg-gray-100 rounded-full transition"
                  onClick={() => {
                    openModal('calendar');
                  }}
                >
                  <span className="text-sm font-medium">체크아웃</span>
                  <span className="text-sm text-gray-500">
                    {checkOut !== null
                      ? checkOut.toLocaleDateString()
                      : '날짜 추가'}
                  </span>
                </button>
              </div>

              {/* 게스트 & 검색 버튼 섹션 */}
              <div className="flex items-center justify-between p-3 pl-6 hover:bg-gray-100 rounded-full transition">
                <button
                  className="flex flex-col items-start flex-1"
                  onClick={() => {
                    openModal('guests');
                  }}
                >
                  <span className="text-sm font-medium">여행자</span>
                  <span className="text-sm text-gray-500">
                    {guests > 0 ? `게스트 ${guests}명` : '게스트 추가'}
                  </span>
                </button>
                <button
                  onClick={() => {
                    void searchRooms();
                  }}
                  className="p-3 rounded-full bg-airbnb"
                  aria-label="검색"
                >
                  <Search className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 작은 화면일 때의 SearchBar */}
        <div className="block md:hidden">
          <SearchBarSmall />
        </div>

        {/* Search Modals */}
        <SearchModal
          type="location"
          isOpen={currentModal === 'location'}
          onClose={closeModal}
        >
          <LocationModal onClose={closeModal} />
        </SearchModal>

        <SearchModal
          type="calendar"
          isOpen={currentModal === 'calendar'}
          onClose={closeModal}
        >
          <CalendarModal onClose={closeModal} />
        </SearchModal>

        <SearchModal
          type="guests"
          isOpen={currentModal === 'guests'}
          onClose={closeModal}
        >
          <GuestsModal />
        </SearchModal>
      </div>
    </div>
  );
};

export default SearchBar;
