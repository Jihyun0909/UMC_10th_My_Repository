import { CreateStoreRequestDto } from "../dtos/store.dtos.js";
/**
 * 특정 지역(Region)의 존재 여부를 확인합니다.
 * @param regionId - 검증할 지역 고유 ID
 * @returns 지역 존재 여부 (Boolean)
 */
export declare const checkRegionExists: (regionId: number) => Promise<boolean>;
/**
 * 신규 가게(Store) 데이터를 데이터베이스에 등록합니다.
 * @param regionId - 가게가 소속될 지역 고유 ID
 * @param data - 등록할 가게의 정보 객체 (CreateStoreRequestDto)
 * @returns 생성된 가게의 고유 ID (Number)
 */
export declare const addStore: (regionId: number, data: CreateStoreRequestDto) => Promise<number>;
/**
 * 특정 가게의 리뷰 목록을 페이징 조건에 맞추어 조회
 * @param storeId 가게 고유 ID (PK)
 * @param cursor 페이징 처리를 위한 기준 리뷰 ID
 * @returns 조회된 리뷰 데이터 및 작성자 정보 배열
 */
export declare const getAllStoreReviews: (storeId: number, cursor: number) => Promise<({
    user: {
        email: string;
        id: number;
        name: string;
        gender: string;
        birth: Date;
        address: string;
        detailAddress: string | null;
        phoneNumber: string;
    };
} & {
    id: number;
    userId: number;
    body: string;
    score: number;
    storeId: number;
})[]>;
//# sourceMappingURL=store.repositories.d.ts.map