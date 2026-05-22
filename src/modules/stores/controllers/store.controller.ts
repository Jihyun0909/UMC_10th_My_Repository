import { Body, Controller, Post, Get, Route, Tags, Path, Query, Response } from "tsoa";
import { CreateStoreRequestDto, ReviewListResponse } from "../dtos/store.dtos.js";
// 지현님이 만드신 진짜 서비스 함수 이름(createStore, listStoreReviews)을 정확하게 가져옵니다.
import { createStore, listStoreReviews } from "../services/store.services.js";
import { ApiResponse, success } from "../../../common/responses/response.js";

@Route("regions")
@Tags("Stores")
export class StoreController extends Controller {
  /**
   * 특정 지역에 새로운 가게 추가
   * @param regionId 지역 고유 ID (PK)
   * @param body 가게 생성 정보 (CreateStoreRequestDto)
   */
  @Post("{regionId}/stores")
  @Response<ApiResponse<any>>(400, "잘못된 요청 (필수 값 누락 또는 데이터 형식 오류)")
  @Response<ApiResponse<any>>(404, "존재하지 않는 지역 ID")
  public async handleAddStore(
    @Path() regionId: number,
    @Body() body: CreateStoreRequestDto
  ): Promise<ApiResponse<any>> {
    console.log(`Region ${regionId} store add request received:`, body);
    // 원래 정의하신 createStore 함수를 호출하여 { storeId } 객체를 그대로 리턴합니다.
    const result = await createStore(regionId, body);
    return success(result);
  }
}

@Route("stores")
export class StoreReviewController extends Controller {
  /**
   * 특정 가게의 리뷰 목록 페이징 조회
   * @param storeId 가게 고유 ID (PK)
   * @param cursor 페이징용 커서 번호 (기본값 0)
   */
  @Get("{storeId}/reviews")
  @Tags("Reviews")
  @Response<ApiResponse<any>>(404, "존재하지 않는 가게 ID")
  public async handleListStoreReviews(
    @Path() storeId: number,
    @Query() cursor: number = 0
  ): Promise<ApiResponse<ReviewListResponse>> {
    console.log(`Store ${storeId} review list request received (cursor: ${cursor})`);
    const result = await listStoreReviews(storeId, cursor);
    return success(result);
  }
}