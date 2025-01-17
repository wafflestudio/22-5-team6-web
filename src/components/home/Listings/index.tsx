// components/home/Listings/index.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRoomSearch } from '../context/RoomSearchContext';
import ListingItem from './ListingItem';

const Listings = () => {
  const navigate = useNavigate();
  const { rooms, isLoading, error, searchRooms, pageInfo, handlePageChange } =
    useRoomSearch();

  useEffect(() => {
    void searchRooms();
  }, [searchRooms]);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {rooms.map((room) => (
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
              handlePageChange(pageInfo.pageNumber - 1);
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
                handlePageChange(i);
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
              handlePageChange(pageInfo.pageNumber + 1);
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
