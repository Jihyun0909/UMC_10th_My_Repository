import { Body, Controller, Post, Route, Tags, Path, Response } from "tsoa";
import { createReview } from "../services/review.service.js";
import { CreateReviewRequestDto } from "../dtos/review.dto.js";
import { ApiResponse, success } from "../../../common/responses/response.js";

@Route("stores")
@Tags("Reviews")
export class ReviewController extends Controller {
  /**
   * 특정 가게에 새로운 리뷰 작성
   * @param storeId 가게 고유 ID (PK)
   * @param body 리뷰 생성 정보 객체 (CreateReviewRequestDto)
   */
  @Post("{storeId}/reviews")
  @Response<ApiResponse<any>>(400, "잘못된 요청 (필수 값 누락 또는 데이터 형식 오류)")
  @Response<ApiResponse<any>>(404, "존재하지 않는 가게 ID")
  public async handleAddReview(
    @Path() storeId: number,
    @Body() body: CreateReviewRequestDto
  ): Promise<ApiResponse<any>> {
    console.log(`Store ${storeId} review add request received:`, body);
    
    // 기존에 정의된 createReview 비즈니스 로직 서비스를 직접 호출합니다.
    const result = await createReview(storeId, body);
    
    // 공통 응답 포맷 규격에 맞추어 반환합니다.
    return success(result);
  }
}