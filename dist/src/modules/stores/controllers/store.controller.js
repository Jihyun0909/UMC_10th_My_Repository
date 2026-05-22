var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Post, Get, Route, Tags, Path, Query, Response } from "tsoa";
import { createStore, listStoreReviews } from "../services/store.services.js";
import { success } from "../../../common/responses/response.js";
let StoreController = class StoreController extends Controller {
    /**
     * 특정 지역에 새로운 가게 추가
     * @param regionId 지역 고유 ID (PK)
     * @param body 가게 생성 정보 (CreateStoreRequestDto)
     */
    async handleAddStore(regionId, body) {
        console.log(`Region ${regionId} store add request received:`, body);
        // 원래 정의하신 createStore 함수를 호출하여 { storeId } 객체를 그대로 리턴합니다.
        const result = await createStore(regionId, body);
        return success(result);
    }
};
__decorate([
    Post("{regionId}/stores"),
    Response(400, "잘못된 요청 (필수 값 누락 또는 데이터 형식 오류)"),
    Response(404, "존재하지 않는 지역 ID"),
    __param(0, Path()),
    __param(1, Body())
], StoreController.prototype, "handleAddStore", null);
StoreController = __decorate([
    Route("regions"),
    Tags("Stores")
], StoreController);
export { StoreController };
let StoreReviewController = class StoreReviewController extends Controller {
    /**
     * 특정 가게의 리뷰 목록 페이징 조회
     * @param storeId 가게 고유 ID (PK)
     * @param cursor 페이징용 커서 번호 (기본값 0)
     */
    async handleListStoreReviews(storeId, cursor = 0) {
        console.log(`Store ${storeId} review list request received (cursor: ${cursor})`);
        const result = await listStoreReviews(storeId, cursor);
        return success(result);
    }
};
__decorate([
    Get("{storeId}/reviews"),
    Tags("Reviews"),
    Response(404, "존재하지 않는 가게 ID"),
    __param(0, Path()),
    __param(1, Query())
], StoreReviewController.prototype, "handleListStoreReviews", null);
StoreReviewController = __decorate([
    Route("stores")
], StoreReviewController);
export { StoreReviewController };
//# sourceMappingURL=store.controller.js.map