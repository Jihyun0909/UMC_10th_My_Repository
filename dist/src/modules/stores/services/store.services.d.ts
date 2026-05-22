import { CreateStoreRequestDto, ReviewListResponse } from "../dtos/store.dtos.js";
export declare const createStore: (regionId: number, storeData: CreateStoreRequestDto) => Promise<{
    storeId: number;
}>;
export declare const listStoreReviews: (storeId: number, cursor: number) => Promise<ReviewListResponse>;
//# sourceMappingURL=store.services.d.ts.map