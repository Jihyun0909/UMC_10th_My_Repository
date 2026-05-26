import { CreateReviewRequestDto } from "../dtos/review.dto.js";
/**
 * 대상 가게(Store)의 존재 여부를 확인합니다.
 * @param storeId - 확인할 가게 고유 ID
 * @returns 가게 존재 여부 (Boolean)
 */
export declare const checkStoreExists: (storeId: number) => Promise<boolean>;
/**
 * 특정 가게에 대한 사용자의 리뷰를 추가합니다.
 * @param storeId - 리뷰를 등록할 가게 고유 ID
 * @param data - 리뷰 본문 및 평점 정보 객체 (CreateReviewRequestDto)
 * @returns 생성된 리뷰의 고유 ID (Number)
 */
export declare const addReview: (storeId: number, data: CreateReviewRequestDto) => Promise<number>;
/**
 * 특정 사용자가 작성한 리뷰 목록을 커서 기반 페이지네이션으로 조회합니다.
 * @param userId - 조회할 사용자 고유 ID
 * @param cursor - 페이지네이션 기준 리뷰 ID (Optional)
 * @param limit - 한 페이지에 노출할 데이터 개수 (기본값 5)
 * @returns 리뷰 목록 및 상점 정보 배열
 */
export declare const getUserReviews: (userId: number, cursor?: number, limit?: number) => Promise<({
    store: {
        id: number;
        name: string;
        address: string;
        category: string;
    };
} & {
    id: number;
    userId: number;
    body: string;
    score: number;
    storeId: number;
})[]>;
//# sourceMappingURL=review.repository.d.ts.map