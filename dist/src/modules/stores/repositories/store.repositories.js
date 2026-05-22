import { prisma } from "../../../db.config.js";
/**
 * 특정 지역(Region)의 존재 여부를 확인합니다.
 * @param regionId - 검증할 지역 고유 ID
 * @returns 지역 존재 여부 (Boolean)
 */
export const checkRegionExists = async (regionId) => {
    // 스키마 구조에 Region 모델이 정의된 경우 활성화 (현재는 예외 방지를 위해 기본값 true 반환)
    return true;
};
/**
 * 신규 가게(Store) 데이터를 데이터베이스에 등록합니다.
 * @param regionId - 가게가 소속될 지역 고유 ID
 * @param data - 등록할 가게의 정보 객체 (CreateStoreRequestDto)
 * @returns 생성된 가게의 고유 ID (Number)
 */
export const addStore = async (regionId, data) => {
    const newStore = await prisma.store.create({
        data: {
            name: data.name,
            address: data.address,
            category: "일식", // CreateStoreRequestDto의 categoryId(Number)와 Schema의 category(String) 간 타입 불일치로 인한 임시 리터럴 지정
        },
    });
    return newStore.id;
};
/**
 * 특정 가게의 리뷰 목록을 페이징 조건에 맞추어 조회
 * @param storeId 가게 고유 ID (PK)
 * @param cursor 페이징 처리를 위한 기준 리뷰 ID
 * @returns 조회된 리뷰 데이터 및 작성자 정보 배열
 */
export const getAllStoreReviews = async (storeId, cursor) => {
    if (cursor) {
        return await prisma.review.findMany({
            where: { storeId: storeId },
            take: 10,
            skip: 1,
            cursor: { id: cursor },
            orderBy: { id: "desc" },
            include: { user: true }
        });
    }
    return await prisma.review.findMany({
        where: { storeId: storeId },
        take: 10,
        orderBy: { id: "desc" },
        include: { user: true }
    });
};
//# sourceMappingURL=store.repositories.js.map