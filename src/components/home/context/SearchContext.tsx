import type { ReactNode } from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';

import axiosInstance from '@/axiosInstance';
import type { RoomType } from '@/types/room';
import type {
  Filter,
  RoomListResponse,
  RoomMain,
  RoomMainResponse,
  RoomSearchParams,
  Sort,
  SortDirection,
  SortField,
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

type SearchOptions = {
  newFilter?: Filter;
  newSort?: Sort;
  pageNumber?: number;
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

  // 필터 관련
  filter: Filter;
  setFilter: (filter: Filter) => void;

  // 검색 실행 및 초기화
  searchRooms: (options?: SearchOptions) => Promise<void>;
  resetSearch: () => void;

  // 정렬
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
    pageSize: 12,
    totalElements: 0,
    totalPages: 0,
  });

  // 필터 상태
  const [filter, setFilter] = useState<Filter>({
    minPrice: '',
    maxPrice: '',
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

  const createSearchParams = useCallback(
    (
      currentFilter: Filter,
      currentSort: Sort,
      pageNumber?: number,
    ): RoomSearchParams => {
      return {
        page: pageNumber ?? pageInfo.pageNumber,
        size: pageInfo.pageSize,
        sort: currentSort,
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
        ...(currentFilter.minPrice !== null && {
          minPrice: currentFilter.minPrice,
        }),
        ...(currentFilter.maxPrice !== null && {
          maxPrice: currentFilter.maxPrice,
        }),
        ...(currentFilter.roomType != null && {
          roomType: currentFilter.roomType,
        }),
        ...(currentFilter.wifi === true && { wifi: currentFilter.wifi }),
        ...(currentFilter.selfCheckin === true && {
          selfCheckin: currentFilter.selfCheckin,
        }),
        ...(currentFilter.luggage === true && {
          luggage: currentFilter.luggage,
        }),
        ...(currentFilter.TV === true && { TV: currentFilter.TV }),
        ...(currentFilter.bedroom !== '0' && {
          bedroom: currentFilter.bedroom,
        }),
        ...(currentFilter.bathroom !== '0' && {
          bathroom: currentFilter.bathroom,
        }),
        ...(currentFilter.bed !== '0' && { bed: currentFilter.bed }),
        ...(currentFilter.rating != null && { rating: currentFilter.rating }),
      };
    },
    [
      pageInfo.pageNumber,
      pageInfo.pageSize,
      location,
      checkIn,
      checkOut,
      guests,
    ],
  );

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

  // 메인 함수
  const searchRooms = useCallback(
    async (options: SearchOptions = {}) => {
      const { newFilter, newSort, pageNumber } = options;
      setIsLoading(true);
      setError(null);

      try {
        const searchParams = createSearchParams(
          newFilter ?? filter,
          newSort ?? sort,
          pageNumber ?? pageInfo.pageNumber,
        );

        const urlParams = convertToURLSearchParams(searchParams);

        const hasSearchParams = Object.keys(searchParams).length > 6;
        const endpoint = hasSearchParams
          ? '/api/v1/rooms/main/search'
          : '/api/v1/rooms/main';

        const response = await axiosInstance.get<RoomListResponse>(
          `${endpoint}?${urlParams.toString()}`,
        );

        window.history.replaceState(
          null,
          '',
          `${window.location.pathname}?${urlParams.toString()}`,
        );

        if (newFilter != null) {
          setFilter(newFilter);
        }
        if (newSort != null) {
          setSort(newSort);
        }
        if (pageNumber != null) {
          setPageInfo((prev) => ({ ...prev, pageNumber }));
        }

        handleResponseData(response.data);
      } catch (err) {
        handleError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [createSearchParams, filter, sort, pageInfo.pageNumber],
  );

  const resetSearch = useCallback(() => {
    setLocation({ sido: '' });
    setCheckIn(null);
    setCheckOut(null);
    setGuests(0);
    setFilter({
      minPrice: '',
      maxPrice: '',
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
    setSort({
      field: 'createdAt',
      direction: 'desc',
    });
    void searchRooms();
  }, [searchRooms]);

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
        void searchRooms({ pageNumber: page });
      }
    },
    [pageInfo.pageNumber, searchRooms],
  );

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (!isInitialMount.current) return;
    isInitialMount.current = false;
    // URL에서 검색 조건을 읽어옴
    const searchParams = new URLSearchParams(window.location.search);
    const urlSido = searchParams.get('sido');
    const urlSigungu = searchParams.get('sigungu');
    const urlStartDate = searchParams.get('startDate');
    const urlEndDate = searchParams.get('endDate');
    const urlGuests = searchParams.get('guests');
    const urlRoomType = searchParams.get('roomType');
    const urlMinPrice = searchParams.get('minPrice');
    const urlMaxPrice = searchParams.get('maxPrice');
    const urlWifi = searchParams.get('wifi');
    const urlSelfCheckin = searchParams.get('selfCheckin');
    const urlLuggage = searchParams.get('luggage');
    const urlTV = searchParams.get('TV');
    const urlBedroom = searchParams.get('bedroom');
    const urlBathroom = searchParams.get('bathroom');
    const urlBed = searchParams.get('bed');
    const urlRating = searchParams.get('rating');
    const urlSort = searchParams.get('sort')?.split(',');

    // URL에 검색 조건이 있으면 상태 업데이트
    if (urlSido !== null) {
      setLocation({
        sido: urlSido,
        sigungu: urlSigungu ?? '',
      });
    }
    if (urlStartDate != null) {
      setCheckIn(new Date(urlStartDate));
    }
    if (urlEndDate != null) {
      setCheckOut(new Date(urlEndDate));
    }
    if (urlGuests != null) {
      setGuests(Number(urlGuests));
    }
    if (urlRoomType != null) {
      setFilter((prev) => ({ ...prev, roomType: urlRoomType as RoomType }));
    }
    // Update filter state
    const newFilter: Filter = {
      minPrice: urlMinPrice !== null ? urlMinPrice : '',
      maxPrice: urlMaxPrice !== null ? urlMaxPrice : '',
      roomType: urlRoomType as RoomType | null,
      wifi: urlWifi === 'true',
      selfCheckin: urlSelfCheckin === 'true',
      luggage: urlLuggage === 'true',
      TV: urlTV === 'true',
      bedroom: urlBedroom ?? '',
      bathroom: urlBathroom ?? '',
      bed: urlBed ?? '',
      rating: urlRating != null ? Number(urlRating) : null,
    };

    setFilter(newFilter);

    if (urlSort != null) {
      setSort({
        field: urlSort[0] as SortField,
        direction: urlSort[1] as SortDirection,
      });
    }
    void searchRooms({
      newFilter,
      newSort:
        urlSort != null
          ? {
              field: urlSort[0] as SortField,
              direction: urlSort[1] as SortDirection,
            }
          : undefined,
    });
  }, [searchRooms]);

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
        resetSearch,
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
