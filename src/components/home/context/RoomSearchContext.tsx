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

type RoomSearchContextType = {
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

  // 필터 관련
  filter: Filter;
  setFilter: (filter: Filter) => void;

  // 검색 실행
  searchRooms: () => Promise<void>;
};

const SearchContext = createContext<RoomSearchContextType | undefined>(
  undefined,
);

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
    pageSize: 4,
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

  // searchRooms 함수 내부 로직
  const buildSearchParams = useCallback((): RoomSearchParams => {
    const searchParams: RoomSearchParams = {
      page: pageInfo.pageNumber,
      size: pageInfo.pageSize,
      sort: '',
    };

    // 위치 파라미터
    if (location.sido !== '') {
      searchParams['sido'] = location.sido;
      if (location.sigungu != null && location.sigungu !== '') {
        searchParams['sigungu'] = location.sigungu;
      }
    }

    // 날짜 파라미터
    if (checkIn != null) {
      searchParams.startDate = checkIn.toISOString().split('T')[0];
    }
    if (checkOut != null) {
      searchParams.endDate = checkOut.toISOString().split('T')[0];
    }

    // 게스트 수 파라미터
    if (guests > 0) {
      searchParams.maxOccupancy = guests;
    }

    // 필터 파라미터
    if (filter.minPrice != null) {
      searchParams.minPrice = filter.minPrice;
    }
    if (filter.maxPrice != null) {
      searchParams.maxPrice = filter.maxPrice;
    }
    if (filter.roomType != null) {
      searchParams.roomType = filter.roomType;
    }

    return searchParams;
  }, [location, checkIn, checkOut, guests, filter, pageInfo]);

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

  const searchRooms = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const searchParams = buildSearchParams();
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
      handleResponseData(data);
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  }, [buildSearchParams]);

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
        setPageInfo((prev) => ({ ...prev, pageNumber: page }));
        void searchRooms();
      }
    },
    [searchRooms, pageInfo.pageNumber],
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
        searchRooms,
        handlePageChange,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useRoomSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
