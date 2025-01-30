import axios from 'axios';
import type { ReactNode } from 'react';
import { useCallback } from 'react';
import { createContext, useContext, useState } from 'react';

import type { RoomDetails } from '@/types/room';
import { RoomType } from '@/types/room';
import type {
  RoomListResponse,
  RoomMain,
  RoomMainResponse,
  RoomSearchParams,
  Sort,
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
  rating: number | null;
} & Partial<RoomDetails>;

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

  sort: Sort;
  setSort: (sort: Sort) => void;
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
    pageSize: 8,
    totalElements: 0,
    totalPages: 0,
  });

  // 필터 상태
  const [filter, setFilter] = useState<Filter>({
    minPrice: null,
    maxPrice: null,
    roomType: null,
    wifi: false,
    selfCheckin: false,
    luggage: false,
    TV: false,
    bedroom: '',
    bathroom: '',
    bed: '',
    rating: null,
  });

  // 정렬 상태
  const [sort, setSort] = useState<Sort>({
    field: 'createdAt',
    direction: 'desc',
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
        if (typeof value === 'object') {
          const sortValue = `${value.field},${value.direction}`;
          urlParams.append(key, sortValue);
        } else {
          urlParams.append(key, value.toString());
        }
      }
    });

    return urlParams;
  };

  // 초기 숙소 목록을 불러오는 함수
  const initRooms = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const searchParams = {
        page: pageInfo.pageNumber,
        size: pageInfo.pageSize,
        sort,
      };

      const urlParams = convertToURLSearchParams(searchParams);

      const response = await axios.get<RoomListResponse>(
        `/api/v1/rooms/main?${urlParams.toString()}`,
      );

      handleResponseData(response.data);
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  }, [pageInfo.pageNumber, pageInfo.pageSize, sort]);

  // 검색바에서 설정한 조건으로 숙소를 검색하는 함수
  const searchRooms = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const searchParams: RoomSearchParams = {
        page: pageInfo.pageNumber,
        size: pageInfo.pageSize,
        sort,
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
      const response = await axios.get<RoomListResponse>(
        `/api/v1/rooms/main/search?${urlParams.toString()}`,
      );

      handleResponseData(response.data);
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  }, [location, checkIn, checkOut, guests, pageInfo, sort]);

  // 필터바에서 설정한 조건으로 숙소를 필터링하는 함수
  const filterRooms = useCallback(
    async (newFilter: Filter) => {
      setIsLoading(true);
      setError(null);

      try {
        const searchParams: RoomSearchParams = {
          page: pageInfo.pageNumber,
          size: pageInfo.pageSize,
          sort,
          ...(newFilter.minPrice != null && { minPrice: newFilter.minPrice }),
          ...(newFilter.maxPrice != null && { maxPrice: newFilter.maxPrice }),
          ...(newFilter.roomType != null && { roomType: newFilter.roomType }),
          ...(newFilter.wifi === true && { wifi: newFilter.wifi }),
          ...(newFilter.selfCheckin === true && {
            selfCheckin: newFilter.selfCheckin,
          }),
          ...(newFilter.luggage === true && { luggage: newFilter.luggage }),
          ...(newFilter.TV === true && { TV: newFilter.TV }),
          ...(newFilter.bedroom !== '0' && { bedroom: newFilter.bedroom }),
          ...(newFilter.bathroom !== '0' && { bathroom: newFilter.bathroom }),
          ...(newFilter.bed !== '0' && { bed: newFilter.bed }),
          ...(newFilter.rating != null && { rating: newFilter.rating }),
        };

        const urlParams = convertToURLSearchParams(searchParams);
        const response = await axios.get<RoomListResponse>(
          `/api/v1/rooms/main/search?${urlParams.toString()}`,
        );

        setFilter(newFilter);
        handleResponseData(response.data);
      } catch (err) {
        handleError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [pageInfo, sort],
  );

  // 페이지네이션 시 해당 페이지의 숙소 목록을 불러오는 함수
  const pageRooms = useCallback(
    async (pageNumber: number) => {
      setIsLoading(true);
      setError(null);

      try {
        const searchParams: RoomSearchParams = {
          page: pageNumber,
          size: pageInfo.pageSize,
          sort,
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

        const response = await axios.get<RoomListResponse>(
          `${endpoint}?${urlParams.toString()}`,
        );

        setPageInfo((prev) => ({ ...prev, pageNumber }));
        handleResponseData(response.data);
      } catch (err) {
        handleError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [pageInfo.pageSize, location, checkIn, checkOut, guests, filter, sort],
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
        isLiked: item.isLiked,
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
        sort,
        setSort,
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
