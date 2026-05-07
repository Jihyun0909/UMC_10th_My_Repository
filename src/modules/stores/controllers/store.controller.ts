import { Request, Response, NextFunction } from "express";
import { createStore } from "../services/store.services.js"; // 확장자 .js 확인!
import { CreateStoreRequestDto } from "../dtos/store.dtos.js";

export const handleAddStore = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { regionId } = req.params;

    // 🚨 타입 가드: regionId가 없거나, 배열(string[])인 경우를 제외함
    if (!regionId || typeof regionId !== "string") {
      res.status(400).json({
        success: false,
        message: "유효한 지역 ID가 요청 경로에 포함되지 않았습니다."
      });
      return;
    }

    const result = await createStore(parseInt(regionId), req.body as CreateStoreRequestDto);

    res.status(200).json({
      success: true,
      code: "S200",
      message: "가게 등록 성공!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};