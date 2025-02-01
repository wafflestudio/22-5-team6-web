import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useHotPlace } from '../context/HotplaceContext';
import { useMode } from '../context/ModeContext';
import { useSearch } from '../context/SearchContext';
import ListingItem from './ListingItem';

const Listings = () => {
  const navigate = useNavigate();
  const {
    rooms,
    isLoading: isNormalLoading,
    error,
    initRooms,
    pageInfo,
    pageRooms,
  } = useSearch();

  const { mode } = useMode();
  const {
    trendingRooms,
    isLoading: isHotplaceLoading,
    hasSearched,
  } = useHotPlace();

  const isInitialMount = useRef(true);
  const displayRooms = mode === 'normal' ? rooms : trendingRooms;
  const isLoading = mode === 'normal' ? isNormalLoading : isHotplaceLoading;

  useEffect(() => {
    if (isInitialMount.current) {
      void initRooms();
      isInitialMount.current = false;
    }
  }, [initRooms]);

  const handleRoomClick = (id: string) => {
    void navigate(`/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-lg">숙소 정보를 불러오는 중...</div>
      </div>
    );
  }

  if (error != null && error !== '') {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-500">
            죄송합니다. 오류가 발생했습니다.
          </p>
          <p className="mt-2 text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  // 핫플레이스 모드일 때의 초기 안내 화면
  if (mode === 'hotplace' && !hasSearched) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
        <div className="text-4xl">🏆✨</div>
        <h2 className="text-2xl font-semibold">실시간 인기 핫플레이스</h2>
        <div className="text-gray-600 max-w-lg space-y-1">
          <p>여행 기간을 선택하면</p>
          <p>해당 기간 동안 가장 많은 예약과 높은 평점을</p>
          <p>기록한 인기 숙소 TOP 3를 보여드려요!</p>
        </div>
      </div>
    );
  }

  if (mode === 'hotplace' && hasSearched && trendingRooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
        <div className="text-4xl">🔍</div>
        <h2 className="text-xl font-medium">
          선택하신 기간에는 아직 핫플레이스가 없어요
        </h2>
        <p className="text-gray-600">다른 날짜를 선택해보시는 건 어떨까요?</p>
      </div>
    );
  }

  // 일반 모드일 때 숙소가 없는 경우
  if (mode === 'normal' && rooms.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <p className="text-lg">아직 등록된 숙소가 없어요!</p>
          <p className="mt-2 text-gray-600">나중에 다시 확인해주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* 핫플레이스 모드일 때의 헤더 */}
      {mode === 'hotplace' && trendingRooms.length > 0 && (
        <div className="mb-8">
          <div className="bg-gray-50 rounded-xl py-4">
            <h2 className="text-center">
              <span className="text-lg">
                ✨ 이 기간 핫플레이스는{' '}
                <strong className="text-xl">
                  {trendingRooms[0]?.address?.sido}{' '}
                  {trendingRooms[0]?.address?.sigungu}
                </strong>{' '}
                ✨
              </span>
            </h2>
            <p className="text-center text-gray-600 text-sm mt-1">
              가장 많은 예약과 높은 평점을 기록한 TOP 3 숙소를 만나보세요!
            </p>
          </div>
        </div>
      )}

      {/* 숙소 목록 */}
      <div
        className={`grid gap-6 ${
          mode === 'hotplace'
            ? 'grid-cols-1 md:grid-cols-3'
            : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        }`}
      >
        {displayRooms.map((room) => (
          <div
            key={room.id}
            onClick={() => {
              handleRoomClick(room.id.toString());
            }}
            className="cursor-pointer"
          >
            <ListingItem listing={room} />
          </div>
        ))}
      </div>

      {/* 페이지네이션 - 일반 모드일 때만 표시 */}
      {mode === 'normal' && pageInfo.totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          <button
            onClick={() => {
              void pageRooms(pageInfo.pageNumber - 1);
            }}
            disabled={pageInfo.pageNumber === 0}
            className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            이전
          </button>
          {Array.from({ length: pageInfo.totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => {
                void pageRooms(i);
              }}
              className={`rounded-lg px-4 py-2 ${
                pageInfo.pageNumber === i
                  ? 'bg-black text-white'
                  : 'border hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => {
              void pageRooms(pageInfo.pageNumber + 1);
            }}
            disabled={pageInfo.pageNumber === pageInfo.totalPages - 1}
            className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};

export default Listings;
