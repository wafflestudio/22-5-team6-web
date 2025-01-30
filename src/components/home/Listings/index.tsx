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
  const { trendingRooms, isLoading: isHotplaceLoading } = useHotPlace();

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      void initRooms();
      isInitialMount.current = false;
    }
  }, [initRooms]);

  const handleRoomClick = (id: string) => {
    void navigate(`/${id}`);
  };

  const displayRooms = mode === 'normal' ? rooms : trendingRooms;
  const isLoading = mode === 'normal' ? isNormalLoading : isHotplaceLoading;

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

  if (rooms.length === 0) {
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
      {mode === 'hotplace' && trendingRooms.length > 0 && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold">🔥 실시간 인기 핫플레이스</h2>
          <p className="text-sm text-gray-600">
            선택하신 기간 동안 가장 많은 예약이 있었던 지역의 별점 TOP 3
            숙소입니다.
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayRooms.map((room) => (
          <div
            key={room.id}
            onClick={() => {
              handleRoomClick(room.id.toString());
            }}
            style={{ cursor: 'pointer' }}
          >
            <ListingItem listing={room} />
          </div>
        ))}
      </div>

      {/* 페이지네이션 UI */}
      {pageInfo.totalPages > 1 && (
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
