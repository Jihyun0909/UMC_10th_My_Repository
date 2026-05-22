import { prisma } from "../../../db.config.js";
/**
 * 특정 가게에 귀속되는 새로운 미션을 등록합니다.
 * @param storeId - 미션을 등록할 가게 고유 ID
 * @param data - 보상포인트, 마감일, 상세 내용 객체 (CreateMissionRequestDto)
 * @returns 생성된 미션의 고유 ID (Number)
 */
export const addMission = async (storeId, data) => {
    const newMission = await prisma.mission.create({
        data: {
            reward: Number(data.reward),
            deadline: new Date(data.deadline), // 문자열(String) 형식을 Prisma DateTime 포맷으로 파싱
            missionSpec: data.content,
            storeId: storeId,
        },
    });
    return newMission.id;
};
/**
 * 사용자가 해당 미션에 대해 이미 도전 중(CHALLENGING) 상태인지 검증합니다.
 * @param missionId - 확인할 미션 고유 ID
 * @param memberId - 확인할 사용자 고유 ID
 * @returns 중복 도전 여부 (Boolean)
 */
export const isMissionAlreadyChallenging = async (missionId, memberId) => {
    const count = await prisma.userMission.count({
        where: {
            missionId: missionId,
            userId: memberId,
            status: "CHALLENGING",
        },
    });
    return count > 0;
};
/**
 * 유저와 미션을 연결하여 미션 도전 데이터를 신규 생성합니다.
 * @param missionId - 도전할 미션 고유 ID
 * @param memberId - 도전하는 사용자 고유 ID
 * @returns 생성된 맵핑 데이터의 고유 ID (Number)
 */
export const addMemberMission = async (missionId, memberId) => {
    const newUserMission = await prisma.userMission.create({
        data: {
            missionId: missionId,
            userId: memberId,
            status: "CHALLENGING", // 초기 도전 상태 고정값 지정
        },
    });
    return newUserMission.id;
};
/**
 * 특정 가게에 등록된 미션 목록을 커서 기반 페이지네이션으로 조회합니다.
 * @param storeId - 조회할 상점 고유 ID
 * @param cursor - 페이지네이션 기준 미션 ID (Optional)
 * @param limit - 한 페이지에 노출할 데이터 개수 (기본값 5)
 * @returns 미션 목록 배열
 */
export const getStoreMissions = async (storeId, cursor, limit = 5) => {
    const missions = await prisma.mission.findMany({
        where: {
            storeId: storeId,
        },
        ...(cursor ? {
            skip: 1,
            cursor: { id: cursor },
        } : {}),
        take: limit,
        orderBy: {
            id: "desc", // 최신 등록순 정렬
        },
    });
    return missions;
};
/**
 * 특정 사용자가 현재 '진행중'인 미션 목록을 조회합니다.
 * @param userId - 조회할 사용자 고유 ID
 * @param cursor - 페이지네이션 기준 매핑 ID (Optional)
 * @param limit - 한 페이지에 노출할 데이터 개수 (기본값 5)
 * @returns 진행 중인 미션 정보 및 관련 상점 정보 배열
 */
export const getOngoingMissions = async (userId, cursor, limit = 5) => {
    const ongoingMissions = await prisma.userMission.findMany({
        where: {
            userId: userId,
            status: "CHALLENGING",
        },
        ...(cursor ? {
            skip: 1,
            cursor: { id: cursor },
        } : {}),
        take: limit,
        orderBy: {
            id: "desc",
        },
        include: {
            mission: {
                include: {
                    store: true, // 미션 대상 상점 정보 연쇄 Join
                },
            },
        },
    });
    return ongoingMissions;
};
/**
 * 사용자가 도전 중인 특정 미션의 상태를 '진행완료'로 수정합니다.
 * @param userMissionId - 상태를 변경할 유저-미션 매핑 고유 ID
 * @param userId - 권한 검증을 위한 사용자 고유 ID
 * @returns 업데이트가 완료된 UserMission 객체
 */
export const completeUserMission = async (userMissionId, userId) => {
    const updatedMission = await prisma.userMission.update({
        where: {
            id: userMissionId,
            userId: userId, // 타인의 미션 수정을 방지하기 위한 조건 제한
        },
        data: {
            status: "COMPLETE", // 스키마 명세에 따른 완료 상태값 반영
        },
    });
    return updatedMission;
};
//# sourceMappingURL=mission.repositories.js.map