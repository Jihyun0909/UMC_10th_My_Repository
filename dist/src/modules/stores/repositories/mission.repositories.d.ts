import { CreateMissionRequestDto } from "../dtos/mission.dtos.js";
/**
 * 특정 가게에 귀속되는 새로운 미션을 등록합니다.
 * @param storeId - 미션을 등록할 가게 고유 ID
 * @param data - 보상포인트, 마감일, 상세 내용 객체 (CreateMissionRequestDto)
 * @returns 생성된 미션의 고유 ID (Number)
 */
export declare const addMission: (storeId: number, data: CreateMissionRequestDto) => Promise<number>;
/**
 * 사용자가 해당 미션에 대해 이미 도전 중(CHALLENGING) 상태인지 검증합니다.
 * @param missionId - 확인할 미션 고유 ID
 * @param memberId - 확인할 사용자 고유 ID
 * @returns 중복 도전 여부 (Boolean)
 */
export declare const isMissionAlreadyChallenging: (missionId: number, memberId: number) => Promise<boolean>;
/**
 * 유저와 미션을 연결하여 미션 도전 데이터를 신규 생성합니다.
 * @param missionId - 도전할 미션 고유 ID
 * @param memberId - 도전하는 사용자 고유 ID
 * @returns 생성된 맵핑 데이터의 고유 ID (Number)
 */
export declare const addMemberMission: (missionId: number, memberId: number) => Promise<number>;
/**
 * 특정 가게에 등록된 미션 목록을 커서 기반 페이지네이션으로 조회합니다.
 * @param storeId - 조회할 상점 고유 ID
 * @param cursor - 페이지네이션 기준 미션 ID (Optional)
 * @param limit - 한 페이지에 노출할 데이터 개수 (기본값 5)
 * @returns 미션 목록 배열
 */
export declare const getStoreMissions: (storeId: number, cursor?: number, limit?: number) => Promise<{
    id: number;
    storeId: number;
    reward: number;
    deadline: Date;
    missionSpec: string;
}[]>;
/**
 * 특정 사용자가 현재 '진행중'인 미션 목록을 조회합니다.
 * @param userId - 조회할 사용자 고유 ID
 * @param cursor - 페이지네이션 기준 매핑 ID (Optional)
 * @param limit - 한 페이지에 노출할 데이터 개수 (기본값 5)
 * @returns 진행 중인 미션 정보 및 관련 상점 정보 배열
 */
export declare const getOngoingMissions: (userId: number, cursor?: number, limit?: number) => Promise<({
    mission: {
        store: {
            id: number;
            name: string;
            address: string;
            category: string;
        };
    } & {
        id: number;
        storeId: number;
        reward: number;
        deadline: Date;
        missionSpec: string;
    };
} & {
    id: number;
    userId: number;
    missionId: number;
    status: string;
})[]>;
/**
 * 사용자가 도전 중인 특정 미션의 상태를 '진행완료'로 수정합니다.
 * @param userMissionId - 상태를 변경할 유저-미션 매핑 고유 ID
 * @param userId - 권한 검증을 위한 사용자 고유 ID
 * @returns 업데이트가 완료된 UserMission 객체
 */
export declare const completeUserMission: (userMissionId: number, userId: number) => Promise<{
    id: number;
    userId: number;
    missionId: number;
    status: string;
}>;
//# sourceMappingURL=mission.repositories.d.ts.map