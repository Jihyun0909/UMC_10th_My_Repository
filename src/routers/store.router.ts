import express, { Request, Response, NextFunction } from "express";
import { isLogin } from "../auth.config.js";

const storeRouter = express.Router();

/**
 * 신규 가게 등록 API (인가 가드 적용)
 */
storeRouter.post("/", isLogin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 요청 헤더 정보에서 추출한 인가 유저 고유 ID를 매핑합니다.
    const loginUserId = (req.user as any).id;

    // TODO: 서비스 구현 레이어 완료 시 하단에 비즈니스 호출 처리 연동 예정
    // const result = await storeService.createStore(loginUserId, req.body);

    res.status(200).json({
      resultType: "SUCCESS",
      error: null,
      success: {
        message: "인증된 사용자의 신규 가게 등록이 요청되었습니다.",
        authenticatedUserId: loginUserId, // 인가 및 동적 추출 검증용 식별자 반환
        receivedBody: req.body
      }
    });
  } catch (error) {
    next(error);
  }
});

export { storeRouter };