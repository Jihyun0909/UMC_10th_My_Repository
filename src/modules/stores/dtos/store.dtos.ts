export interface CreateStoreRequestDto {
  name: string;
  address: string;
  categoryId: number; // ERD의 category_id와 매칭
<<<<<<< HEAD
=======
}

export const responseFromReviews = (reviews: any[]) => {
  return {
    data: reviews,
    pagination: {
      // 마지막 리뷰의 ID를 다음 커서로 사용! 데이터가 없으면 null
      cursor: reviews.length > 0 ? reviews[reviews.length - 1].id : null,
    },
  };
};

// 리뷰 모양 정의
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
>>>>>>> feature/chapter-06
}