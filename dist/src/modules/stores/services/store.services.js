import { addStore, checkRegionExists, getAllStoreReviews } from "../repositories/store.repositories.js";
import { responseFromReviews } from "../dtos/store.dtos.js";
// 가게 등록
export const createStore = async (regionId, storeData) => {
    const isExist = await checkRegionExists(regionId);
    if (!isExist) {
        throw new Error("존재하지 않는 지역 ID입니다.");
    }
    const storeId = await addStore(regionId, storeData);
    return { storeId };
};
export const listStoreReviews = async (storeId, cursor) => {
    const reviews = await getAllStoreReviews(storeId, cursor);
    return responseFromReviews(reviews);
};
//# sourceMappingURL=store.services.js.map