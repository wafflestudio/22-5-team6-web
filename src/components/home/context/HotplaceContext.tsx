import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useState } from 'react';

import axiosInstance from '@/axiosInstance';
import type {
  RoomListResponse,
  RoomMain,
  RoomMainResponse,
} from '@/types/roomSearch';

type HotPlaceContextType = {
  trendingRooms: RoomMain[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
  fetchTrendingRooms: (startDate: Date, endDate: Date) => Promise<void>;
};

const HotPlaceContext = createContext<HotPlaceContextType | undefined>(
  undefined,
);

export function HotPlaceProvider({ children }: { children: ReactNode }) {
  const [trendingRooms, setTrendingRooms] = useState<RoomMain[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrendingRooms = useCallback(
    async (startDate: Date, endDate: Date) => {
      setIsLoading(true);
      setError(null);

      try {
        const params = {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
        };

        const response = await axiosInstance.get<RoomListResponse>(
          '/api/v1/rooms/main/hotPlaces',
          { params },
        );

        const mappedRooms = response.data.content.map(
          (item: RoomMainResponse): RoomMain => ({
            id: item.roomId,
            name: item.roomName,
            type: item.roomType,
            address: {
              sido: item.sido,
              sigungu: item.sigungu,
            },
            price: item.price,
            rating: item.averageRating,
            imageUrl: item.imageUrl,
            isLiked: item.isLiked,
          }),
        );

        setTrendingRooms(mappedRooms);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : '핫플레이스를 불러오는 중 오류가 발생했습니다.';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
        setHasSearched(true);
      }
    },
    [],
  );

  return (
    <HotPlaceContext.Provider
      value={{
        trendingRooms,
        isLoading,
        error,
        hasSearched,
        fetchTrendingRooms,
      }}
    >
      {children}
    </HotPlaceContext.Provider>
  );
}

export function useHotPlace() {
  const context = useContext(HotPlaceContext);
  if (context === undefined) {
    throw new Error('useHotPlace must be used within a HotPlaceProvider');
  }
  return context;
}
