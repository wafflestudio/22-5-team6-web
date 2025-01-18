interface Review {
  userId: number;
  nickname: string;
  profileImage: string;
  content: string;
  rating: number;
  startDate: string; // ISO 8601 날짜 형식 (예: "2025-01-01")
  endDate: string; // ISO 8601 날짜 형식 (예: "2025-01-02")
}

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface ReviewsResponse {
  content: Review[]; // 리뷰 항목
  pageable: Pageable; // 페이징 정보
  totalElements: number; // 전체 리뷰 수
  totalPages: number; // 전체 페이지 수
  last: boolean; // 마지막 페이지 여부
  size: number; // 한 페이지의 리뷰 수
  number: number; // 현재 페이지 번호
  sort: Sort; // 정렬 정보
  numberOfElements: number; // 현재 페이지의 리뷰 개수
  first: boolean; // 첫 번째 페이지 여부
  empty: boolean; // 페이지 내용이 비어 있는지 여부
}
