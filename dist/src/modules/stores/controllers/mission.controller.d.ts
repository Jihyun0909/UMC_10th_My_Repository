import { Controller } from "tsoa";
import { CreateMissionRequestDto } from "../dtos/mission.dtos.js";
import { ApiResponse } from "../../../common/responses/response.js";
export interface ChallengeMissionRequestDto {
    memberId: number;
}
export declare class MissionController extends Controller {
    /**
     * 특정 가게에 새로운 미션 등록
     * @param storeId 가게 고유 ID (PK)
     * @param body 미션 생성 정보 객체 (CreateMissionRequestDto)
     */
    handleAddMission(storeId: number, body: CreateMissionRequestDto): Promise<ApiResponse<any>>;
    /**
     * 유저의 특정 미션 도전 신청
     * @param missionId 미션 고유 ID (PK)
     * @param body 도전을 신청하는 유저 정보 (ChallengeMissionRequestDto)
     */
    handleChallengeMission(missionId: number, body: ChallengeMissionRequestDto): Promise<ApiResponse<any>>;
}
//# sourceMappingURL=mission.controller.d.ts.map