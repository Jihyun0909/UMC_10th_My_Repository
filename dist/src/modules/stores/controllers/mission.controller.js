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
import { createMission, challengeMission } from "../services/mission.services.js";
import { success } from "../../../common/responses/response.js";
let MissionController = class MissionController extends Controller {
    /**
     * 특정 가게에 새로운 미션 등록
     * @param storeId 가게 고유 ID (PK)
     * @param body 미션 생성 정보 객체 (CreateMissionRequestDto)
     */
    async handleAddMission(storeId, body) {
        console.log(`Store ${storeId} mission create request received:`, body);
        const result = await createMission(storeId, body);
        return success(result);
    }
    /**
     * 유저의 특정 미션 도전 신청
     * @param missionId 미션 고유 ID (PK)
     * @param body 도전을 신청하는 유저 정보 (ChallengeMissionRequestDto)
     */
    async handleChallengeMission(missionId, body) {
        console.log(`Mission ${missionId} challenge request received:`, body);
        const result = await challengeMission(missionId, body.memberId);
        return success(result);
    }
};
__decorate([
    Post("stores/{storeId}/missions"),
    Response(400, "잘못된 요청 (필수 값 누락 또는 데이터 형식 오류)"),
    Response(404, "존재하지 않는 가게 ID"),
    __param(0, Path()),
    __param(1, Body())
], MissionController.prototype, "handleAddMission", null);
__decorate([
    Post("missions/{missionId}/challenges"),
    Response(400, "잘못된 요청 (유효하지 않은 파라미터)"),
    Response(404, "존재하지 않는 미션 또는 유저 ID"),
    Response(409, "이미 해당 미션에 도전 중이거나 완료한 상태"),
    __param(0, Path()),
    __param(1, Body())
], MissionController.prototype, "handleChallengeMission", null);
MissionController = __decorate([
    Route(""),
    Tags("Missions")
], MissionController);
export { MissionController };
//# sourceMappingURL=mission.controller.js.map