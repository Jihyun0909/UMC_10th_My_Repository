import { Request, Response, NextFunction } from "express";
import { createReview } from "../services/review.service.js";
import { CreateReviewRequestDto } from "../dtos/review.dto.js";

export const handleAddReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { storeId } = req.params;

    if (!storeId || typeof storeId !== "string") {
      res.status(400).json({ success: false, message: "유효한 가게 ID가 필요합니다." });
      return;
    }

    const result = await createReview(parseInt(storeId), req.body as CreateReviewRequestDto);

    res.status(200).json({
      success: true,
      code: "S200",
      message: "리뷰 등록 성공!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};