import { addReview, checkStoreExists } from "../repositories/review.repository.js";
import { CreateReviewRequestDto } from "../dtos/review.dto.js";

export const createReview = async (storeId: number, data: CreateReviewRequestDto) => {
  // 1. 가게 검증
  const isExist = await checkStoreExists(storeId);
  if (!isExist) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  // 2. 리뷰 등록
  const reviewId = await addReview(storeId, data);
  return { reviewId };
};