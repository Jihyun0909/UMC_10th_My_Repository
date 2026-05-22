var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Post, Route, Tags, Path, Response } from "tsoa";
import { createReview } from "../services/review.service.js";
import { success } from "../../../common/responses/response.js";
let ReviewController = class ReviewController extends Controller {
    /**
     * 특정 가게에 새로운 리뷰 작성
     * @param storeId 가게 고유 ID (PK)
     * @param body 리뷰 생성 정보 객체 (CreateReviewRequestDto)
     */
    async handleAddReview(storeId, body) {
        console.log(`Store ${storeId} review add request received:`, body);
        // 기존에 정의된 createReview 비즈니스 로직 서비스를 직접 호출합니다.
        const result = await createReview(storeId, body);
        // 공통 응답 포맷 규격에 맞추어 반환합니다.
        return success(result);
    }
};
__decorate([
    Post("{storeId}/reviews"),
    Response(400, "잘못된 요청 (필수 값 누락 또는 데이터 형식 오류)"),
    Response(404, "존재하지 않는 가게 ID"),
    __param(0, Path()),
    __param(1, Body())
], ReviewController.prototype, "handleAddReview", null);
ReviewController = __decorate([
    Route("stores"),
    Tags("Reviews")
], ReviewController);
export { ReviewController };
//# sourceMappingURL=review.controller.js.map