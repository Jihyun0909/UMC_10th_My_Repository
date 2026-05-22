import { Controller } from "tsoa";
import { CreateReviewRequestDto } from "../dtos/review.dto.js";
import { ApiResponse } from "../../../common/responses/response.js";
export declare class ReviewController extends Controller {
    /**
     * 특정 가게에 새로운 리뷰 작성
     * @param storeId 가게 고유 ID (PK)
     * @param body 리뷰 생성 정보 객체 (CreateReviewRequestDto)
     */
    handleAddReview(storeId: number, body: CreateReviewRequestDto): Promise<ApiResponse<any>>;
}
//# sourceMappingURL=review.controller.d.ts.map