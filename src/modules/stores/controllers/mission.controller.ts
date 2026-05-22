import { Body, Controller, Post, Route, Tags, Path, Response } from "tsoa";
import { createMission, challengeMission } from "../services/mission.services.js";
import { CreateMissionRequestDto } from "../dtos/mission.dtos.js";
import { ApiResponse, success } from "../../../common/responses/response.js";

export interface ChallengeMissionRequestDto {
  memberId: number;
}

@Route("")
@Tags("Missions")
export class MissionController extends Controller {
  /**
   * 특정 가게에 새로운 미션 등록
   * @param storeId 가게 고유 ID (PK)
   * @param body 미션 생성 정보 객체 (CreateMissionRequestDto)
   */
  @Post("stores/{storeId}/missions")
  @Response<ApiResponse<any>>(400, "잘못된 요청 (필수 값 누락 또는 데이터 형식 오류)")
  @Response<ApiResponse<any>>(404, "존재하지 않는 가게 ID")
  public async handleAddMission(
    @Path() storeId: number,
    @Body() body: CreateMissionRequestDto
  ): Promise<ApiResponse<any>> {
    console.log(`Store ${storeId} mission create request received:`, body);
    
    const result = await createMission(storeId, body);
    return success(result);
  }

  /**
   * 유저의 특정 미션 도전 신청
   * @param missionId 미션 고유 ID (PK)
   * @param body 도전을 신청하는 유저 정보 (ChallengeMissionRequestDto)
   */
  @Post("missions/{missionId}/challenges")
  @Response<ApiResponse<any>>(400, "잘못된 요청 (유효하지 않은 파라미터)")
  @Response<ApiResponse<any>>(404, "존재하지 않는 미션 또는 유저 ID")
  @Response<ApiResponse<any>>(409, "이미 해당 미션에 도전 중이거나 완료한 상태")
  public async handleChallengeMission(
    @Path() missionId: number,
    @Body() body: ChallengeMissionRequestDto
  ): Promise<ApiResponse<any>> {
    console.log(`Mission ${missionId} challenge request received:`, body);
    
    // [수정]: 오타가 발생한 challengeChallenge를 상단에서 임포트한 진짜 함수명인 challengeMission으로 일치시켰습니다.
    const result = await challengeMission(missionId, body.memberId);
    return success(result);
  }
}