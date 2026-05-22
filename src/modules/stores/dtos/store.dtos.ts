export interface CreateStoreRequestDto {
  name: string;
  address: string;
  categoryId: number; 
}

export interface ReviewItem {
  id: number;
  body: string;
  score: number;
  user: {
    name: string;
  };
}

export interface ReviewListResponse {
  data: ReviewItem[];
  pagination: {
    cursor: number | null;
  };
}

export const responseFromReviews = (reviews: any[]) => {
  return {
    data: reviews,
    pagination: {
      cursor: reviews.length > 0 ? reviews[reviews.length - 1].id : null,
    },
  };
};

// 상위 호환성 및 라우팅 명세 매핑용 별칭 타입 지정
export type StoreRequestDto = CreateStoreRequestDto;
export type StoreResponseDto = { storeId: number; name: string; address: string; categoryId: number; };