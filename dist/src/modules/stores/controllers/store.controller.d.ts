import { Controller } from "tsoa";
import { CreateStoreRequestDto, ReviewListResponse } from "../dtos/store.dtos.js";
import { ApiResponse } from "../../../common/responses/response.js";
export declare class StoreController extends Controller {
    /**
     * 특정 지역에 새로운 가게 추가
     * @param regionId 지역 고유 ID (PK)
     * @param body 가게 생성 정보 (CreateStoreRequestDto)
     */
    handleAddStore(regionId: number, body: CreateStoreRequestDto): Promise<ApiResponse<any>>;
}
export declare class StoreReviewController extends Controller {
    /**
     * 특정 가게의 리뷰 목록 페이징 조회
     * @param storeId 가게 고유 ID (PK)
     * @param cursor 페이징용 커서 번호 (기본값 0)
     */
    handleListStoreReviews(storeId: number, cursor?: number): Promise<ApiResponse<ReviewListResponse>>;
}
//# sourceMappingURL=store.controller.d.ts.map