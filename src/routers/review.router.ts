import express, { Request, Response, NextFunction } from "express";
import { isLogin } from "../auth.config.js";

const reviewRouter = express.Router();

/**
 * 리뷰 생성 API (인가 가드 적용)
 * 특정 사용자의 고정 ID 하드코딩 사양을 해제하고 토큰 기반 식별자를 강제 적용합니다.
 */
reviewRouter.post("/", isLogin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 검증 미들웨어를 신뢰하고 전달된 토큰에서 유저 고유 ID를 바인딩합니다.
    const loginUserId = (req.user as any).id;

    res.status(200).json({
      resultType: "SUCCESS",
      error: null,
      success: {
        message: "인증된 사용자의 리뷰 생성이 요청되었습니다.",
        authenticatedUserId: loginUserId, // 인가 및 동적 추출 검증용 식별자 반환
        receivedBody: req.body
      }
    });
  } catch (error) {
    next(error);
  }
});

export { reviewRouter };