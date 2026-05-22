import { addMission } from "../repositories/mission.repositories.js";
import { checkStoreExists } from "../repositories/review.repository.js"; // 기존 함수 재사용
import { addMemberMission, isMissionAlreadyChallenging } from "../repositories/mission.repositories.js";
export const createMission = async (storeId, data) => {
    const isExist = await checkStoreExists(storeId);
    if (!isExist) {
        throw new Error("미션을 등록하려는 가게가 존재하지 않습니다.");
    }
    const missionId = await addMission(storeId, data);
    return { missionId };
};
export const challengeMission = async (missionId, memberId) => {
    // 중복 도전 검증
    const alreadyChallenging = await isMissionAlreadyChallenging(missionId, memberId);
    if (alreadyChallenging) {
        throw new Error("이미 도전 중인 미션입니다.");
    }
    const memberMissionId = await addMemberMission(missionId, memberId);
    return { memberMissionId };
};
//# sourceMappingURL=mission.services.js.map