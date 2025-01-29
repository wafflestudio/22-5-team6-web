import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';
import { useCallback } from 'react';

import type { ReviewsResponse } from '@/types/reviewType';
import type { roomType } from '@/types/roomType';

type ReviewContextType = {
  isLoading: boolean;
  error: string | null;
  initReviews: (
    data: roomType,
    selectedOption: string,
    page: number,
  ) => Promise<void>;
  reviewData: ReviewsResponse | null;
};

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export function ReviewProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reviewData, setReviewData] = useState<ReviewsResponse | null>(null);

  // 초기 리뷰 목록을 불러오는 함수
  const initReviews = useCallback(
    async (data: roomType, selectedOption: string, page: number) => {
      try {
        setIsLoading(true);
        setError(null);

        const size = 4;
        let sort = '';

        if (selectedOption === '최신순') {
          sort = 'createdAt,desc';
        } else if (selectedOption === '오래된순') {
          sort = 'rating,asc';
        } else if (selectedOption === '높은 평점순') {
          sort = 'rating,desc';
        } else if (selectedOption === '낮은 평점순') {
          sort = 'rating,asc';
        }

        const url = `/api/v1/reviews/room/${data.roomId}?page=${page}&size=${size}&sort=${sort}`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('숙소 리뷰 로딩에 실패했습니다.');
        }

        const responseData = (await response.json()) as ReviewsResponse;

        setReviewData(responseData);

        console.debug(responseData, page);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : '오류가 발생했습니다.';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return (
    <ReviewContext.Provider
      value={{
        initReviews,
        reviewData,
        isLoading,
        error,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
}

export function useReview() {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error('useReview must be used within a ReviewProvider');
  }
  return context;
}
