import { addStore, checkRegionExists } from "../repositories/store.repositories";
import { CreateStoreRequestDto } from "../dtos/store.dtos";

export const createStore = async (regionId: number, storeData: CreateStoreRequestDto) => {
  const isExist = await checkRegionExists(regionId);
  if (!isExist) {
    throw new Error("존재하지 않는 지역 ID입니다.");
  }

  const storeId = await addStore(regionId, storeData);
  return { storeId };
};