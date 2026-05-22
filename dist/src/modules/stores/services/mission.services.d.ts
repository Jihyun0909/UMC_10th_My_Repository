import { CreateMissionRequestDto } from "../dtos/mission.dtos.js";
export declare const createMission: (storeId: number, data: CreateMissionRequestDto) => Promise<{
    missionId: number;
}>;
export declare const challengeMission: (missionId: number, memberId: number) => Promise<{
    memberMissionId: number;
}>;
//# sourceMappingURL=mission.services.d.ts.map