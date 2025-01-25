import type { ReactNode } from 'react';
import { useCallback } from 'react';
import { createContext, useContext, useState } from 'react';

import { RoomType } from '@/types/room';
import type {
  RoomListResponse,
  RoomMain,
  RoomMainResponse,
  RoomSearchParams,
} from '@/types/roomSearch';

type ModalType =
  | 'location'
  | 'calendar'
  | 'guests'
  | 'filter'
  | 'roomCalendar'
  | 'roomGuests'
  | null;

type Location = {
  sido?: string;
  sigungu?: string;
};

type PageInfo = {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
};

type Filter = {
  minPrice: number | null;
  maxPrice: number | null;
  roomType: RoomType | null;
};

type SearchContextType = {
  location: Location;
  setLocation: (location: Location) => void;
  checkIn: Date | null;
  setCheckIn: (date: Date | null) => void;
  checkOut: Date | null;
  setCheckOut: (date: Date | null) => void;
  guests: number;
  setGuests: (count: number) => void;

  currentModal: ModalType;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;

  // Room 데이터 관련
  rooms: RoomMain[];
  isLoading: boolean;
  error: string | null;

  // 페이지네이션
  pageInfo: PageInfo;
  handlePageChange: (page: number) => void;
  pageRooms: (pageNumber: number) => Promise<void>;

  // 필터 관련
  filter: Filter;
  setFilter: (filter: Filter) => void;

  // 검색 실행
  initRooms: () => Promise<void>;
  searchRooms: () => Promise<void>;
  filterRooms: (newFilter: Filter) => Promise<void>;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<Location>({ sido: '' });
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(0);

  const [currentModal, setCurrentModal] = useState<ModalType>(null);

  // Room 데이터 관련 상태
  const [rooms, setRooms] = useState<RoomMain[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 페이지네이션 상태
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    pageNumber: 0,
    pageSize: 2,
    totalElements: 0,
    totalPages: 0,
  });

  // 필터 상태
  const [filter, setFilter] = useState<Filter>({
    minPrice: null,
    maxPrice: null,
    roomType: null,
  });

  const openModal = (modal: ModalType) => {
    setCurrentModal(modal);
  };
  const closeModal = () => {
    setCurrentModal(null);
  };

  // URLSearchParams로 변환하는 함수
  const convertToURLSearchParams = (
    params: RoomSearchParams,
  ): URLSearchParams => {
    const urlParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== '') {
        urlParams.append(key, value.toString());
      }
    });

    return urlParams;
  };

  // 1) 처음 렌더링 할 때
  const initRooms = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const searchParams = {
        page: pageInfo.pageNumber,
        size: pageInfo.pageSize,
        sort: 'createdAt,desc',
      };

      const urlParams = convertToURLSearchParams(searchParams);
      const response = await fetch(
        `/api/v1/rooms/main?${urlParams.toString()}`,
      );

      if (!response.ok) {
        throw new Error('방 검색에 실패했습니다.');
      }

      const data = (await response.json()) as RoomListResponse;
      handleResponseData(data);
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  }, [pageInfo.pageNumber, pageInfo.pageSize]);

  const searchRooms = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const searchParams: RoomSearchParams = {
        page: pageInfo.pageNumber,
        size: pageInfo.pageSize,
        sort: 'createdAt,desc',
        ...(location.sido !== '' && { sido: location.sido }),
        ...(location.sigungu != null &&
          location.sigungu !== '' && { sigungu: location.sigungu }),
        ...(checkIn != null && {
          startDate: checkIn.toISOString().split('T')[0],
        }),
        ...(checkOut != null && {
          endDate: checkOut.toISOString().split('T')[0],
        }),
        ...(guests > 0 && { maxOccupancy: guests }),
      };

      const urlParams = convertToURLSearchParams(searchParams);

      const response = await fetch(
        `/api/v1/rooms/main/search?${urlParams.toString()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('방 검색에 실패했습니다.');
      }

      const data = (await response.json()) as RoomListResponse;
      handleResponseData(data);
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  }, [location, checkIn, checkOut, guests, pageInfo]);

  const filterRooms = useCallback(
    async (newFilter: Filter) => {
      setIsLoading(true);
      setError(null);

      try {
        const searchParams: RoomSearchParams = {
          page: pageInfo.pageNumber,
          size: pageInfo.pageSize,
          sort: 'createdAt,desc',
          ...(newFilter.minPrice != null && { minPrice: newFilter.minPrice }),
          ...(newFilter.maxPrice != null && { maxPrice: newFilter.maxPrice }),
          ...(newFilter.roomType != null && { roomType: newFilter.roomType }),
        };

        const urlParams = convertToURLSearchParams(searchParams);
        const response = await fetch(
          `/api/v1/rooms/main/search?${urlParams.toString()}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (!response.ok) {
          throw new Error('방 검색에 실패했습니다.');
        }

        const data = (await response.json()) as RoomListResponse;
        setFilter(newFilter);
        handleResponseData(data);
      } catch (err) {
        handleError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [pageInfo],
  );

  const pageRooms = useCallback(
    async (pageNumber: number) => {
      setIsLoading(true);
      setError(null);

      try {
        const searchParams: RoomSearchParams = {
          page: pageNumber,
          size: pageInfo.pageSize,
          sort: 'createdAt,desc',
          ...(location.sido !== '' && { sido: location.sido }),
          ...(location.sigungu != null &&
            location.sigungu !== '' && { sigungu: location.sigungu }),
          ...(checkIn != null && {
            startDate: checkIn.toISOString().split('T')[0],
          }),
          ...(checkOut != null && {
            endDate: checkOut.toISOString().split('T')[0],
          }),
          ...(guests > 0 && { maxOccupancy: guests }),
          ...(filter.minPrice != null && { minPrice: filter.minPrice }),
          ...(filter.maxPrice != null && { maxPrice: filter.maxPrice }),
          ...(filter.roomType != null && { roomType: filter.roomType }),
        };

        const urlParams = convertToURLSearchParams(searchParams);

        const hasSearchParams = Object.keys(searchParams).length > 3;
        const endpoint = hasSearchParams
          ? '/api/v1/rooms/main/search'
          : '/api/v1/rooms/main';

        const response = await fetch(`${endpoint}?${urlParams.toString()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('방 검색에 실패했습니다.');
        }

        const data = (await response.json()) as RoomListResponse;
        setPageInfo((prev) => ({ ...prev, pageNumber }));
        handleResponseData(data);
      } catch (err) {
        handleError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [pageInfo.pageSize, location, checkIn, checkOut, guests, filter],
  );

  // 공통 응답 처리 함수
  const handleResponseData = (data: RoomListResponse) => {
    const mappedRooms = data.content.map(
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
      }),
    );

    setRooms(mappedRooms);
    setPageInfo({
      pageNumber: data.number,
      pageSize: data.size,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
    });
  };

  // 공통 에러 처리 함수
  const handleError = (err: unknown) => {
    const errorMessage =
      err instanceof Error ? err.message : '검색 중 오류가 발생했습니다.';
    setError(errorMessage);
  };

  const handlePageChange = useCallback(
    (page: number) => {
      if (pageInfo.pageNumber !== page) {
        void pageRooms(page);
      }
    },
    [pageInfo.pageNumber, pageRooms],
  );

  return (
    <SearchContext.Provider
      value={{
        location,
        setLocation,
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,
        guests,
        setGuests,
        currentModal,
        openModal,
        closeModal,
        rooms,
        isLoading,
        error,
        pageInfo,
        filter,
        setFilter,
        initRooms,
        searchRooms,
        filterRooms,
        pageRooms,
        handlePageChange,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
